'use client'
import Loader from '@/components/Loader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth, UserButton } from '@clerk/nextjs'
import { Calendar, Clock, Edit, Eye, PlusCircle, Trash2, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


interface Post {
    _id: string;
    userId: { $oid: string };
    status: 'draft' | 'pending' | 'scheduled';
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



export default function Dashboard() {
    const [draftPosts, setDraftPosts] = useState<Post[]>([]);
    const [pendingPosts, setPendingPosts] = useState<Post[]>([]);
    const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);
    const [approvedPosts, setApprovedPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { getToken } = useAuth();

    useEffect(() => {
        async function fetchPostsByStatus(status: string) {
            const token = await getToken();
            const response = await fetch(`https://biratinfo-backend.vercel.app/api/posts/status/${status}`, {
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
                const [draftsRes, pendingRes, scheduledRes, approvedRes] = await Promise.all([
                    fetchPostsByStatus('draft'),
                    fetchPostsByStatus('pending'),
                    fetchPostsByStatus('scheduled'),
                    fetchPostsByStatus('approved'),
                ]);
                console.log(draftsRes)

                setDraftPosts(draftsRes?.success && draftsRes.posts ? draftsRes.posts : []);
                setPendingPosts(pendingRes?.success && pendingRes.posts ? pendingRes.posts : []);
                setScheduledPosts(scheduledRes?.success && scheduledRes.posts ? scheduledRes.posts : []);
                setApprovedPosts(approvedRes?.success && approvedRes.posts ? approvedRes.posts : []);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [getToken]);

    const totalPosts =
        draftPosts.length +
        pendingPosts.length +
        scheduledPosts.length +
        approvedPosts.length;

    if (loading) return <Loader />;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Content Editor</h1>
                <div className='flex gap-6'>
                    <UserButton />
                    <Button onClick={() => router.push('/manager/post-form')}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Write New Post
                    </Button>

                </div>
            </div>

            <Tabs defaultValue="drafts" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="drafts">Drafts</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="published">Published</TabsTrigger>
                    <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                </TabsList>

                {/* DRAFTS */}
                <TabsContent value="drafts">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Drafts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className='text-left'>Title</TableHead>
                                        <TableHead className="hidden md:table-cell text-center">Last Updated</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {draftPosts.map((post) => (
                                        <TableRow key={post._id}>
                                            <TableCell className="font-medium text-left">{post.englishTitle}</TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <div className="flex items-center text-sm text-muted-foreground justify-center">
                                                    <Calendar className="mr-1 h-4 w-4" />
                                                    {post.updatedAt?.split('T')[0]}
                                                </div>
                                            </TableCell>
                                            <TableCell >
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => router.push(`/manager/edit/${post._id}`)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="justify-center">
                            {draftPosts.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground">No drafts yet</p>
                                    <Button variant="link" onClick={() => router.push('/editor/new')}>
                                        Create your first draft
                                    </Button>
                                </div>
                            )}
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* PENDING */}
                <TabsContent value="pending">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Posts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead className="hidden md:table-cell">Created At</TableHead>
                                        <TableHead className="hidden md:table-cell">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pendingPosts.map((post) => (
                                        <TableRow key={post._id}>
                                            <TableCell className="font-medium">{post.englishTitle}</TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Calendar className="mr-1 h-4 w-4" />
                                                    {post.createdAt?.split('T')[0]}
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <Badge variant="outline" className="bg-yellow-100 text-gray-800">
                                                    pending
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="justify-center">
                            {pendingPosts.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground">No pending posts</p>
                                </div>
                            )}
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* PUBLISHED */}
                <TabsContent value="published">
                    <Card>
                        <CardHeader>
                            <CardTitle>Published Posts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead className="hidden md:table-cell">Published</TableHead>
                                        <TableHead className="hidden md:table-cell">Status</TableHead>
                                        {/* <TableHead className="text-right">Views</TableHead> */}
                                        {/* <TableHead className="text-right">Actions</TableHead> */}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {approvedPosts.map((post) => (
                                        <TableRow key={post._id}>
                                            <TableCell className="font-medium">{post.englishTitle}</TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Calendar className="mr-1 h-4 w-4" />
                                                    {post.updatedAt?.split('T')[0]}
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <Badge variant="outline" className="bg-green-100 text-green-800">
                                                    Approved
                                                </Badge>
                                            </TableCell>
                                            {/* <TableCell className="text-right">{post.views.toLocaleString()}</TableCell> */}
                                            {/* <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="justify-center">
                            {approvedPosts.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground">No approved posts yet</p>
                                </div>
                            )}
                        </CardFooter>
                    </Card>
                </TabsContent>


                {/* SCHEDULED */}
                <TabsContent value="scheduled">
                    <Card>
                        <CardHeader>
                            <CardTitle>Scheduled Posts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead className="hidden md:table-cell">Scheduled For</TableHead>
                                        <TableHead className="hidden md:table-cell">Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {scheduledPosts.map((post) => (
                                        <TableRow key={post._id}>
                                            <TableCell className="font-medium">{post.englishTitle}</TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Clock className="mr-1 h-4 w-4" />
                                                    {post.createdAt?.split('T')[0]}
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                                                    Scheduled
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => router.push(`/manager/edit/${post._id}`)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="justify-center">
                            {scheduledPosts.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground">No scheduled posts</p>
                                </div>
                            )}
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3 mt-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                        <Edit className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalPosts}</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Drafts</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{draftPosts.length}</div>
                        <p className="text-xs text-muted-foreground">+1 from last week</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12,345</div>
                        <p className="text-xs text-muted-foreground">+23% from last month</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}



