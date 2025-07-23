'use client'

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'
import { Label } from '../ui/label'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'

interface User {
    id: string
    name: string | null
    imageUrl: string
    role?: string
}

interface AuthorSelectProps {
    value: string[]
    onChange: (value: string[]) => void
    error?: string | string[]
    isNepali?: boolean
}

export function AuthorSelect({
    value = [],
    onChange,
    error,
    isNepali
}: AuthorSelectProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const { isLoaded: isClerkLoaded, userId, getToken } = useAuth()

    useEffect(() => {
        if (!isClerkLoaded) return

        const fetchCurrentUser = async () => {
            try {
                setLoading(true)
                setErrorMessage(null)

                if (!userId) {
                    throw new Error('User not authenticated')
                }

                const token = await getToken()
                const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
                if (!backend_uri) throw new Error('Missing API endpoint')

                const response = await fetch(`${backend_uri}/api/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                })

                if (!response.ok) {
                    throw new Error(`Failed to fetch user data: ${response.status}`)
                }

                const data = await response.json()

                if (!data?.user) {
                    throw new Error('User data not found in response')
                }

                setCurrentUser(data.user)
                if (value.length === 0) {
                    onChange([data.user.id])
                }
            } catch (error) {
                console.error('Error fetching current user:', error)
                setErrorMessage(
                    error instanceof Error ?
                        error.message :
                        'Failed to load author information'
                )
            } finally {
                setLoading(false)
            }
        }

        fetchCurrentUser()
    }, [isClerkLoaded, userId])

    if (!isClerkLoaded || loading) {
        return (
            <div className="space-y-2">
                <Label className='text-sm font-medium text-gray-800'>{isNepali ? 'लेखक' : 'Author'}</Label>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                    <span className="text-gray-600">Loading author information...</span>
                </div>
            </div>
        )
    }

    if (errorMessage || !currentUser) {
        return (
            <div className="space-y-2">
                <Label className='text-sm font-medium text-gray-800'>{isNepali ? 'लेखक' : 'Author'}</Label>
                <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                    <p className="text-red-600">
                        {errorMessage || 'Author information not available'}
                    </p>
                    <p className="text-xs text-red-500 mt-1">
                        Please refresh the page or try again later
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-800">{isNepali ? 'लेखक' : 'Author'}</Label>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.imageUrl} />
                    <AvatarFallback className="bg-gray-200 text-gray-700">
                        {currentUser.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium text-gray-900">
                        {currentUser.name || 'Unknown Author'}
                    </p>
                    <p className="text-xs text-gray-500">{isNepali ? 'लेखक' : 'Author'}</p>
                </div>
            </div>
            {error && (
                <p className="text-red-500 text-xs mt-1">
                    {typeof error === 'string' ? error : error?.join(', ')}
                </p>
            )}
        </div>
    )
}