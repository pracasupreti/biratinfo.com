// /* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Search, Trash2 } from 'lucide-react'
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
}

export function PostTable({
    allPosts,
    isPublishedPost = false,
    title,
    description,
    postsPerPage = 10
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

    // Date formatting
    const formatDate = useCallback((dateString: string | Date | null): string => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }, [])

    // Delete post handler
    const handleDelete = async (postId: string) => {
        const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
        if (!backend_uri) throw new Error("Missing api endpoint")

        toast.loading("Deleting post...")
        try {
            const token = await getToken()
            const response = await fetch(`${backend_uri}/api/posts/id/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!response.ok) throw new Error('Failed to delete post')

            toast.success('Post deleted successfully')
            router.refresh()
        } catch (error) {
            toast.error('Failed to delete post')
            console.error('Delete error:', error)
        }
    }

    const getSequentialId = useCallback((post: Post) => {
        return processedPosts.findIndex(p => p._id === post._id) + 1
    }, [processedPosts])

    // Status badge styling
    const getStatusBadgeClass = useCallback((status: string) => {
        const statusClasses = {
            approved: "bg-green-500/10 text-green-700 border-green-300",
            pending: "bg-yellow-500/10 text-yellow-700 border-yellow-300",
            draft: "bg-gray-500/10 text-gray-700 border-gray-300",
            scheduled: "bg-orange-500/10 text-orange-700 border-orange-300",
            rejected: "bg-red-500/10 text-red-700 border-red-300"
        }
        return cn("capitalize w-full text-center", statusClasses[status as keyof typeof statusClasses])
    }, [])

    return (
        <div className="space-y-6 p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>

            {/* Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchQuery) }} className="w-full md:w-1/3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search posts, authors or tags..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                </form>
            </div>

            {/* No Posts */}
            {paginatedPosts.length === 0 ? (
                <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                        No posts available.
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-3">
                    {/* Header Row */}
                    <Card className="hidden sm:grid">
                        <CardContent className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-1 font-medium">ID</div>
                            <div className="col-span-4 font-medium">Title</div>
                            <div className="col-span-2 font-medium text-center">Authors</div>
                            <div className="col-span-2 font-medium text-center">Category</div>
                            <div className="col-span-1 font-medium text-center">Status</div>
                            <div className="col-span-1 font-medium text-center">Date</div>
                            <div className="col-span-1 font-medium text-center">Actions</div>
                        </CardContent>
                    </Card>

                    {/* Posts */}
                    {paginatedPosts.map(post => (
                        <Card key={post._id} className="hover:shadow-md transition-shadow">
                            <CardContent className="grid grid-cols-12 gap-4 px-4 py-3 items-center text-sm">
                                {/* ID */}
                                <div className="col-span-1 font-mono">{getSequentialId(post)}</div>

                                {/* Title */}
                                <div className="col-span-4 overflow-hidden">
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
                                    <p className="text-muted-foreground text-sm truncate" title={post.excerpt}>{post.excerpt}</p>
                                </div>

                                {/* Authors */}
                                <div className="col-span-2 flex flex-col gap-1 items-center">
                                    {(post.authors || []).slice(0, 2).map((authorId, index) => (
                                        <AuthorDisplay key={index} authorId={authorId} />
                                    ))}
                                </div>

                                {/* Category */}
                                <div className="col-span-2">
                                    <Badge
                                        variant="outline"
                                        className="text-xs w-full text-center break-words px-2 py-1 whitespace-normal"
                                        title={post.category}
                                    >
                                        {post.category || 'N/A'}
                                    </Badge>
                                </div>

                                {/* Status */}
                                <div className="col-span-1 text-center">
                                    <Badge
                                        variant="outline"
                                        className={getStatusBadgeClass(post.status)}
                                    >
                                        {post.status}
                                    </Badge>
                                </div>

                                {/* Date */}
                                <div className="col-span-1 text-center text-muted-foreground">
                                    {formatDate(post.createdAt)}
                                </div>

                                {/* Delete Action */}
                                <div className="col-span-1 flex justify-center">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(post._id)}
                                        className="h-8 w-8 text-red-500 hover:text-red-700 cursor-pointer"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (currentPage > 1) handlePageChange(currentPage - 1)
                                }}
                                isActive={currentPage > 1}
                            />
                        </PaginationItem>

                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const page = currentPage <= 3
                                ? i + 1
                                : currentPage >= totalPages - 2
                                    ? totalPages - 4 + i
                                    : currentPage - 2 + i
                            return (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handlePageChange(page)
                                        }}
                                        isActive={page === currentPage}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        })}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (currentPage < totalPages) handlePageChange(currentPage + 1)
                                }}
                                isActive={currentPage < totalPages}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}