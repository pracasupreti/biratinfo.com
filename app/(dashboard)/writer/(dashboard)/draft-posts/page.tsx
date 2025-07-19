/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostTable } from '@/components/dashboardComponents/PostTable'
import { auth } from '@clerk/nextjs/server'

function extractPosts(data: any): any[] {
    if (Array.isArray(data?.posts)) return data.posts;
    if (Array.isArray(data?.posts?.posts)) return data.posts.posts;
    return [];
}

export default async function DraftPosts() {
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

        const response = await fetch(`${backend_uri}/api/posts/status/draft`, {
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
        const draftPosts = data?.success ? extractPosts(data) : [];

        return (
            <PostTable
                allPosts={draftPosts}
                title="Draft Posts"
                description="Manage all draft articles"
                isEditable={true}
                isEditor={false}
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