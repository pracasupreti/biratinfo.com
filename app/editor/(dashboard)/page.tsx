'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import Post from '@/types/Post'
import QuickStats from './QuickStats'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import RecentPosts from './RecentPosts'
import DraftPosts from './DraftPosts'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'


export default function Dashboard() {
    const [pendingPosts, setPendingPosts] = useState<Post[]>([]);
    const [rejectedPosts, setRejectedPosts] = useState<Post[]>([]);
    const [approvedPosts, setApprovedPosts] = useState<Post[]>([]);
    const [draftPosts, setDraftPosts] = useState<Post[]>([]);
    const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
        async function fetchAllPostsByStatus(status: string) {
            const token = await getToken();
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
                throw new Error('Failed to fetch posts');
            }

            const data = await response.json();
            return data.posts;
        }



        const fetchPosts = async () => {
            try {
                const [pendingRes, approvedRes, rejectedRes] = await Promise.all([
                    fetchAllPostsByStatus('pending'),
                    fetchAllPostsByStatus('approved'),
                    fetchAllPostsByStatus('rejected'),
                ]);

                setPendingPosts(pendingRes?.success && pendingRes.posts ? pendingRes.posts : []);
                setRejectedPosts(rejectedRes?.success && rejectedRes.posts ? rejectedRes.posts : []);
                setApprovedPosts(approvedRes?.success && approvedRes.posts ? approvedRes.posts : []);

            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [getToken]);

    useEffect(() => {
        async function fetchPostsByStatus(status: string) {
            const token = await getToken();
            const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL

            if (!backend_uri) throw new Error("Missing api endpoint")
            const response = await fetch(`${backend_uri}/api/posts/status/${status}`, {
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

        const fetchPosts = async () => {
            try {
                const [draftsRes, scheduledRes] = await Promise.all([
                    fetchPostsByStatus('draft'),
                    fetchPostsByStatus('scheduled'),
                ]);
                setDraftPosts(draftsRes?.success && draftsRes.posts ? draftsRes.posts : []);
                setScheduledPosts(scheduledRes?.success && scheduledRes.posts ? scheduledRes.posts : []);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [getToken]);

    if (loading) return <Loader />;



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
                            <Button onClick={() => router.push('/editor/post-form')}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Write Post
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
