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
    const initialize = usePostStore(state => state.initialize)
    const { getToken } = useAuth();
    const [isReupdated, setIsReupdated] = useState<boolean>(false)

    useEffect(() => {
        const loadPost = async () => {
            try {
                const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL

                if (!backend_uri) throw new Error("Missing api endpoint")
                async function fetchPostsById(id: string) {
                    const token = await getToken();
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
                const status = response?.success && response.serializedPost.status
                status == 'approved' ? setIsReupdated(true) : setIsReupdated(false)
                if (response?.success && response.serializedPost) {
                    initialize(response.serializedPost as Partial<PostState>)
                    setIsReupdated(response.serializedPost.status === 'approved')
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
        <div className="max-w-6xl mx-auto py-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Edit Post</h1>
                <Button variant="default" onClick={() => router.push('/editor')}>
                    Back to Dashboard
                </Button>
            </div>
            <PostLayout isEditing={true} isEditor={true} isReupdated={isReupdated} />
        </div>
    )
}