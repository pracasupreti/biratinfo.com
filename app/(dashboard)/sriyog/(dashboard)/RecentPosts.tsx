'use client'
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
    // Calculate relative time
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

    // Sort posts by createdAt date (newest first)
    const sortedPosts = [...(posts || [])].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime()
        const dateB = new Date(b.createdAt || 0).getTime()
        return dateB - dateA // Descending order (newest first)
    })

    return (
        <div className="space-y-2">
            {/* Header Row */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 bg-gray-50 rounded-lg">
                <div className="col-span-1 font-medium">ID</div>
                <div className="col-span-4 font-medium">Post</div>
                <div className="col-span-2 font-medium">Category</div>
                <div className="col-span-3 font-medium">Author</div>
                <div className="col-span-2 font-medium">Posted</div>
            </div>

            {/* Content */}
            {loading ? (
                Array.from({ length: postCount }).map((_, i) => (
                    <div key={i} className="p-4 border rounded-lg bg-white shadow-sm grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-1">
                            <Skeleton className="h-6 w-full" />
                        </div>
                        <div className="col-span-12 md:col-span-4">
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-4 w-3/4 mt-1" />
                        </div>
                        <div className="col-span-12 md:col-span-2">
                            <Skeleton className="h-6 w-full" />
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <div className="flex items-center space-x-2">
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-2">
                            <Skeleton className="h-6 w-full" />
                        </div>
                    </div>
                ))
            ) : sortedPosts && sortedPosts.length > 0 ? (
                sortedPosts.slice(0, postCount).map((post) => (
                    <div
                        key={post._id}
                        className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow grid grid-cols-12 gap-4"
                    >
                        {/* ID */}
                        <div className="col-span-12 md:col-span-1 flex items-center">
                            <span className="font-mono text-sm">#{post.categoryId || '--'}</span>
                        </div>

                        {/* Post Title */}
                        <div className="col-span-12 md:col-span-4">
                            <Link
                                href={`/posts/${post._id}`}
                                className="font-medium text-gray-900 hover:underline line-clamp-1"
                            >
                                {post.englishTitle || post.nepaliTitle}
                            </Link>
                            <p className="text-sm text-gray-600 line-clamp-1 mt-1">
                                {post.excerpt || 'No excerpt available'}
                            </p>
                        </div>

                        {/* Category */}
                        <div className="col-span-12 md:col-span-2 flex items-center">
                            <Badge variant="outline" className="text-sm">
                                {post.category || 'Uncategorized'}
                            </Badge>
                        </div>

                        {/* Author */}
                        <div className="col-span-12 md:col-span-3 flex items-center">
                            {post.authors?.[0] ? (
                                <AuthorDisplay authorId={post.authors[0]} />
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>N</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm text-gray-600">No author</span>
                                </div>
                            )}
                        </div>

                        {/* Date - shows relative time */}
                        <div className="col-span-12 md:col-span-2 flex items-center">
                            <span className="text-sm text-gray-500">
                                {getTimeAgo(post.createdAt)}
                            </span>
                        </div>
                    </div>
                ))
            ) : (
                <div className="p-8 text-center text-gray-500 border rounded-lg bg-white">
                    No recent posts available
                </div>
            )}
        </div>
    )
}