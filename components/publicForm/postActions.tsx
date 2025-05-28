/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { usePostStore } from '@/store/Store'
import toast from 'react-hot-toast'


export function PostActions() {
    const { validate, resetStore, ...state } = usePostStore()

    const handleSubmit = async () => {
        if (!validate()) {
            toast.error('Please fix all errors before submitting')
            return
        }

        try {
            // Determine status based on user action and post date

            const currentDate = new Date();
            const postDate = state.date ? new Date(state.date) : currentDate;
            const status = postDate > currentDate ? 'scheduled' : 'pending';


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


            //Creating a New Post
            const response = await fetch('http://localhost:3001/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-special-key': process.env.NEXT_PUBLIC_SPECIAL_KEY!, // or your actual key if not from env
                },
                body: JSON.stringify(submissionData),
            });

            console.log("Response", response)

            const result = await response.json();

            if (response.ok && result.success) {
                toast.success('Your post has been forwarded to editor successfully');
                resetStore();
            } else {
                throw new Error(result.message || 'Unknown error');
            }

        } catch (error: any) {
            toast.error(error?.message || 'Failed to submit post. Please try again.');
        }
    }

    return (
        <div className="flex flex-col gap-2 pt-4">
            <Button
                onClick={() => handleSubmit()}
                className="w-full"
            >
                Publish Post
            </Button>
        </div>
    )
}