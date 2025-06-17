'use client'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'

interface AuthorDisplayProps {
    authorId: string
}

export default function AuthorDisplay({ authorId }: AuthorDisplayProps) {
    const { getToken } = useAuth()
    const [author, setAuthor] = useState({
        name: 'Loading...',
        imageUrl: ''
    })

    useEffect(() => {
        async function loadAuthor() {
            const token = await getToken()
            if (!token) return

            const authorData = await getSingleAuthor(authorId, token)
            setAuthor(authorData)
        }
        loadAuthor()
    }, [authorId, getToken])

    return (
        <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
                {author.imageUrl ? (
                    <AvatarImage src={author.imageUrl} />
                ) : (
                    <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                )}
            </Avatar>
            <span className="text-sm line-clamp-1">{author.name}</span>
        </div>
    )
}

export async function getSingleAuthor(userId: string, token: string) {
    try {
        const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
        if (!backend_uri) throw new Error('Missing API endpoint')

        const response = await fetch(`${backend_uri}/api/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })

        if (!response.ok) throw new Error('Failed to fetch user')

        const data = await response.json()
        return {
            name: data.user?.name || 'Unknown',
            imageUrl: data.user?.imageUrl || ''
        }
    } catch (error) {
        console.error('Error fetching user:', error)
        return {
            name: 'Unknown',
            imageUrl: ''
        }
    }
}