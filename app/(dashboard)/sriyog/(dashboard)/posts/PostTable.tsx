/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from '@/components/ui/pagination'
import { Search, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Post from '@/types/Post'
import { useAuth } from '@clerk/nextjs'
import { toast } from 'sonner'
import AuthorDisplay from '@/components/AuthorDisplay'
import { Card, CardContent } from '@/components/ui/card'

interface PostTableProps {
    allPosts: Post[]
    title: string
    description: string
    postsPerPage?: number
}

export function PostTable({
    allPosts,
    title,
    description,
    postsPerPage = 10,
}: PostTableProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { getToken } = useAuth()
    const pageParam = searchParams.get('page')
    const searchParam = searchParams.get('search')

    const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1)
    const [searchQuery, setSearchQuery] = useState(searchParam || '')
    const [sortConfig, setSortConfig] = useState<{ key: keyof Post; direction: 'asc' | 'desc' } | null>(null)

    // Filter, sort and paginate posts
    const filteredPosts = allPosts.filter(post =>
        post.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.nepaliTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    const sortedPosts = [...filteredPosts].sort((a, b) => {
        if (!sortConfig) return 0
        if (a[sortConfig.key]! < b[sortConfig.key]!) {
            return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key]! > b[sortConfig.key]!) {
            return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
    })

    const totalPages = Math.ceil(sortedPosts.length / postsPerPage)
    const paginatedPosts = sortedPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    )

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        updateUrlParams(page, searchQuery)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSearch = (query: string) => {
        setSearchQuery(query)
        setCurrentPage(1)
        updateUrlParams(1, query)
    }

    const updateUrlParams = (page: number, query: string) => {
        const params = new URLSearchParams()
        if (query) params.set('search', query)
        if (page > 1) params.set('page', page.toString())
        router.replace(`?${params.toString()}`, { scroll: false })
    }

    const formatDate = (dateString: string | Date | null): string => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
    }

    const handleDelete = async (postId: string) => {
        try {
            const token = await getToken()
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })

            if (!response.ok) throw new Error('Failed to delete post')

            toast.success('Post deleted successfully')
            router.refresh() // Refresh the page after deletion
        } catch (error) {
            toast.error('Failed to delete post')
            console.error('Delete error:', error)
        }
    }

    const getSequentialId = (post: Post) => {
        return filteredPosts.findIndex(p => p._id === post._id) + 1
    }

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

            {/* Posts Grid */}
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
                            <div className="col-span-3 font-medium">Title</div>
                            <div className="col-span-2 font-medium flex items-center justify-center">Authors</div>
                            <div className="col-span-1 font-medium">Category</div>
                            <div className="col-span-1 font-medium flex items-center justify-center">Tags</div>
                            <div className="col-span-2 font-medium flex items-center justify-center">Date</div>
                            <div className="col-span-1 font-medium">Status</div>
                            <div className="col-span-1 font-medium text-center">Actions</div>
                        </CardContent>
                    </Card>

                    {/* Posts */}
                    {paginatedPosts.map((post) => (
                        <Card key={post._id} className="hover:shadow-md transition-shadow">
                            <CardContent className="grid grid-cols-12 gap-4 px-4 py-3 items-center">
                                {/* ID */}
                                <div className="col-span-1">
                                    <span className="font-mono text-sm">{getSequentialId(post)}</span>
                                </div>

                                {/* Title */}
                                <div className="col-span-3 space-y-1">
                                    <h3 className="font-medium line-clamp-1">{post.englishTitle}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                                </div>

                                {/* Authors */}
                                <div className="col-span-2 flex items-center justify-center">
                                    <div className="flex flex-col gap-2">
                                        {(post.authors || []).slice(0, 2).map((authorId, index) => (
                                            <AuthorDisplay key={index} authorId={authorId} />
                                        ))}
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="col-span-1">
                                    <Badge variant="outline" className="text-sm w-full text-center">
                                        {post.category}
                                    </Badge>
                                </div>

                                {/* Tags */}
                                <div className="col-span-1 flex justify-center">
                                    <div className="flex flex-col gap-1">
                                        {(post.tags || []).slice(0, 3).map((tag, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className="text-xs px-2 py-0.5 w-fit"
                                            >
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="col-span-2 text-sm text-muted-foreground whitespace-nowrap flex items-center justify-center">
                                    {formatDate(post.createdAt)}
                                </div>

                                {/* Status */}
                                <div className="col-span-1">
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            "capitalize w-full text-center",
                                            post.status === 'approved' && "bg-green-500/10 text-green-700 border-green-300",
                                            post.status === 'pending' && "bg-yellow-500/10 text-yellow-700 border-yellow-300",
                                            post.status === 'draft' && "bg-gray-500/10 text-gray-700 border-gray-300",
                                            post.status === 'scheduled' && "bg-orange-500/10 text-orange-700 border-orange-300",
                                            post.status === 'rejected' && "bg-red-500/10 text-red-700 border-red-300"
                                        )}
                                    >
                                        {post.status}
                                    </Badge>
                                </div>

                                {/* Actions */}
                                <div className="col-span-1 flex justify-center gap-2">
                                    {/* <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => router.push(`/admin/edit/${post._id}`)}
                                        className="hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button> */}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(post._id)}
                                        className="hover:bg-red-50 hover:text-red-600 cursor-pointer"
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