'use client'
import { PostForm } from './PostForm'
import { PostSidebar } from './Sidebar'


interface PostLayoutProps {
    isEditing?: boolean
    isEditor?: boolean
}

export function PostLayout({ isEditing = false, isEditor }: PostLayoutProps) {
    return (
        <div className="grid grid-cols-9 gap-8">
            {/* Content Editor */}
            <div className='col-span-6'>
                <PostForm />
            </div>



            {/* Settings Sidebar */}
            <div className="border-gray-200 bg-white h-screen col-span-3">
                <PostSidebar isEditing={isEditing} isEditor={isEditor} />
            </div>
        </div>

    )
}