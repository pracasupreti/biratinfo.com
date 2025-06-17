'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

import Loader from '@/components/Loader'
import { SearchUsers } from '../SearchUsers'
import { UserTable } from '../UserTable'


interface User {
    id: string
    name: string
    email: string
    role: string
    imageUrl: string
    posts: number
}

export default function AuthorsPage() {
    const { getToken } = useAuth()
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    const searchParams = useSearchParams()
    const query = searchParams.get('search')?.toLowerCase() || ''

    useEffect(() => {
        async function fetchAuthors() {
            try {
                setLoading(true)
                const token = await getToken()
                const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
                if (!backend_uri || !token) throw new Error('Missing token or API endpoint')

                // 1. Get all users from Clerk (Using cutom-route)
                const clerkRes = await fetch('/api/clerk-users')
                const clerkUsers = await clerkRes.json()

                const filtered = clerkUsers.users.filter((user: any) =>
                    (user.publicMetadata?.role === 'admin') &&
                    (`${user.firstName} ${user.lastName}`.toLowerCase().includes(query) ||
                        user.emailAddresses[0]?.emailAddress.toLowerCase().includes(query))
                )

                // 2. Enrich with post counts
                const enrichedUsers = await Promise.all(
                    filtered.map(async (user: any) => {
                        try {
                            const postCountRes = await fetch(`${backend_uri}/api/posts/approved-count/${user.id}`, {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                }
                            })
                            const { count } = await postCountRes.json()
                            return {
                                id: user.id,
                                name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'Anonymous',
                                email: user.emailAddresses[0]?.emailAddress || '',
                                role: user.publicMetadata?.role || '',
                                imageUrl: user.imageUrl,
                                posts: count || 0
                            }
                        } catch {
                            return {
                                id: user.id,
                                name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'Anonymous',
                                email: user.emailAddresses[0]?.emailAddress || '',
                                role: user.publicMetadata?.role || '',
                                imageUrl: user.imageUrl,
                                posts: 0
                            }
                        }
                    })
                )

                setUsers(enrichedUsers)
            } catch (error) {
                console.error('Error loading authors:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchAuthors()
    }, [getToken, query])

    if (loading) return <Loader />

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Authors</h2>
                    <p className="text-muted-foreground">
                        Manage all authors and their permissions
                    </p>
                </div>
            </div>

            <SearchUsers placeholder="Search authors by name or email..." />

            <UserTable
                users={users}
                availableRoles={['editor', 'admin']}
                currentRole="manager"
            />
        </div>
    )
}
