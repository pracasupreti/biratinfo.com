/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from '@clerk/nextjs/server'
import Post from '@/types/Post'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import QuickStats from './QuickStats'
import RecentPosts from './RecentPosts'
import { IUser } from '@/types/User'

function extractPosts(data: any): Post[] {
    if (Array.isArray(data?.posts)) return data.posts;
    if (Array.isArray(data?.posts?.posts)) return data.posts.posts;
    return [];
}

async function fetchAllPostsByStatus(status: string, token: string) {
    const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
    if (!backend_uri) throw new Error("Missing api endpoint")

    const response = await fetch(`${backend_uri}/api/posts/allpost/${status}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${status} posts`);
    }

    const data = await response.json();
    return extractPosts(data);
}

async function fetchAllCategories(token: string) {
    const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
    if (!backend_uri) throw new Error("Missing api endpoint")

    const response = await fetch(`${backend_uri}/api/categories`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }

    const data = await response.json();
    return data.result?.categories || [];
}

async function fetchAllUsers(token: string) {
    const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
    if (!backend_uri) throw new Error("Missing api endpoint")

    const response = await fetch(`${backend_uri}/api/users`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    const data = await response.json();
    return data.users || [];
}

export default async function Dashboard() {
    const { getToken } = await auth()
    const token = await getToken()

    if (!token) {
        return (
            <div className="flex items-center justify-center h-64">
                <p>Unauthorized. Please sign in.</p>
            </div>
        )
    }

    try {
        const [postsData, categoriesData, usersData] = await Promise.all([
            Promise.all([
                fetchAllPostsByStatus('pending', token),
                fetchAllPostsByStatus('approved', token),
                fetchAllPostsByStatus('rejected', token),
                fetchAllPostsByStatus('draft', token),
                fetchAllPostsByStatus('scheduled', token),
            ]),
            fetchAllCategories(token),
            fetchAllUsers(token)
        ]);

        const [
            pendingPosts,
            approvedPosts,
            rejectedPosts,
            draftPosts,
            scheduledPosts
        ] = postsData;

        const categories = categoriesData;
        const users = usersData;

        // Filter users by role
        const managers = users.filter((user: IUser) => user.role === 'manager');
        const editors = users.filter((user: IUser) => user.role === 'editor');

        // Get trending category
        const trendingCategory = categories.length > 0
            ? categories.reduce((prev: any, current: any) =>
                (prev.postCount > current.postCount) ? prev : current
            ).category
            : "No categories";

        // Calculate active managers (based on update or created post within a week)
        const activeManagers = managers.filter((manager: IUser) => {
            return approvedPosts.some((post: Post) => {
                const postDate = new Date(post.updatedAt || post.createdAt || '');
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return post.userId?.toString() === manager._id && postDate > weekAgo;
            });
        }).length;

        // Calculate active editors (based on update or created post within a week)
        const activeEditors = editors.filter((editor: IUser) => {
            return approvedPosts.some((post: Post) => {
                const postDate = new Date(post.updatedAt || post.createdAt || '');
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return post.userId?.toString() === editor._id && postDate > weekAgo;
            });
        }).length;

        return (
            <div className="container mx-auto px-4 py-8 space-y-8">
                <QuickStats
                    draftPosts={draftPosts}
                    pendingPosts={pendingPosts}
                    scheduledPosts={scheduledPosts}
                    approvedPosts={approvedPosts}
                    rejectedPosts={rejectedPosts}
                    categories={categories}
                    managers={managers}
                    editors={editors}
                    trendingCategory={trendingCategory}
                    activeManagers={activeManagers}
                    activeEditors={activeEditors}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-3 space-y-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Recent Approved Posts</CardTitle>
                                <Button asChild>
                                    <Link href="/sriyog/published-posts">
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        View all posts
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <RecentPosts posts={approvedPosts.slice(0, 5)} postCount={5} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        )

    } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
        return (
            <div className="flex items-center justify-center h-64">
                <p>Error loading dashboard. Please try again later.</p>
            </div>
        )
    }
}