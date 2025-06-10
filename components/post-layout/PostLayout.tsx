'use client'
import { PostForm } from './PostForm'
import { PostSidebar } from './Sidebar'

interface PostLayoutProps {
    isEditing?: boolean
    isEditor?: boolean
    isWriting?: boolean
}

export function PostLayout({ isEditing = false, isEditor = false, isWriting = false }: PostLayoutProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-6 py-6 ">
            <div className='lg:col-span-6'>
                <PostForm />
            </div>

            <div className="lg:col-span-3">
                <div className="rounded-lg shadow-xl">
                    <PostSidebar
                        isEditing={isEditing}
                        isEditor={isEditor}
                        isWriting={isWriting}
                    />
                </div>
            </div>
        </div>
    )
}