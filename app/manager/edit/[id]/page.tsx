'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

import { PostState, usePostStore } from '@/store/PostStore'
import toast from 'react-hot-toast'
import { PostLayout } from '@/components/post-layout/PostLayout'
import { useAuth } from '@clerk/nextjs'
import Loader from '@/components/Loader'

export default function EditPostPage() {
    const { id } = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const { getToken } = useAuth();
    const initialize = usePostStore(state => state.initialize)

    useEffect(() => {
        const loadPost = async () => {
            try {
                async function fetchPostsById(id: string) {
                    const token = await getToken();
                    const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL

                    if (!backend_uri) throw new Error("Missing api endpoint")
                    const response = await fetch(`${backend_uri}/api/posts/id/${id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch posts');
                    }

                    const data = await response.json();
                    return data.posts;
                }

                const response = await fetchPostsById(id as string)
                if (response?.success && response.serializedPost) {
                    initialize(response.serializedPost as Partial<PostState>)
                    setLoading(false)
                } else {
                    toast.error('Failed to load post')
                    router.push('/manager')
                    setLoading(false)
                }
            } catch (error) {
                toast.error('Failed to load post')
                console.error(error)
                router.push('/manager')
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }
        loadPost()
    }, [id, router, initialize, getToken])

    if (loading) {
        return <Loader />
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Edit Post</h1>
                <Button variant="outline" onClick={() => router.push('/manager')}>
                    Back to Dashboard
                </Button>
            </div>
            <PostLayout isEditing={true} />
        </div>
    )
}