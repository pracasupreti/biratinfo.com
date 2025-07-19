/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostTable } from '@/components/dashboardComponents/PostTable'
import { auth } from '@clerk/nextjs/server'

function extractPosts(data: any): any[] {
    if (Array.isArray(data?.posts)) return data.posts;
    if (Array.isArray(data?.posts?.posts)) return data.posts.posts;
    return [];
}

export default async function PublishedPosts() {
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
        const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
        if (!backend_uri) throw new Error("Missing API endpoint")

        const response = await fetch(`${backend_uri}/api/posts/status/approved`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error('Failed to fetch posts')
        }

        const data = await response.json()
        const approvedPosts = data?.success ? extractPosts(data) : [];

        return (
            <PostTable
                allPosts={approvedPosts}
                isPublishedPost={true}
                title="Published Posts"
                description="Manage all published articles"
                isEditable={false}
            />
        )
    } catch (error) {
        console.error("Failed to fetch posts:", error)
        return (
            <div className="flex items-center justify-center h-64">
                <p>Error loading posts. Please try again later.</p>
            </div>
        )
    }
}