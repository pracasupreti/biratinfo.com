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

    // Helper function to safely create and validate date
    const createPostDate = (dateStr: string | null, timeStr: string | null): Date | null => {
        if (!dateStr || !timeStr) {
            console.warn('Date or time is missing:', { date: dateStr, time: timeStr });
            return null;
        }

        try {
            // Ensure proper format and create ISO string
            const isoString = `${dateStr}T${timeStr}:00`;
            const postDate = new Date(isoString);

            // Validate the created date
            if (isNaN(postDate.getTime())) {
                console.error('Invalid date created from:', { dateStr, timeStr, isoString });
                return null;
            }

            return postDate;
        } catch (error) {
            console.error('Error creating post date:', error, { dateStr, timeStr });
            return null;
        }
    };

    const handleSubmit = async (isDraft: boolean) => {
        if (!validate()) {
            toast.error('Please fix all errors before submitting')
            return;
        }

        const determineStatus = () => {
            // If explicitly saving as draft, always return draft
            if (isDraft) {
                return 'draft';
            }

            const currentDate = new Date();
            const postDate = createPostDate(state.date, state.time);

            // If no valid post date, default based on user role
            if (!postDate) {
                const defaultStatus = isWriting ? 'approved' : 'pending';
                console.log(`Status: ${defaultStatus} (no valid post date)`);
                return defaultStatus;
            }

            // Compare dates (postDate > currentDate means future scheduling)
            const isScheduled = postDate.getTime() > currentDate.getTime();

            if (isWriting) {
                const status = isScheduled ? 'scheduled' : 'approved';
                return status;
            } else {
                const status = isScheduled ? 'scheduled' : 'pending';
                return status;
            }
        };

        const getSuccessMessage = (status: string) => {
            const messages = {
                draft: isEditing
                    ? 'Your post has been edited and saved as draft successfully'
                    : 'Your post has been saved as draft successfully',
                scheduled: 'Your post has been scheduled for publication',
                approved: 'Your post has been successfully approved and published',
                pending: isEditing
                    ? 'Your post has been edited and forwarded to editor successfully'
                    : 'Your post has been forwarded to editor successfully'
            };

            return messages[status as keyof typeof messages] || 'Post submitted successfully';
        };

        // Prepare submission data with proper field mapping
        const submissionData = {
            title: state.title,
            content: state.content,
            excerpt: state.excerpt,
            isNepali: state.isNepali || false, // Add isNepali field based on new schema
            featuredIn: state.featuredIn || [],
            postInNetwork: state.postInNetwork || [],

            // Media fields
            heroBanner: state.heroBanner,
            ogBanner: state.ogBanner,
            heroImageCredit: state.heroImageCredit || undefined,
            ogImageCredit: state.ogImageCredit || undefined,
            sponsoredAds: state.sponsoredAds || undefined,
            audio: state.audio, // Changed from audioFile to audio
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
            readingTime: state.readingTime,
            access: state.access,
            canonicalUrl: state.canonicalUrl,

            // Status
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
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message ||
                    `Failed to ${isEditing ? 'update' : 'create'} post (${response.status})`;

                throw new Error(errorMessage);
            }


            toast.success(getSuccessMessage(submissionData.status));
            resetStore();

        } catch (error: any) {
            console.error('Submission error:', error);
            const errorMessage = error?.message ||
                `Failed to ${isEditing ? 'update' : 'create'} post. Please try again.`;
            toast.error(errorMessage);
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
                    isWriting ? 'Approve & Publish' : 'Submit for Review'
                )}
            </Button>
        </div>
    )
}