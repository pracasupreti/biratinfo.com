/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState, useMemo } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Loader2Icon } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'

interface AuthorDisplayProps {
    authorId: string // clerkId
}

interface User {
    id?: string
    imageUrl?: string
    name?: string
    role?: string
}

// Simple cache implementation
const userCache = new Map<string, User>()

export default function AuthorDisplay({ authorId }: AuthorDisplayProps) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { isLoaded: isClerkLoaded, getToken } = useAuth()

    // Memoize the authorId to prevent unnecessary re-renders
    const memoizedAuthorId = useMemo(() => authorId, [authorId])

    useEffect(() => {
        if (!isClerkLoaded) return

        // Check cache first
        if (userCache.has(memoizedAuthorId)) {
            setUser(userCache.get(memoizedAuthorId)!)
            setLoading(false)
            return
        }

        const abortController = new AbortController()

        async function fetchAuthor() {
            try {
                setLoading(true)
                const token = await getToken()

                // Early return if component unmounted
                if (abortController.signal.aborted) return

                const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
                if (!backend_uri) throw new Error('Missing API endpoint')

                const res = await fetch(`${backend_uri}/api/users/Id/${memoizedAuthorId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    signal: abortController.signal
                })

                if (!res.ok) throw new Error('Failed to fetch user')

                const data = await res.json()
                if (!data?.user) throw new Error('User not found')

                // Cache the result
                userCache.set(memoizedAuthorId, data.user)
                setUser(data.user)
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    console.error('Error fetching author:', error)
                    setError(error instanceof Error ? error.message : 'Failed to load author')
                }
            } finally {
                if (!abortController.signal.aborted) {
                    setLoading(false)
                }
            }
        }

        fetchAuthor()

        return () => {
            abortController.abort()
        }
    }, [isClerkLoaded, getToken, memoizedAuthorId])

    if (!isClerkLoaded || loading) {
        return (
            <div className="flex items-center gap-2 opacity-70 text-sm">
                <Avatar className="h-6 w-6">
                    <AvatarFallback>
                        <Loader2Icon className="h-4 w-4 animate-spin" />
                    </AvatarFallback>
                </Avatar>
                <span>Loading...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center gap-2 text-sm opacity-50">
                <Avatar className="h-6 w-6">
                    <AvatarFallback>!</AvatarFallback>
                </Avatar>
                <span>Error loading</span>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="flex items-center gap-2 text-sm opacity-50">
                <Avatar className="h-6 w-6">
                    <AvatarFallback>?</AvatarFallback>
                </Avatar>
                <span>Unknown</span>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
                {user.imageUrl ? (
                    <AvatarImage src={user.imageUrl} />
                ) : (
                    <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                )}
            </Avatar>
            <span className="text-sm line-clamp-1">{user.name}</span>
        </div>
    )
}