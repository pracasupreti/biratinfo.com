'use client'
import { PostForm } from './PostForm'
import { PostSidebar } from './Sidebar'
import { Button } from '@/components/ui/button'
import { usePostStore } from '@/store/PostStore'

interface PostLayoutProps {
    isEditing?: boolean
    isEditor?: boolean
    isWriting?: boolean
}

export function PostLayout({ isEditing = false, isEditor = false, isWriting = false }: PostLayoutProps) {
    const { isNepali, toggleLanguage } = usePostStore()

    return (
        <div className="space-y-4">
            {/* Language switcher */}
            <div className="flex justify-end">
                <Button
                    variant="outline"
                    onClick={toggleLanguage}
                    className="mb-4"
                >
                    {isNepali ? 'Switch to English' : 'नेपालीमा स्विच गर्नुहोस्'}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-9 gap-6 py-6">
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
        </div>
    )
}