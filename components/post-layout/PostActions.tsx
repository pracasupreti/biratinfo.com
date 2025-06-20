/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { usePostStore } from '@/store/PostStore';
import { useAuth } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react';

interface PostActionsProps {
    isEditing?: boolean,
    isWriting?: boolean,
    isSubmitting?: boolean
    onActionClick: (action: () => Promise<void>) => Promise<void>;
}

export function PostActions({ isEditing, isWriting, onActionClick, isSubmitting }: PostActionsProps) {
    const { validate, resetStore, ...state } = usePostStore()
    const { id } = useParams()
    const { getToken } = useAuth();

    const handleSubmit = async (isDraft: boolean) => {
        if (!validate()) {
            toast.error('Please fix all errors before submitting')
            return;
        }

        const determineStatus = () => {
            if (isDraft) return 'draft';

            const currentDate = new Date();
            const postDate = state.date && state.time
                ? new Date(`${state.date}T${state.time}`)
                : currentDate;

            if (isWriting) {
                return postDate > currentDate ? 'scheduled' : 'approved';
            }
            return postDate > currentDate ? 'scheduled' : 'pending';
        };

        const getSuccessMessage = (status: string) => {
            switch (status) {
                case 'draft':
                    return isEditing
                        ? 'Your post has been edited and saved as draft successfully'
                        : 'Your post has been saved as draft successfully';
                case 'scheduled':
                    return 'Your post has been scheduled for publication';
                default:
                    return isWriting
                        ? 'Your post has been successfully verified'
                        : isEditing
                            ? 'Your post has been edited and forwarded to editor successfully'
                            : 'Your post has been forwarded to editor successfully';
            }
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
            status: determineStatus(),
        };

        try {
            const token = await getToken();
            if (!token) throw new Error("Authentication required");

            const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;
            if (!backend_uri) throw new Error("Missing API endpoint");

            const endpoint = isEditing
                ? `${backend_uri}/api/posts/update`
                : `${backend_uri}/api/posts/create`;

            const method = isEditing ? 'PUT' : 'POST';
            const body = isEditing
                ? JSON.stringify({ id: id?.toString(), ...submissionData })
                : JSON.stringify(submissionData);

            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to ${isEditing ? 'update' : 'create'} post`);
            }

            toast.success(getSuccessMessage(submissionData.status));
            resetStore();

        } catch (error: any) {
            toast.error(error?.message || `Failed to ${isEditing ? 'update' : 'create'} post. Please try again.`);
        }
    };

    return (
        <div className="flex flex-col gap-2 pt-4 pb-4">
            <Button
                variant="outline"
                onClick={() => onActionClick(() => handleSubmit(true))}
                className="w-full text-base cursor-pointer py-4"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                    'Save as Draft'
                )}
            </Button>
            <Button
                onClick={() => onActionClick(() => handleSubmit(false))}
                className="w-full text-base cursor-pointer py-4"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                    'Publish Post'
                )}
            </Button>
        </div>
    )
}