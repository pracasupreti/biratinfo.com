'use client'
import { Button } from '@/components/ui/button'
import { Pencil, Clock, FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Post from '@/types/Post'

interface DraftPostsProps {
    drafts: Post[]
    loading?: boolean
}

export default function DraftPosts({ drafts, loading = false }: DraftPostsProps) {
    const router = useRouter()


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
    const sortedPosts = [...(drafts || [])].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime()
        const dateB = new Date(b.createdAt || 0).getTime()
        return dateB - dateA
    })

    const countWords = (blocks: { content: string }[] | undefined): number => {
        if (!blocks || !Array.isArray(blocks)) return 0;

        return blocks.reduce((total, block) => {
            if (!block?.content) return total;

            let plainText = block.content.replace(/<[^>]+>/g, '');

            plainText = plainText.replace(/&[^;\s]+;/g, ' ');

            const words = plainText.replace(/\u00A0/g, ' ').trim().split(/\s+/);

            return total + words.filter(word => word.length > 0).length;
        }, 0);
    };

    const handleEdit = (postId: string) => {
        router.push(`/editor/edit/${postId}`)
    }

    return (
        <div>
            <div className="space-y-4">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-start justify-between p-3 rounded-lg border bg-white shadow-sm">
                            <div className="flex-1 min-w-0 pr-2">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                            <div className="flex space-x-1">
                                <div className="h-8 w-8 bg-gray-200 rounded"></div>
                                <div className="h-8 w-8 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    sortedPosts.map((draft) => (
                        <div key={draft._id} className="flex items-start justify-between p-3 rounded-lg hover:bg-gray-50 border bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex-1 min-w-0 pr-2">
                                <h3 className="text-sm font-medium line-clamp-2">
                                    {draft.englishTitle || draft.nepaliTitle}
                                </h3>
                                <div className="flex items-center mt-1 text-xs text-gray-500 space-x-3">
                                    <span className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {getTimeAgo(draft.updatedAt)}
                                    </span>
                                    <span className="flex items-center">
                                        <FileText className="h-3 w-3 mr-1" />
                                        {countWords(draft.blocks)} words
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 cursor-pointer"
                                    onClick={() => handleEdit(draft._id)}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {!loading && drafts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No draft posts available
                </div>
            )}
            {!loading && drafts.length > 0 && (
                <Button variant="outline" className="w-full mt-4 text-sm cursor-pointer" onClick={() => router.push('/editor/my-posts/draft-posts')}>
                    View All Drafts
                </Button>
            )}
        </div>
    )
}