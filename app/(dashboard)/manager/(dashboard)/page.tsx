/* eslint-disable @typescript-eslint/no-explicit-any */
import QuickStats from './QuickStats'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import RecentPosts from './RecentPosts'
import DraftPosts from './DraftPosts'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'

function extractPosts(data: any): any[] {
    if (Array.isArray(data?.posts)) return data.posts;
    if (Array.isArray(data?.posts?.posts)) return data.posts.posts;
    return [];
}

async function fetchPostsByStatus(status: string, token: string) {
    const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL

    if (!backend_uri) throw new Error("Missing api endpoint")
    const response = await fetch(`${backend_uri}/api/posts/status/${status}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        cache: 'no-store'
    })

    if (!response.ok) {
        throw new Error('Failed to fetch posts')
    }

    const data = await response.json()
    return data?.success ? extractPosts(data) : [];
}

export default async function Dashboard() {
    const { getToken } = await auth()
    const token = await getToken()

    if (!token) {
        throw new Error('Authentication required')
    }

    // Fetch all posts in parallel with error handling
    const [draftPosts, pendingPosts, scheduledPosts, approvedPosts, rejectedPosts] = await Promise.all([
        fetchPostsByStatus('draft', token).catch(() => []),
        fetchPostsByStatus('pending', token).catch(() => []),
        fetchPostsByStatus('scheduled', token).catch(() => []),
        fetchPostsByStatus('approved', token).catch(() => []),
        fetchPostsByStatus('rejected', token).catch(() => [])
    ])

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <QuickStats
                draftPosts={draftPosts}
                pendingPosts={pendingPosts}
                scheduledPosts={scheduledPosts}
                approvedPosts={approvedPosts}
                rejectedPosts={rejectedPosts}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Recent Approved Posts</CardTitle>
                            <Button asChild>
                                <Link href="/manager/post">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Write Post
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <RecentPosts posts={approvedPosts.slice(0, 3)} />
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Drafts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DraftPosts drafts={draftPosts} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}