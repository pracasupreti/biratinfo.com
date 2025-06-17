'use client'
import { PostTable } from '@/components/dashboardComponents/PostTable'
import Loader from '@/components/Loader'
import Post from '@/types/Post'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

export default function PendingPosts() {
    const [pendingPosts, setPendingPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const { getToken } = useAuth()

    useEffect(() => {
        async function fetchPostsByStatus(status: string) {
            const token = await getToken()
            const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL

            if (!backend_uri) throw new Error("Missing api endpoint")
            const response = await fetch(`${backend_uri}/api/posts/allpost/${status}`, {
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
                const [pendingRes] = await Promise.all([
                    fetchPostsByStatus('pending'),
                ]);
                setPendingPosts(pendingRes?.success && pendingRes.posts ? pendingRes.posts : []);
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
            allPosts={pendingPosts}
            title="Pending Posts"
            description="Posts awaiting review and approval"
            isEditable={true}
            isEditor={true}
        />
    )
}