/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { usePostStore } from '@/store/PostStore'
import { useAuth } from '@clerk/nextjs'


export function EditorPostAction() {
    const { validate, resetStore, ...state } = usePostStore()
    const { id } = useParams()
    const { getToken } = useAuth();

    const [open, setOpen] = useState(false)
    const [dialogType, setDialogType] = useState<'approve' | 'reject' | null>(null)

    const handleSubmit = async (isApproved: boolean) => {
        if (!validate()) {
            toast.error('Please fix all errors before submitting')
            return
        }

        try {
            const status = isApproved ? 'approved' : 'rejected'

            const submissionData = {
                englishTitle: state.englishTitle,
                nepaliTitle: state.nepaliTitle,
                blocks: state.blocks,
                excerpt: state.excerpt,
                featuredIn: state.featuredIn,
                postInNetwork: state.postInNetwork,
                category: state.category,
                tags: state.tags,
                date: state.tags,
                time: state.time,
                author: state.author,
                language: state.language,
                heroBanner: state.heroBanner,
                ogBanner: state.ogBanner,
                imageCredit: state.imageCredit,
                sponsoredAds: state.sponsoredAds,
                access: state.access,
                audioFile: state.audioFile,
                canonicalUrl: state.canonicalUrl,
                status,
            }


            if (!id) throw new Error('Post Id is required to update the post')

            const token = await getToken();
            if (!token) {
                throw new Error("Token is required")
            }

            const response = await fetch('http://localhost:3001/api/posts/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: id.toString(),
                    ...submissionData
                }),
            });
            const result = await response.json()

            if (result.success) {
                toast.success(
                    status === 'approved'
                        ? 'The post has been successfully approved'
                        : 'The post has been rejected'
                )
                resetStore()
            } else {
                throw new Error(result.message || 'Unknown error')
            }

        } catch (error: any) {
            toast.error(error?.message || 'Failed to submit post. Please try again.')
        } finally {
            setOpen(false)
        }
    }

    return (
        <>
            <div className="flex flex-col gap-2 pt-4">
                <Button
                    variant="outline"
                    onClick={() => {
                        setDialogType('approve')
                        setOpen(true)
                    }}
                    className="w-full hover:bg-green-500 cursor-pointer"
                >
                    Approve Post
                </Button>

                <Button
                    onClick={() => {
                        setDialogType('reject')
                        setOpen(true)
                    }}
                    className="w-full hover:bg-red-500 cursor-pointer"
                >
                    Reject Post
                </Button>
            </div>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {dialogType === 'approve'
                                ? 'Approve this post?'
                                : 'Reject this post?'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {dialogType === 'approve'
                                ? 'Are you sure you want to approve this post?'
                                : 'Are you sure you want to reject this post?'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => handleSubmit(dialogType === 'approve')}
                        >
                            {dialogType === 'approve' ? 'Approve' : 'Reject'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
