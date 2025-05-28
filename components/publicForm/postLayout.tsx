import { ScrollArea } from '@/components/ui/scroll-area'
import { PostForm } from './postForm'
import { PostSidebar } from './sidebar'

export function PostLayout() {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Content Editor */}
            <ScrollArea className="w-3/4 p-8">
                <PostForm />
            </ScrollArea>

            {/* Settings Sidebar */}
            <div className="w-1/4 p-6 border-l border-gray-200 bg-white sticky top-0 h-screen overflow-y-auto">
                <PostSidebar />
            </div>
        </div>

    )
}