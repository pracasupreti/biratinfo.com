/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { usePostStore } from '@/store/PostStore';
import { useAuth } from '@clerk/nextjs';

import { useParams } from 'next/navigation';
import toast from 'react-hot-toast'

interface EditorFormProps {
    isEditing?: boolean,
    isWriting?: boolean
}

export function PostActions({ isEditing, isWriting }: EditorFormProps) {
    const { validate, resetStore, ...state } = usePostStore()
    const { id } = useParams()
    const { getToken } = useAuth();

    const handleSubmit = async (isDraft: boolean) => {
        if (!validate()) {
            toast.error('Please fix all errors before submitting')
            return
        }

        try {
            // Determine status based on user action and post date
            let status: string;
            if (isDraft) {
                status = 'draft';
            } else {
                const currentDate = new Date();
                const postDate = state.date ? new Date(state.date) : currentDate;

                if (isWriting) {
                    status = postDate > currentDate ? 'scheduled' : 'approved';
                } else {
                    status = postDate > currentDate ? 'scheduled' : 'pending';
                }
            }

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
                author: state.author,
                language: state.language,
                readingTime: state.readingTime,
                heroBanner: state.heroBanner,
                ogBanner: state.ogBanner,
                imageCredit: state.imageCredit,
                sponsoredAds: state.sponsoredAds,
                access: state.access,
                audioFile: state.audioFile,
                canonicalUrl: state.canonicalUrl,
                status,
            }

            // Editing Post
            if (isEditing) {
                if (!id) {
                    throw new Error("Post ID is required to update the post");
                }
                const token = await getToken();
                if (!token) {
                    throw new Error("Token is required")
                }

                try {
                    const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL

                    if (!backend_uri) throw new Error("Missing api endpoint")
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
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Failed to update post');
                    }

                    let successMessage = '';

                    switch (status) {
                        case 'draft':
                            successMessage = 'Your post has been edited and saved as draft successfully';
                            break;
                        case 'scheduled':
                            successMessage = 'Your post has been edited scheduled for publication';
                            break;
                        default:
                            successMessage = 'Your post has been edited forwarded to editor successfully';
                    }

                    toast.success(successMessage);
                    resetStore();
                } catch (error) {
                    toast.error(error instanceof Error ? error.message : 'Failed to update post');
                }
                return;
            }

            // Creating New Post
            try {
                const token = await getToken();
                const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL

                if (!backend_uri) throw new Error("Missing api endpoint")

                const response = await fetch(`${backend_uri}/api/posts/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(submissionData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to create post');
                }

                let successMessage = '';

                switch (status) {
                    case 'draft':
                        successMessage = 'Your post has been saved as draft successfully';
                        break;
                    case 'scheduled':
                        successMessage = 'Your post has been scheduled for publication';
                        break;
                    default:
                        successMessage = isWriting ? 'Your post have been successfully verified' : 'Your post has been forwarded to editor successfully';
                }
                toast.success(successMessage);
                resetStore();
            } catch (error) {
                toast.error(error instanceof Error ? error.message : 'Failed to create post');
            }

        } catch (error: any) {
            toast.error(error?.message || 'Failed to submit post. Please try again.');
        }
    }

    return (
        <div className="flex flex-col gap-2 pt-4 pb-4">
            <Button
                variant="outline"
                onClick={() => handleSubmit(true)}
                className="w-full text-xl cursor-pointer py-6"
            >
                Save as Draft
            </Button>
            <Button
                onClick={() => handleSubmit(false)}
                className="w-full text-xl cursor-pointer py-6"
            >
                Publish Post
            </Button>
        </div>
    )
}