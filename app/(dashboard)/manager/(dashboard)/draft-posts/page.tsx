'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { PostTable } from '@/components/dashboardComponents/PostTable'
import Post from '@/types/Post'
import Loader from '@/components/Loader'


export default function DraftPosts() {
    const [draftPosts, setDraftPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const { getToken } = useAuth()

    useEffect(() => {
        async function fetchPostsByStatus(status: string) {
            const token = await getToken()
            const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL

            if (!backend_uri) throw new Error("Missing api endpoint")
            const response = await fetch(`${backend_uri}/api/posts/status/${status}`, {
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
            return data.posts
        }

        const fetchPosts = async () => {
            try {
                const [draftsRes] = await Promise.all([
                    fetchPostsByStatus('draft'),
                ]);
                setDraftPosts(draftsRes?.success && draftsRes.posts ? draftsRes.posts : []);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts()
    }, [getToken])

    if (loading) return <Loader />

    return (
        <PostTable
            allPosts={draftPosts}
            title="Draft Posts"
            description="Manage all draft articles"
            isEditable={true}
        />
    )
}