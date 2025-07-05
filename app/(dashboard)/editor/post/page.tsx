'use client'
import { PostLayout } from '@/components/post-layout/PostLayout'
import { Button } from '@/components/ui/button'
import { usePostStore } from '@/store/PostStore'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function Page() {
    const router = useRouter();
    const { resetStore } = usePostStore()

    useEffect(() => {
        resetStore();
    }, [resetStore])
    return (
        <div className=" max-w-6xl mx-auto py-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Create a Post</h1>
                <Button variant="default" onClick={() => router.push('/editor')}>
                    Back to Dashboard
                </Button>
            </div>
            <PostLayout isEditor={true} isWriting={true} />
        </div>
    )
}

export default Page