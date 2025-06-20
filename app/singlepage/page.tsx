/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Author, IPost, SinglePost } from '@/types/Post';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock2Icon, TagIcon, CopyIcon, CheckIcon } from 'lucide-react';
import NepaliDateTime from '@/components/homepage/NepaliDate';
import Footer from '@/components/homepage/Footer';
import Header from '@/components/homepage/Header';
import { Button } from '@/components/ui/button';
import NepaliTimeDisplay from '@/components/homepage/NepaliTime';
import { getNepaliCategory } from '@/components/homepage/Hero';
import Loader from '@/components/Loader';

// --- Helper Functions & Constants ---
const getAuthorName = (authors: Author[] | undefined): string => {
    if (!authors || authors.length === 0) return 'अज्ञात';
    return `${authors[0].firstName} ${authors[0].lastName}`.trim() || 'अज्ञात';
};

const getAuthorInitial = (authors: Author[] | undefined): string => {
    const name = getAuthorName(authors);
    return name.charAt(0).toUpperCase();
};

const API_CONFIG = {
    backend_uri: process.env.NEXT_PUBLIC_BACKEND_URL,
    apiKey: process.env.NEXT_PUBLIC_API_SPECIAL_KEY,
};

// --- Sub-components for better structure ---

// 1. Post Meta Information Component
const PostMeta: FC<{ post: SinglePost }> = ({ post }) => (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base text-white/90">
        <div className="flex items-center gap-2">
            <Avatar className="w-7 h-7 border-2 border-white/50">
                <AvatarImage src={post.authors?.[0]?.avatar} alt={getAuthorName(post.authors)} />
                <AvatarFallback className="bg-primary text-white text-xs">
                    {getAuthorInitial(post.authors)}
                </AvatarFallback>
            </Avatar>
            <span>{getAuthorName(post.authors)}</span>
        </div>
        <span className="flex items-center gap-1.5">
            <Clock2Icon className="w-4 h-4" />
            <NepaliTimeDisplay timeText={post.readingTime} />
        </span>
        <span className="flex items-center gap-1.5">
            <TagIcon className="w-4 h-4" />
            {getNepaliCategory(post.category)}
        </span>
        <NepaliDateTime updatedAt={post.updatedAt!} />
    </div>
);

