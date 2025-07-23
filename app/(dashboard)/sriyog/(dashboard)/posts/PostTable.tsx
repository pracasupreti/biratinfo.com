'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationNext
} from '@/components/ui/pagination'
import { Search, Trash2, Edit, Calendar, User, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'
import Post from '@/types/Post'
import { useAuth } from '@clerk/nextjs'
import AuthorDisplay from '@/components/AuthorDisplay'
import { Card, CardContent } from '@/components/ui/card'
import toast from 'react-hot-toast'
import Link from 'next/link'

interface PostTableProps {
    allPosts: Post[]
    isPublishedPost?: boolean
    title: string
    description: string
    postsPerPage?: number
    isEditable?: boolean
}

export function PostTable({
    allPosts,
    isPublishedPost = false,
    title,
    description,
    postsPerPage = 10,
    isEditable = false
}: PostTableProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { getToken } = useAuth()
    const pageParam = searchParams.get('page')
    const searchParam = searchParams.get('search')

    const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1)
    const [searchQuery, setSearchQuery] = useState(searchParam || '')

    // Memoized filtered and sorted posts
    const processedPosts = useMemo(() => {
        const filtered = allPosts.filter(post => {
            const searchLower = searchQuery.toLowerCase()
            return (
                post.title?.toLowerCase().includes(searchLower) ||
                post.excerpt?.toLowerCase().includes(searchLower) ||
                post.category?.toLowerCase().includes(searchLower) ||
                post.tags?.some(tag => tag.toLowerCase().includes(searchLower))
            )
        })

        // Sort by updatedAt (newest first)
        return filtered.sort((a, b) => {
            const dateA = new Date(a.updatedAt || 0).getTime()
            const dateB = new Date(b.updatedAt || 0).getTime()
            return dateB - dateA
        })
    }, [allPosts, searchQuery])

    // Memoized pagination data
    const paginationData = useMemo(() => {
        const totalPages = Math.ceil(processedPosts.length / postsPerPage)
        const paginatedPosts = processedPosts.slice(
            (currentPage - 1) * postsPerPage,
            currentPage * postsPerPage
        )
        return { totalPages, paginatedPosts }
    }, [processedPosts, currentPage, postsPerPage])

    const { totalPages, paginatedPosts } = paginationData

    // Update URL params
    const updateUrlParams = useCallback((page: number, query: string) => {
        const params = new URLSearchParams()
        if (query) params.set('search', query)
        if (page > 1) params.set('page', page.toString())
        router.replace(`?${params.toString()}`, { scroll: false })
    }, [router])

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page)
        updateUrlParams(page, searchQuery)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [searchQuery, updateUrlParams])

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query)
        setCurrentPage(1)
        updateUrlParams(1, query)
    }, [updateUrlParams])

    // Enhanced date formatting
    const formatDate = useCallback((dateString: string | Date | null): string => {
        if (!dateString) return 'N/A'

        try {
            const date = new Date(dateString)
            if (isNaN(date.getTime())) return 'N/A'

            const now = new Date()
            const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

            if (diffInSeconds < 0) {
                const absDiff = Math.abs(diffInSeconds)
                if (absDiff < 60) return 'In a few seconds'
                if (absDiff < 3600) return `In ${Math.floor(absDiff / 60)} min`
                if (absDiff < 86400) return `In ${Math.floor(absDiff / 3600)} hr`
                if (absDiff < 2592000) return `In ${Math.floor(absDiff / 86400)} days`
                return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })
            }

            if (diffInSeconds < 60) return 'Just now'
            if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`
            if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hr ago`
            if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`

            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            })
        } catch {
            return 'N/A'
        }
    }, [])

    // Delete post handler
    const handleDelete = async (postId: string) => {
        const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
        if (!backend_uri) throw new Error("Missing api endpoint")

        const toastId = toast.loading("Deleting post...")
        try {
            const token = await getToken()
            const response = await fetch(`${backend_uri}/api/posts/id/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!response.ok) throw new Error('Failed to delete post')

            toast.success('Post deleted successfully', { id: toastId })
            router.refresh()
        } catch (error) {
            toast.error('Failed to delete post', { id: toastId })
            console.error('Delete error:', error)
        }
    }

    const getSequentialId = useCallback((post: Post) => {
        return processedPosts.findIndex(p => p._id === post._id) + 1
    }, [processedPosts])

    // Status badge styling
    const getStatusBadgeClass = useCallback((status: string) => {
        const statusClasses = {
            approved: "bg-green-500/10 text-green-700 border-green-300 p-1 text-[10px]",
            pending: "bg-yellow-500/10 text-yellow-700 border-yellow-300 p-1 text-[10px]",
            draft: "bg-gray-500/10 text-gray-700 border-gray-300 p-1 text-[10px]",
            scheduled: "bg-orange-500/10 text-orange-700 border-orange-300 p-1 text-[10px]",
            rejected: "bg-red-500/10 text-red-700 border-red-300 p-1 text-[10px]"
        }
        return cn("capitalize w-full text-center", statusClasses[status as keyof typeof statusClasses])
    }, [])

    const handleEditPost = useCallback((postId: string) => {
        router.push(`/writer/edit/${postId}`)
    }, [router])

    // Pagination range calculation
    const paginationRange = useMemo(() => {
        const delta = 2
        const range = []
        const rangeWithDots = []

        for (let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++) {
            range.push(i)
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...')
        } else {
            rangeWithDots.push(1)
        }

        rangeWithDots.push(...range)

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages)
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages)
        }

        return rangeWithDots.filter((item, index, arr) => arr.indexOf(item) === index)
    }, [currentPage, totalPages])

    return (
        <div className="space-y-6 p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
                <div className="text-sm text-muted-foreground">
                    Showing {paginatedPosts.length} of {processedPosts.length} posts
                </div>
            </div>

            {/* Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSearch(searchQuery)
                    }}
                    className="w-full md:w-1/3"
                >
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search posts, categories, or tags..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                </form>
            </div>

            {/* Posts */}
            {paginatedPosts.length === 0 ? (
                <Card>
                    <CardContent className="p-12 text-center">
                        <div className="flex flex-col items-center space-y-4">
                            <Search className="h-12 w-12 text-muted-foreground/50" />
                            <div>
                                <h3 className="text-lg font-medium">No posts found</h3>
                                <p className="text-muted-foreground">
                                    {searchQuery
                                        ? `No posts match your search for "${searchQuery}"`
                                        : "No posts available at the moment"
                                    }
                                </p>
                            </div>
                            {searchQuery && (
                                <Button
                                    variant="outline"
                                    onClick={() => handleSearch('')}
                                >
                                    Clear search
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-3">
                    {/* Desktop Header */}
                    <Card className="hidden lg:block bg-muted/50">
                        <CardContent className={`grid ${isEditable ? 'grid-cols-12' : 'grid-cols-11'} gap-4 items-center py-3 font-medium text-sm`}>
                            <div className="col-span-1">ID</div>
                            <div className="col-span-3">Title</div>
                            <div className="col-span-2 text-center">Authors</div>
                            <div className="col-span-2 text-center">Category</div>
                            <div className="col-span-1 text-center">Tags</div>
                            <div className="col-span-1 text-center">Updated</div>
                            <div className="col-span-1 text-center">Status</div>
                            {isEditable && (
                                <div className="col-span-1 text-center">Actions</div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Posts Rows */}
                    {paginatedPosts.map(post => (
                        <Card key={post._id} className="hover:shadow-md transition-all duration-200 hover:border-primary/20">
                            {/* Desktop Layout */}
                            <CardContent className={`hidden lg:grid ${isEditable ? 'grid-cols-12' : 'grid-cols-11'} gap-4 px-4 py-3 items-center`}>
                                <div className="col-span-1 font-mono text-sm text-muted-foreground">
                                    {getSequentialId(post)}
                                </div>

                                <div className="col-span-3 space-y-1">
                                    {isPublishedPost ? (
                                        <Link
                                            href={`/${post.category}/${post.categoryId}`}
                                            className="block hover:underline"
                                        >
                                            <h3 className="font-medium truncate text-lg" title={post.title}>{post.title}</h3>
                                        </Link>
                                    ) : (
                                        <>
                                            <h3 className="font-medium truncate" title={post.title}>{post.title}</h3>
                                        </>
                                    )}
                                    <p className="text-xs text-muted-foreground line-clamp-2" title={post.excerpt}>
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div className="col-span-2 flex flex-col gap-1 items-center">
                                    {(post.authors || []).slice(0, 2).map((authorId, index) => (
                                        <AuthorDisplay key={`${authorId}-${index}`} author={authorId} />
                                    ))}
                                    {(post.authors?.length || 0) > 2 && (
                                        <span className="text-xs text-muted-foreground">
                                            +{(post.authors?.length || 0) - 2} more
                                        </span>
                                    )}
                                </div>

                                <div className="col-span-2 flex justify-center">
                                    <Badge
                                        variant="outline"
                                        className="text-xs w-full max-w-[120px] text-center truncate"
                                        title={post.category}
                                    >
                                        {post.category || 'Uncategorized'}
                                    </Badge>
                                </div>

                                <div className="col-span-1 flex justify-center">
                                    <div className="flex flex-wrap gap-1 max-w-full justify-center">
                                        {(post.tags && post.tags.length > 0) ? (
                                            <>
                                                {post.tags.slice(0, 1).map((tag, index) => (
                                                    <Badge
                                                        key={`${tag}-${index}`}
                                                        variant="secondary"
                                                        className="text-xs px-2 py-0.5 max-w-[8rem] truncate"
                                                        title={tag}
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                                {post.tags.length > 1 && (
                                                    <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                                        +{post.tags.length - 1}
                                                    </Badge>
                                                )}
                                            </>
                                        ) : (
                                            <Badge variant="outline" className="text-xs px-2 py-0.5 text-muted-foreground">
                                                No tags
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <div className="col-span-1 text-center text-xs text-muted-foreground">
                                    {formatDate(post.updatedAt)}
                                </div>

                                <div className="col-span-1 text-center">
                                    <Badge
                                        variant="outline"
                                        className={getStatusBadgeClass(post.status)}
                                    >
                                        {post.status}
                                    </Badge>
                                </div>

                                {isEditable && (
                                    <div className="col-span-1 flex justify-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(post._id)}
                                            className="h-8 w-8 text-red-500 hover:text-red-700 cursor-pointer"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </CardContent>

                            {/* Mobile Layout */}
                            <CardContent className="lg:hidden p-4 space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-xs text-muted-foreground">
                                                #{getSequentialId(post)}
                                            </span>
                                        </div>
                                        <h3 className="font-medium line-clamp-2" title={post.title}>
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <Badge
                                            variant="outline"
                                            className={getStatusBadgeClass(post.status)}
                                        >
                                            {post.status}
                                        </Badge>
                                        {isEditable && (
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className='cursor-pointer'
                                                    onClick={() => handleEditPost(post._id)}
                                                >
                                                    <Edit className="h-4 w-4 mr-1" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className='cursor-pointer text-red-500 hover:text-red-700'
                                                    onClick={() => handleDelete(post._id)}
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1" />
                                                    Delete
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                    {post.authors && post.authors.length > 0 && (
                                        <div className="flex items-center gap-1">
                                            <User className="h-3 w-3" />
                                            <span>{post.authors.length} author{post.authors.length > 1 ? 's' : ''}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <Tag className="h-3 w-3" />
                                        <span>{post.category || 'Uncategorized'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>{formatDate(post.updatedAt)}</span>
                                    </div>
                                </div>

                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                        {post.tags.slice(0, 3).map((tag, index) => (
                                            <Badge
                                                key={`${tag}-${index}`}
                                                variant="secondary"
                                                className="text-xs px-2 py-0.5"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                        {post.tags.length > 3 && (
                                            <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                                +{post.tags.length - 3} more
                                            </Badge>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-muted-foreground w-20">
                        Page {currentPage} of {totalPages}
                    </div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (currentPage > 1) handlePageChange(currentPage - 1)
                                    }}
                                    className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                                />
                            </PaginationItem>

                            {paginationRange.map((page, index) => (
                                <PaginationItem key={index}>
                                    {page === '...' ? (
                                        <span className="px-3 py-2 text-muted-foreground">...</span>
                                    ) : (
                                        <PaginationLink
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handlePageChange(page as number)
                                            }}
                                            isActive={page === currentPage}
                                        >
                                            {page}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (currentPage < totalPages) handlePageChange(currentPage + 1)
                                    }}
                                    className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}