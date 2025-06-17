'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import Post from '@/types/Post'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import QuickStats from './QuickStats'
import RecentPosts from './RecentPosts'
import { IUser } from '@/types/User'

export default function Dashboard() {
    const [pendingPosts, setPendingPosts] = useState<Post[]>([]);
    const [rejectedPosts, setRejectedPosts] = useState<Post[]>([]);
    const [approvedPosts, setApprovedPosts] = useState<Post[]>([]);
    const [draftPosts, setDraftPosts] = useState<Post[]>([]);
    const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
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
            return data.posts || [];
        }

        async function fetchAllCategories() {
            const token = await getToken();
            const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL

            if (!backend_uri) throw new Error("Missing api endpoint")
            const response = await fetch(`${backend_uri}/api/categories`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }

            const data = await response.json();
            return data.result.categories || [];
        }

        async function fetchAllUsers() {
            const token = await getToken();
            const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL

            if (!backend_uri) throw new Error("Missing api endpoint")
            const response = await fetch(`${backend_uri}/api/users`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            return data.users || [];
        }

        const fetchData = async () => {
            try {
                const [postsData, categoriesData, usersData] = await Promise.all([
                    Promise.all([
                        fetchAllPostsByStatus('pending'),
                        fetchAllPostsByStatus('approved'),
                        fetchAllPostsByStatus('rejected'),
                        fetchAllPostsByStatus('draft'),
                        fetchAllPostsByStatus('scheduled'),
                    ]),
                    fetchAllCategories(),
                    fetchAllUsers()
                ]);

                setPendingPosts(postsData[0]?.success && postsData[0].posts ? postsData[0].posts : []);
                setApprovedPosts(postsData[1]?.success && postsData[1].posts ? postsData[1].posts : []);
                setRejectedPosts(postsData[2]?.success && postsData[2].posts ? postsData[2].posts : []);
                setDraftPosts(postsData[3]?.success && postsData[3].posts ? postsData[3].posts : []);
                setScheduledPosts(postsData[4]?.success && postsData[4].posts ? postsData[4].posts : []);
                setCategories(categoriesData);
                setUsers(usersData);


            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [getToken]);

    if (loading) return <Loader />;

    // Filter users by role
    const managers = users.filter(user => user.role === 'manager');
    const editors = users.filter(user => user.role === 'editor');

    // Get trending category
    const trendingCategory = categories.length > 0
        ? categories.reduce((prev, current) =>
            (prev.postCount > current.postCount) ? prev : current
        ).category
        : "No categories";

    // Calculate active managers (based on update or created post within a week)
    const activeManagers = managers.filter(manager => {
        return approvedPosts.some(post => {
            const postDate = new Date(post.updatedAt || post.createdAt || '');
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return post.userId?.toString() === manager._id && postDate > weekAgo;
        });
    }).length;

    // Calculate active editors (based on update or created post within a week)
    const activeEditors = editors.filter(editor => {
        return approvedPosts.some(post => {
            const postDate = new Date(post.updatedAt || post.createdAt || '');
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return post.userId?.toString() === editor._id && postDate > weekAgo;
        });
    }).length;

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <QuickStats
                draftPosts={draftPosts}
                pendingPosts={pendingPosts}
                scheduledPosts={scheduledPosts}
                approvedPosts={approvedPosts}
                rejectedPosts={rejectedPosts}
                categories={categories}
                managers={managers}
                editors={editors}
                trendingCategory={trendingCategory}
                activeManagers={activeManagers}
                activeEditors={activeEditors}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-3 space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Recent Approved Posts</CardTitle>
                            <Button onClick={() => router.push('/sriyog/published-posts')}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                View all posts
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <RecentPosts posts={approvedPosts.slice(0, 5)} postCount={5} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}