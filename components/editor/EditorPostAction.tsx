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
    isReupdated?: boolean
    onActionClick: (action: () => Promise<void>) => Promise<void>
}

export function EditorPostAction({ isSubmitting, onActionClick, isReupdated }: EditorPostActionProps) {
    const { validate, resetStore, ...state } = usePostStore()
    const { id } = useParams()
    const { getToken } = useAuth()

    const [open, setOpen] = useState(false)
    const [dialogType, setDialogType] = useState<'approve' | 'reject' | null>(null)

    const determineStatus = (isApproved: boolean): 'approved' | 'scheduled' | 'rejected' => {
        if (!isApproved) {
            return 'rejected';
        }

        const currentDate = new Date();
        const postDate = state.date && state.time
            ? new Date(`${state.date}T${state.time}`)
            : currentDate;

        return postDate > currentDate ? 'scheduled' : 'approved';
    };

    const handleSubmit = async (isApproved: boolean) => {

        const status = determineStatus(isApproved);

        if (!validate(status)) {
            toast.error('Please fix all errors before submitting');
            return;
        }

        try {
            const submissionData = {
                title: state.title,
                content: state.content,
                excerpt: state.excerpt,
                isNepali: state.isNepali || false,
                featuredIn: state.featuredIn || [],
                postInNetwork: state.postInNetwork || [],

                // Media fields
                heroBanner: state.heroBanner,
                ogBanner: state.ogBanner,
                heroImageCredit: state.heroImageCredit || undefined,
                ogImageCredit: state.ogImageCredit || undefined,
                sponsoredAds: state.sponsoredAds || undefined,
                sponsorLink: state.sponsorLink || '',
                audio: state.audio,
                audioCredit: state.audioCredit || '',

                // CTA field
                ctas: state.ctas || [],

                // Other fields
                category: state.category,
                tags: state.tags || [],
                date: state.date,
                time: state.time,
                authors: state.authors || [],
                language: state.language,
                readingTime: state.readingTime || '5 min',
                access: state.access,
                canonicalUrl: state.canonicalUrl,

                // Status
                status: status,
            };

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

            if (isReupdated) {
                toast.success('Post updated successfully')
            } else {
                toast.success(
                    status === 'approved'
                        ? 'The post has been successfully approved'
                        : status === 'scheduled'
                            ? 'The post has been scheduled for later'
                            : 'The post has been rejected'
                )
            }

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
                        isReupdated ? 'Update Post' : 'Approve Post'
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
                                ? isReupdated
                                    ? 'Update this post?'
                                    : 'Approve this post?'
                                : 'Reject this post?'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {dialogType === 'approve'
                                ? isReupdated
                                    ? 'Are you sure you want to update this post?'
                                    : 'Are you sure you want to approve this post?'
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
                                isReupdated ? 'Update' : 'Approve'
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