'use client'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PostForm } from './PostForm'
import { PostSidebar } from './Sidebar'


interface PostLayoutProps {
    isEditing?: boolean
    isEditor?: boolean
}

export function PostLayout({ isEditing = false, isEditor }: PostLayoutProps) {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Content Editor */}
            <ScrollArea className="w-3/4 p-8">
                <PostForm isEditing={isEditing} />
            </ScrollArea>

            {/* Settings Sidebar */}
            <div className="w-1/4 p-6 border-l border-gray-200 bg-white sticky top-0 h-screen overflow-y-auto">
                <PostSidebar isEditing={isEditing} isEditor={isEditor} />
            </div>
        </div>

    )
}