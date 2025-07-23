'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import Post from '@/types/Post'
import Loader from '@/components/Loader'
import { PostTable } from '../PostTable'


export default function DraftPosts() {
    const [draftPosts, setDraftPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const { getToken } = useAuth()

    useEffect(() => {
        async function fetchAllPostsByStatus(status: string) {
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
                const [draftsRes] = await Promise.all([
                    fetchAllPostsByStatus('draft'),
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