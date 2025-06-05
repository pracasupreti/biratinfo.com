'use client'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { DashboardHeader } from '@/components/editor/DashBoardHeader'
import { PostTable } from '@/components/editor/PostTable'
import Loader from '@/components/Loader'
import { useAuth } from '@clerk/nextjs'
import { Tabs, TabsContent } from '@/components/ui/tabs'


interface Post {
    _id: string;
    userId: { $oid: string };
    status: 'draft' | 'pending' | 'scheduled' | 'approved' | 'rejected';
    englishTitle: string;
    nepaliTitle: string;
    blocks: string[];
    excerpt: string;
    featuredIn: boolean[];
    postInNetwork: boolean[];
    category: string;
    tags: string;
    date: string;
    time: string;
    author: string;
    language: string;
    readingTime: string;
    heroBanner: string | null;
    ogBanner: string | null;
    imageCredit: string;
    sponsoredAds: boolean;
    access: string;
    audioFile: string | null;
    canonicalUrl: string;
    createdAt: string | null;
    updatedAt: string | null;
}

type TabValue = 'pending' | 'verified' | 'rejected' | 'drafts' | 'scheduled';

export default function EditorDashboard() {
    const [pendingPosts, setPendingPosts] = useState<Post[]>([]);
    const [rejectedPosts, setRejectedPosts] = useState<Post[]>([]);
    const [verifiedPosts, setVerifiedPosts] = useState<Post[]>([]);
    const [draftPosts, setDraftPosts] = useState<Post[]>([]);
    const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabValue>('pending');
    const { getToken } = useAuth();

    useEffect(() => {
        async function fetchPostsByStatus(status: string) {
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
                const [pendingRes, approvedRes, rejectedRes, draftRes, scheduledRes] = await Promise.all([
                    fetchPostsByStatus('pending'),
                    fetchPostsByStatus('approved'),
                    fetchPostsByStatus('rejected'),
                    fetchPostsByStatus('draft'),
                    fetchPostsByStatus('scheduled')
                ]);

                setPendingPosts(pendingRes?.success && pendingRes.posts ? pendingRes.posts : []);
                setRejectedPosts(rejectedRes?.success && rejectedRes.posts ? rejectedRes.posts : []);
                setVerifiedPosts(approvedRes?.success && approvedRes.posts ? approvedRes.posts : []);
                setDraftPosts(draftRes?.success && draftRes.posts ? draftRes.posts : []);
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
        <div className="flex min-h-screen">

            {/* Main Content */}
            <div className="flex-1 p-6 space-y-6">
                <DashboardHeader />

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <Card
                        className={`cursor-pointer ${activeTab === 'pending' ? 'border-primary' : ''}`}
                        onClick={() => setActiveTab('pending')}
                    >
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                            <span className="text-2xl font-bold">{pendingPosts.length}</span>
                        </CardHeader>
                    </Card>
                    <Card
                        className={`cursor-pointer ${activeTab === 'verified' ? 'border-green-400' : ''}`}
                        onClick={() => setActiveTab('verified')}
                    >
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium">Verified</CardTitle>
                            <span className="text-2xl font-bold">{verifiedPosts.length}</span>
                        </CardHeader>
                    </Card>
                    <Card
                        className={`cursor-pointer ${activeTab === 'rejected' ? 'border-destructive' : ''}`}
                        onClick={() => setActiveTab('rejected')}
                    >
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                            <span className="text-2xl font-bold">{rejectedPosts.length}</span>
                        </CardHeader>
                    </Card>
                    <Card
                        className={`cursor-pointer ${activeTab === 'drafts' ? 'border-orange-400' : ''}`}
                        onClick={() => setActiveTab('drafts')}
                    >
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
                            <span className="text-2xl font-bold">{draftPosts.length}</span>
                        </CardHeader>
                    </Card>
                    <Card
                        className={`cursor-pointer ${activeTab === 'scheduled' ? 'border-yellow-400' : ''}`}
                        onClick={() => setActiveTab('scheduled')}
                    >
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
                            <span className="text-2xl font-bold">{scheduledPosts.length}</span>
                        </CardHeader>
                    </Card>
                </div>

                {/* Tab Content */}
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)}>
                    <TabsContent value="pending">
                        <Card>
                            <CardHeader>
                                <CardTitle>Posts Needing Verification</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {pendingPosts.length === 0 ? (
                                    <p className="text-muted-foreground">No posts pending verification</p>
                                ) : (
                                    <PostTable
                                        posts={pendingPosts}
                                        showActions={true}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="verified">
                        <Card>
                            <CardHeader>
                                <CardTitle>Verified Posts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <PostTable posts={verifiedPosts} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="rejected">
                        <Card>
                            <CardHeader>
                                <CardTitle>Rejected Posts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <PostTable posts={rejectedPosts} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="drafts">
                        <Card>
                            <CardHeader>
                                <CardTitle>Draft Posts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <PostTable posts={draftPosts} showActions={true} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="scheduled">
                        <Card>
                            <CardHeader>
                                <CardTitle>Scheduled Posts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <PostTable posts={scheduledPosts} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}