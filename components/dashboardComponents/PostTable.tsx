/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
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
import { Search, Edit } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { cn } from '@/lib/utils'
import Post from '@/types/Post'
import AuthorDisplay from '../AuthorDisplay'

interface PostTableProps {
    allPosts: Post[]
    title: string
    description: string
    isEditable?: boolean
    postsPerPage?: number
    isEditor?: boolean
}

export function PostTable({
    allPosts,
    title,
    description,
    isEditable = false,
    postsPerPage = 10,
    isEditor = false
}: PostTableProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pageParam = searchParams.get('page')
    const searchParam = searchParams.get('search')

    const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1)
    const [searchQuery, setSearchQuery] = useState(searchParam || '')
    const [sortConfig, setSortConfig] = useState<{ key: keyof Post; direction: 'asc' | 'desc' } | null>(null)

    const filteredPosts = allPosts.filter(post =>
        post.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.nepaliTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    const sortedPosts = [...filteredPosts].sort((a, b) => {
        if (!sortConfig) return 0
        if (a[sortConfig.key]! < b[sortConfig.key]!) return sortConfig.direction === 'asc' ? -1 : 1
        if (a[sortConfig.key]! > b[sortConfig.key]!) return sortConfig.direction === 'asc' ? 1 : -1
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
        const now = new Date()
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

        if (diffInSeconds < 0) {
            const absDiff = Math.abs(diffInSeconds)
            if (absDiff < 60) return 'In a few seconds'
            if (absDiff < 3600) return `In ${Math.floor(absDiff / 60)} min`
            if (absDiff < 86400) return `In ${Math.floor(absDiff / 3600)} hr`
            if (absDiff < 2592000) return `In ${Math.floor(absDiff / 86400)} days`
            return `On ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
        }

        if (diffInSeconds < 60) return 'Just now'
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hr ago`
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    const getSequentialId = (post: Post) => {
        return filteredPosts.findIndex(p => p._id === post._id) + 1
    }

    return (
        <div className="space-y-6 p-6 md:p-8">
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

            {/* Posts */}
            {paginatedPosts.length === 0 ? (
                <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">No posts available.</CardContent>
                </Card>
            ) : (
                <div className="space-y-3 overflow-x-auto">
                    {/* Header Row */}
                    <Card className="min-w-[900px]">
                        <CardContent className={`grid ${isEditable ? 'grid-cols-13' : 'grid-cols-12'} gap-4 items-center`}>
                            <div className="col-span-1 font-medium">ID</div>
                            <div className="col-span-3 font-medium">Title</div>
                            <div className="col-span-2 font-medium text-center">Authors</div>
                            <div className="col-span-2 font-medium text-center">Category</div>
                            <div className="col-span-2 font-medium text-center">Tags</div>
                            <div className="col-span-1 font-medium text-center">Date</div>
                            <div className="col-span-1 font-medium text-center">Status</div>
                            {isEditable && <div className="col-span-1 font-medium text-center">Action</div>}
                        </CardContent>
                    </Card>

                    {/* Rows */}
                    {paginatedPosts.map(post => (
                        <Card key={post._id} className="min-w-[900px] hover:shadow-md transition-shadow">
                            <CardContent className={`grid ${isEditable ? 'grid-cols-13' : 'grid-cols-12'} gap-4 px-4 py-3 items-center`}>
                                <div className="col-span-1 font-mono text-sm">{getSequentialId(post)}</div>

                                <div className="col-span-3 space-y-1 overflow-hidden">
                                    <h3 className="font-medium truncate" title={post.nepaliTitle}>{post.nepaliTitle}</h3>
                                    <p className="text-xs text-muted-foreground truncate" title={post.excerpt}>{post.excerpt}</p>
                                </div>

                                <div className="col-span-2 flex flex-col gap-1 items-center">
                                    {(post.authors || []).slice(0, 2).map((authorId, index) => (
                                        <AuthorDisplay key={index} authorId={authorId} />
                                    ))}
                                </div>

                                <div className="col-span-2">
                                    <Badge
                                        variant="outline"
                                        className="text-xs w-full text-center break-words whitespace-normal px-2 py-1 truncate"
                                        title={post.category}
                                    >
                                        {post.category || 'N/A'}
                                    </Badge>
                                </div>

                                <div className="col-span-2 flex justify-center">
                                    <div className="flex flex-wrap gap-1 max-w-full justify-center">
                                        {(post.tags && post.tags.length > 0) ? (
                                            post.tags.slice(0, 3).map((tag, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="secondary"
                                                    className="text-xs px-2 py-0.5 break-words max-w-[6rem] truncate text-center"
                                                    title={`#${tag}`}
                                                >
                                                    #{tag}
                                                </Badge>
                                            ))
                                        ) : (
                                            <Badge variant="secondary" className="text-xs px-2 py-0.5">N/A</Badge>
                                        )}
                                    </div>
                                </div>

                                <div className="col-span-1 text-center text-xs text-muted-foreground whitespace-nowrap">
                                    {formatDate(post.updatedAt)}
                                </div>

                                <div className="col-span-1 text-center">
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

                                {isEditable && (
                                    <div className="col-span-1 flex justify-center">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => router.push(`/${isEditor ? `editor/edit/${post._id}` : `manager/edit/${post._id}`}`)}
                                            className="cursor-pointer"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
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
