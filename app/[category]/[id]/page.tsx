/* eslint-disable @typescript-eslint/no-explicit-any */
import { Author, IPost, SinglePost } from '@/types/Post';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock2Icon, TagIcon } from 'lucide-react';
import NepaliDateTime from '@/components/homepage/NepaliDate';
import Footer from '@/components/homepage/Footer';
import Header from '@/components/homepage/Header';
import NepaliTimeDisplay from '@/components/homepage/NepaliTime';
import { getNepaliCategory } from '@/components/homepage/Hero';
import SocialShare from '@/components/SocialShare';


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

const PostHero = ({ post }: { post: SinglePost }) => (
    <div className="relative w-full h-[50vh] md:h-[83vh] overflow-hidden">
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
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-lg">
                    {post.nepaliTitle}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base text-white/90">
                    <div className="flex items-center gap-2">
                        <Avatar className="w-7 h-7 border-2">
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
            </div>
        </div>
    </div>
);

const ArticleContent = ({ post }: { post: SinglePost }) => {
    if (!post.blocks || post.blocks.length === 0) return null;

    const adInsertIndex = Math.floor(post.blocks.length / 3); //Add position

    return (
        <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6">
                {post.blocks.map((block, index) => {
                    const isAdBlock = index === adInsertIndex && post.sponsoredAds;
                    const isLastBlock = index === post.blocks.length - 1;

                    return (
                        <div key={index}>
                            {/* Content above the ad */}
                            {isAdBlock && (
                                <div className="article-content">
                                    <div dangerouslySetInnerHTML={{ __html: block.content }} />
                                </div>
                            )}

                            {/* Ad block with wrapped content */}
                            {isAdBlock && (
                                <div className="flex flex-col md:flex-row gap-6 w-full my-6">
                                    {/* Text content that wraps around the ad */}
                                    <div className="article-content md:flex-1">
                                        <div dangerouslySetInnerHTML={{ __html: block.content }} />
                                    </div>

                                    {/* Ad container - takes only needed height */}
                                    <div className="w-full md:w-[350px] flex-shrink-0">
                                        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                                            <Image
                                                src={post.sponsoredAds}
                                                alt="Sponsor Advertisement"
                                                width={400}
                                                height={600}
                                                className="w-full h-auto object-contain"
                                            />
                                        </div>
                                    </div>

                                </div>
                            )}

                            {/* Regular content block or content below ad */}
                            {(!isAdBlock || index !== adInsertIndex) && (
                                <div className="article-content">
                                    {isLastBlock && (
                                        <h2 className="text-2xl font-bold text-text-color mb-4 mt-8">निष्कर्ष</h2>
                                    )}
                                    <div dangerouslySetInnerHTML={{ __html: block.content }} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Optional mobile-only ad below content */}
            {post.sponsoredAds && (
                <div className="mt-8 lg:hidden">
                    <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200 max-w-md mx-auto">
                        <Image
                            src={post.sponsoredAds}
                            alt="Sponsor Advertisement"
                            width={300}
                            height={500}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const RelatedPostCard = ({ post }: { post: IPost }) => (
    <Link href={`/post/${post.category}/${post._id}`} className="block group">
        <article className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48">
                {post.heroBanner ? (
                    <Image
                        src={post.heroBanner}
                        alt={post.nepaliTitle}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm p-4 text-center">
                        तस्वीर उपलब्ध छैन
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h5 className="font-semibold text-base line-clamp-3 mb-2 text-text-color group-hover:text-primary transition-colors">
                    {post.nepaliTitle}
                </h5>
                <p className="text-sm text-gray-600 line-clamp-2 mt-auto">
                    {post.excerpt}
                </p>
            </div>
        </article>
    </Link>
);

export default async function PostPage({ params }: { params: Promise<{ category: string; id: string }> }) {


    const { category, id } = await params;
    const { backend_uri, apiKey } = API_CONFIG;

    if (!backend_uri || !apiKey) {
        return (
            <div className="p-4 text-center text-red-600">
                Something went wrong!!!. Please try again after certain time
            </div>
        )
    }

    const headers = { 'x-special-key': apiKey }
    const options: RequestInit = { headers, cache: 'no-store' }

    try {

        const postRes = await fetch(
            `${backend_uri}/api/posts/full/${category}/${id}`,
            options
        );
        if (!postRes.ok) throw new Error(`Failed to fetch post. Status: ${postRes.status}`);

        const postResult = await postRes.json();
        const fetchedPost: SinglePost = postResult?.post;
        if (!fetchedPost) throw new Error('Post not found.');

        const relatedRes = await fetch(
            `${backend_uri}/api/posts/category-summary/${fetchedPost.category}`,
            options
        );

        const relatedResult = await relatedRes.json();

        const relatedPosts: IPost[] = Array.isArray(relatedResult?.posts)
            ? relatedResult.posts.filter((p: IPost) => p._id !== id).slice(0, 4)
            : [];

        return (
            <div className="bg-gray-50 min-h-screen flex flex-col">
                <Header />

                <PostHero post={fetchedPost} />

                <main className="flex-1 py-8 md:py-12 bg-white">
                    <ArticleContent post={fetchedPost} />
                    <SocialShare />
                </main>

                {relatedPosts.length > 0 ? (
                    <section className="bg-gray-50 py-12 border-t">
                        <div className="max-w-4xl mx-auto px-4">
                            <h4 className="text-3xl font-bold mb-8 text-center text-text-color">
                                सम्बन्धित खबरहरू
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedPosts.map((post) => (
                                    <RelatedPostCard key={post._id} post={post} />
                                ))}
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="bg-gray-50 py-12 border-t">
                        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-lg">
                            सम्बन्धित खबरहरू उपलब्ध छैनन्।
                        </div>
                    </section>
                )}

                <Footer />
            </div>
        );

    } catch (error: any) {
        return (
            <div className="p-4 text-center text-red-600">
                {error?.message || 'Unexpected error occurred.'}
            </div>
        )
    }



};
