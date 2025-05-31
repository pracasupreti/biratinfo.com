'use client'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { DashboardHeader } from '@/components/editor/DashBoardHeader'
import { PostTable } from '@/components/editor/PostTable'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'
import { useAuth } from '@clerk/nextjs'

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

// Demo data
const demoPosts = [
    {
        id: '1',
        title: 'New Education Policy Announced',
        author: 'Manager',
        status: 'pending',
        createdAt: '2023-06-15',
        content: 'The government has announced a new education policy...',
        category: 'education',
        tags: ['policy', 'government']
    },
    {
        id: '2',
        title: 'City Infrastructure Projects',
        author: 'Manager',
        status: 'verified',
        createdAt: '2023-06-10',
        content: 'Several new infrastructure projects will begin next month...',
        category: 'infrastructure',
        tags: ['construction', 'development']
    },
    {
        id: '3',
        title: 'Economic Growth Report',
        author: 'Manager',
        status: 'rejected',
        createdAt: '2023-06-05',
        content: 'The latest economic growth figures show...',
        category: 'economy',
        tags: ['finance', 'statistics']
    }
]

export default function EditorDashboard() {
    const [posts, setPosts] = useState<Post[]>([])
    const [pendingPosts, setPendingPosts] = useState<Post[]>([]);
    const [rejectedPosts, setRejectedPosts] = useState<Post[]>([]);
    const [verifiedPosts, setVerifiedPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { getToken } = useAuth();

    async function fetchPostsByStatus(status: string) {
        const token = await getToken();
        const response = await fetch(`http://localhost:3001/api/posts/allpost/${status}`, {
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
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const [pendingRes, approvedRes, rejectedRes] = await Promise.all([
                    fetchPostsByStatus('pending'),
                    fetchPostsByStatus('approved'),
                    fetchPostsByStatus('rejected')
                ]);
                setPendingPosts(pendingRes?.success && pendingRes.posts ? pendingRes.posts : []);
                setRejectedPosts(rejectedRes?.success && rejectedRes.posts ? rejectedRes.posts : []);
                setVerifiedPosts(approvedRes?.success && approvedRes.posts ? approvedRes.posts : []);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);


    if (loading) return <Loader />;

    return (
        <div className="p-6 space-y-6">
            <DashboardHeader />

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <span className="text-2xl font-bold">{pendingPosts.length}</span>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium">Verified</CardTitle>
                        <span className="text-2xl font-bold">{verifiedPosts.length}</span>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                        <span className="text-2xl font-bold">{rejectedPosts.length}</span>
                    </CardHeader>
                </Card>
            </div>

            {/* Pending Posts */}
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

            {/* Verified Posts */}
            <Card>
                <CardHeader>
                    <CardTitle>Verified Posts</CardTitle>
                </CardHeader>
                <CardContent>
                    <PostTable posts={verifiedPosts} />
                </CardContent>
            </Card>

            {/* Rejected Posts */}
            <Card>
                <CardHeader>
                    <CardTitle>Rejected Posts</CardTitle>
                </CardHeader>
                <CardContent>
                    <PostTable posts={rejectedPosts} />
                </CardContent>
            </Card>
        </div>
    )
}