// 2. Post Hero Section Component
const PostHero: FC<{ post: SinglePost }> = ({ post }) => (
    <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        {post.heroBanner ? (
            <Image
                src={post.heroBanner}
                alt={post.nepaliTitle}
                fill
                className="object-cover w-full"
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
            />
        ) : (
            <div className="w-full h-full bg-gray-300" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10 text-white">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-lg">
                    {post.nepaliTitle}
                </h1>
                <PostMeta post={post} />
            </div>
        </div>
    </div>
);

// 3. Social Share Component
const SocialShare = () => {
    const [isCopied, setIsCopied] = useState(false);
    const copyToClipboard = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            });
        }
    };
    return (
        <div className='border-t border-b border-gray-200 py-4 my-8'>
            <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                <h3 className='text-lg font-semibold text-gray-800'>यो खबर सेयर गर्नुहोस्:</h3>
                <div className="flex items-center gap-2">
                    <div className="sharethis-inline-share-buttons"></div>
                    <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-2">
                        {isCopied ? <CheckIcon className="w-4 h-4 text-green-500" /> : <CopyIcon className="w-4 h-4" />}
                        {isCopied ? 'लिङ्क कपि भयो' : 'लिङ्क कपि'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

// 4. NEW: Component for Content with a Sidebar Ad
const ContentWithSidebarAd: FC<{ contentHtml: string; sponsorBanner: string | null; }> = ({ contentHtml, sponsorBanner }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 my-12 not-prose">
            {/* Main Content on the left */}
            <div
                className="flex-1 article-content"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Sponsor Ad on the right */}
            <div className="w-full lg:w-[300px] lg:min-w-[300px] h-[500px] rounded-lg bg-gray-100 overflow-hidden shadow-md sticky top-24">
                {sponsorBanner ? (
                    <a href="#" target="_blank" rel="noopener noreferrer sponsored" className="block w-full h-full">
                        <Image
                            src={sponsorBanner}
                            alt="Sponsor Advertisement"
                            width={300}
                            height={500}
                            className="w-full h-full object-cover"
                        />
                    </a>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-200 p-4">
                        <div className="text-center">
                            <p className="font-medium mb-2">Advertisement</p>
                            <p className="text-sm">Your brand could be here</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// 5. UPDATED: Article Body Component
const ArticleBody: FC<{ blocks: { content: string }[], sponsorBanner: string | null }> = ({ blocks, sponsorBanner }) => {
    // We will replace the block at this index with the two-column ad layout
    const AD_INSERT_INDEX = 2; // Inserts the ad layout at the 3rd position

    return (
        <div className="prose-lg max-w-none text-gray-800 leading-relaxed">
            {blocks.map((block, index) => {
                // Check if this is the designated block for the ad layout
                if (index === AD_INSERT_INDEX && sponsorBanner) {
                    return (
                        <ContentWithSidebarAd
                            key={`ad-block-${index}`}
                            contentHtml={block.content}
                            sponsorBanner={sponsorBanner}
                        />
                    );
                }

                // Otherwise, render the standard content block
                return (
                    <div
                        key={`block-${index}`}
                        className="mb-6 article-content"
                        dangerouslySetInnerHTML={{ __html: block.content }}
                    />
                );
            })}
        </div>
    );
};

// 6. Related Post Card Component
const RelatedPostCard: FC<{ post: IPost }> = ({ post }) => (
    <Link href={`/post/${post.category}/${post._id}`} className="block group">
        <article className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1">
            <div className="relative h-48">
                {post.heroBanner ? (
                    <Image src={post.heroBanner} alt={post.nepaliTitle} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm p-4 text-center">तस्वीर उपलब्ध छैन</div>
                )}
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h5 className="font-semibold text-base line-clamp-3 mb-2 text-text-color group-hover:text-primary transition-colors">{post.nepaliTitle}</h5>
                <p className="text-sm text-gray-600 line-clamp-2 mt-auto">{post.excerpt}</p>
            </div>
        </article>
    </Link>
);


// --- Main Page Component ---
const PostPage = () => {
    const params = useParams();
    const router = useRouter();
    const { category, id } = params;

    const [postData, setPostData] = useState<SinglePost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<IPost[]>([]);
    const [sponsorBanner, setSponsorBanner] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!category || !id) return;
        const { backend_uri, apiKey } = API_CONFIG;
        if (!backend_uri || !apiKey) {
            setErrorMessage('API configuration is missing.');
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setErrorMessage(null);
            try {
                const headers = { 'x-special-key': apiKey };
                const options: RequestInit = { headers, cache: 'no-store' };

                const postRes = await fetch(`${backend_uri}/api/posts/full/${category}/${id}`, options);
                if (!postRes.ok) throw new Error(`Failed to fetch post. Status: ${postRes.status}`);
                const postResult = await postRes.json();
                const fetchedPost = postResult?.post?.[0];

                if (!fetchedPost) throw new Error('Post not found.');
                setPostData(fetchedPost);

                const [bannerRes, relatedRes] = await Promise.all([
                    fetch(`${backend_uri}/api/active-banner?name=article_banner_portrait`, options), // Changed banner name
                    fetch(`${backend_uri}/api/posts/category-summary/${fetchedPost.category}`, options)
                ]);

                if (bannerRes.ok) {
                    const bannerData = await bannerRes.json();
                    setSponsorBanner(bannerData?.url || null);
                }

                if (relatedRes.ok) {
                    const relatedData = await relatedRes.json();
                    setRelatedPosts(relatedData.filter((p: IPost) => p._id !== id).slice(0, 4));
                }

            } catch (error: any) {
                console.error('Fetch error:', error);
                setErrorMessage(error.message || 'An unexpected error occurred.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [category, id]);

    // --- Render Logic ---
    if (isLoading) return <Loader />;

    if (errorMessage) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-red-600 mb-4">एउटा त्रुटि भयो</h2>
                <p className="text-gray-600 mb-6">{errorMessage}</p>
                <Button onClick={() => router.push('/')}>गृहपृष्ठमा फर्कनुहोस्</Button>
            </div>
        </div>
    );

    if (!postData) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">पोस्ट फेला परेन</h2>
                <p className="text-gray-600 mb-6">तपाईंले खोज्नुभएको सामग्री उपलब्ध छैन।</p>
                <Button onClick={() => router.push('/')}>गृहपृष्ठमा फर्कनुहोस्</Button>
            </div>
        </div>
    );

    return (
        <div className="bg-background min-h-screen flex flex-col">
            <Header />
            <PostHero post={postData} />
            <main className="flex-1 w-full py-8 md:py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <article className="bg-white rounded-xl shadow-lg p-6 md:p-10">
                        {postData.blocks && <ArticleBody blocks={postData.blocks} sponsorBanner={sponsorBanner} />}
                        <SocialShare />
                    </article>
                </div>
                {relatedPosts.length > 0 && (
                    <section className="bg-gray-50 mt-12 py-12">
                        <div className="max-w-5xl mx-auto px-4 sm:px-6">
                            <h4 className="text-3xl font-bold mb-8 text-center text-text-color">सम्बन्धित खबरहरू</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedPosts.map((post) => (<RelatedPostCard key={post._id} post={post} />))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default PostPage;