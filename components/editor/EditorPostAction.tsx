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
import { Loader2 } from 'lucide-react'

interface EditorPostActionProps {
    isSubmitting: boolean
    onActionClick: (action: () => Promise<void>) => Promise<void>
}

export function EditorPostAction({ isSubmitting, onActionClick }: EditorPostActionProps) {
    const { validate, resetStore, ...state } = usePostStore()
    const { id } = useParams()
    const { getToken } = useAuth()

    const [open, setOpen] = useState(false)
    const [dialogType, setDialogType] = useState<'approve' | 'reject' | null>(null)

    const handleSubmit = async (isApproved: boolean) => {
        if (!validate()) {
            toast.error('Please fix all errors before submitting')
            return
        }

        try {
            const determineStatus = () => {
                if (isApproved) {
                    const currentDate = new Date();
                    const postDate = state.date && state.time
                        ? new Date(`${state.date}T${state.time}`)
                        : currentDate;
                    return postDate > currentDate ? 'scheduled' : 'approved';
                }

                return 'rejected'
            };

            const submissionData = {
                englishTitle: state.englishTitle,
                nepaliTitle: state.nepaliTitle,
                blocks: state.blocks,
                excerpt: state.excerpt,
                featuredIn: state.featuredIn,
                postInNetwork: state.postInNetwork,
                category: state.category,
                tags: state.tags,
                date: state.date,
                time: state.time,
                authors: state.authors,
                language: state.language,
                readingTime: state.readingTime,
                heroBanner: state.heroBanner,
                ogBanner: state.ogBanner,
                heroImageCredit: state.heroImageCredit,
                ogImageCredit: state.ogImageCredit,
                sponsoredAds: state.sponsoredAds,
                access: state.access,
                audioFile: state.audioFile,
                canonicalUrl: state.canonicalUrl,
                status: determineStatus()
            }

            if (!id) throw new Error('Post ID is required to update the post')
            const token = await getToken()
            if (!token) throw new Error("Authentication required")

            const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
            if (!backend_uri) throw new Error("Missing API endpoint")

            const response = await fetch(`${backend_uri}/api/posts/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: id.toString(),
                    ...submissionData
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Failed to update post')
            }

            const status = determineStatus()

            toast.success(
                status === 'approved'
                    ? 'The post has been successfully approved'
                    : status === 'scheduled'
                        ? 'The post has been scheduled for later'
                        : 'The post has been rejected'
            );

            resetStore()
        } catch (error: any) {
            toast.error(error?.message || 'Failed to submit post. Please try again.')
        } finally {
            setOpen(false)
        }
    }

    const handleButtonClick = (type: 'approve' | 'reject') => {
        setDialogType(type)
        setOpen(true)
    }

    return (
        <>
            <div className="flex flex-col gap-2 pt-4">
                <Button
                    variant="outline"
                    onClick={() => handleButtonClick('approve')}
                    className="w-full hover:bg-green-500 cursor-pointer"
                    disabled={isSubmitting}
                >
                    {isSubmitting && dialogType === 'approve' ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                        'Approve Post'
                    )}
                </Button>

                <Button
                    onClick={() => handleButtonClick('reject')}
                    className="w-full hover:bg-red-500 cursor-pointer"
                    disabled={isSubmitting}
                >
                    {isSubmitting && dialogType === 'reject' ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                        'Reject Post'
                    )}
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
                        <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => onActionClick(() => handleSubmit(dialogType === 'approve'))}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : dialogType === 'approve' ? (
                                'Approve'
                            ) : (
                                'Reject'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}