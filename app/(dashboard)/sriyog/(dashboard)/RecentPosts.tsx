import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import Post from '@/types/Post'
import Link from 'next/link'
import AuthorDisplay from '@/components/AuthorDisplay'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface RecentPostsProps {
    posts?: Post[]
    loading?: boolean
    postCount?: number
}

export default function RecentPosts({
    posts,
    loading = false,
    postCount = 5
}: RecentPostsProps) {
    const getTimeAgo = (dateString: string | Date | null) => {
        if (!dateString) return 'Just now'
        const date = new Date(dateString)
        const now = new Date()
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

        if (seconds < 60) return 'Just now'
        if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`
        if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    const sortedPosts = [...(posts || [])].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime()
        const dateB = new Date(b.createdAt || 0).getTime()
        return dateB - dateA
    })

    return (
        <div className="space-y-3">
            {/* Header Row */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 bg-muted rounded-lg text-sm font-semibold text-muted-foreground">
                <div className="col-span-1">ID</div>
                <div className="col-span-4">Post</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-3">Author</div>
                <div className="col-span-2">Posted</div>
            </div>

            {/* Content */}
            {loading ? (
                Array.from({ length: postCount }).map((_, i) => (
                    <div key={i} className="grid grid-cols-12 gap-4 p-4 bg-white border rounded-lg shadow-sm animate-pulse">
                        <div className="col-span-12 md:col-span-1">
                            <Skeleton className="h-6 w-full" />
                        </div>
                        <div className="col-span-12 md:col-span-4 space-y-1">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                        <div className="col-span-12 md:col-span-2">
                            <Skeleton className="h-6 w-full" />
                        </div>
                        <div className="col-span-12 md:col-span-3 flex items-center space-x-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                        <div className="col-span-12 md:col-span-2">
                            <Skeleton className="h-5 w-full" />
                        </div>
                    </div>
                ))
            ) : sortedPosts && sortedPosts.length > 0 ? (
                sortedPosts.slice(0, postCount).map((post) => (
                    <div
                        key={post._id}
                        className="grid grid-cols-12 gap-4 p-4 bg-white border rounded-lg shadow-sm hover:shadow transition-shadow duration-200"
                    >
                        {/* ID */}
                        <div className="col-span-12 md:col-span-1 flex items-center text-sm font-mono text-muted-foreground">
                            #{post.categoryId || '--'}
                        </div>

                        {/* Title + Excerpt */}
                        <div className="col-span-12 md:col-span-4 space-y-1 overflow-hidden">
                            <Link
                                href={`/posts/${post._id}`}
                                className="font-medium text-gray-900 hover:underline line-clamp-1"
                            >
                                {post.title}
                            </Link>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                                {post.excerpt || 'No excerpt available'}
                            </p>
                        </div>

                        {/* Category */}
                        <div className="col-span-12 md:col-span-2 flex items-center">
                            <Badge variant="outline" className="text-xs truncate w-fit">
                                {post.category || 'Uncategorized'}
                            </Badge>
                        </div>

                        {/* Author */}
                        <div className="col-span-12 md:col-span-3 flex items-center justify-start gap-2">
                            {post.authors?.[0] ? (
                                <AuthorDisplay authorId={post.authors[0]} />
                            ) : (
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>N</AvatarFallback>
                                    </Avatar>
                                    <span>No author</span>
                                </div>
                            )}
                        </div>

                        {/* Date */}
                        <div className="col-span-12 md:col-span-2 flex items-center text-sm text-muted-foreground">
                            {getTimeAgo(post.createdAt)}
                        </div>
                    </div>
                ))
            ) : (
                <div className="p-6 text-center text-muted-foreground border rounded-lg bg-white">
                    No recent posts available.
                </div>
            )}
        </div>
    )
}
