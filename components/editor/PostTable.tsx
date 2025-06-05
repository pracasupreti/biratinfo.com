'use client'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'

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

interface PostTableProps {
    posts: Post[],
    showActions?: boolean,
}

export const PostTable = ({ posts, showActions = false }: PostTableProps) => {
    const router = useRouter()
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    {showActions && <TableHead>Actions</TableHead>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {posts.map((post) => (
                    <TableRow key={post._id}>
                        <TableCell className="font-medium">{post.englishTitle}</TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>{post.createdAt?.split('T')[0]}</TableCell>
                        <TableCell>
                            <Badge variant={
                                post.status === 'approved' ? 'default' :
                                    post.status === 'rejected' ? 'destructive' : 'secondary'
                            }>
                                {post.status}
                            </Badge>
                        </TableCell>
                        {showActions && (
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => router.push(`/editor/edit/${post._id}`)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}