'use client'
import { PostLayout } from '@/components/post-layout/PostLayout'
import { Button } from '@/components/ui/button'
import { usePostStore } from '@/store/PostStore'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function page() {
    const router = useRouter();
    const { resetStore } = usePostStore()
    useEffect(() => {
        resetStore();
    }, [])
    return (

        // {/* Left scrollable content section */}
        // {/* <iframe
        //     className="airtable-embed"
        //     src="https://airtable.com/embed/appi9RVW8Hmb4eNEI/pagixHn6O4Yy5MCG8/form"
        //     width="100%"
        //     height="100%"
        //     style={{ background: 'transparent', border: '1px solid #ccc' }}
        //     title="Airtable Embed"
        // /> */}

        <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Create a Post</h1>
                <Button variant="outline" onClick={() => router.push('/manager')}>
                    Back to Dashboard
                </Button>
            </div>
            <PostLayout />
        </div>


    )
}

export default page