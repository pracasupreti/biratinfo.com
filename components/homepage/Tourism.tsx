import React from 'react'
import Image from 'next/image'
import { getNepaliCategory } from './Hero'
import NepaliDateTime from './NepaliDate'
import { IPost, Author } from '@/types/Post'
import Link from 'next/link'

interface SummaryProps {
    posts: IPost[]
}

function Tourism({ posts }: SummaryProps) {
    if (!posts || posts.length === 0) {
        return (
            <div className="w-full px-4 lg:px-16 md:px-5 py-10">
                <p className="text-center text-text-color">No tourism posts available</p>
            </div>
        )
    }

    const [featuredPost, ...gridPosts] = posts

    const getAuthorName = (authors: Author[] | undefined): string => {
        if (!authors || authors.length === 0) return 'अज्ञात'
        const firstAuthor = authors[0]
        return `${firstAuthor.firstName} ${firstAuthor.lastName}`.trim()
    }

    const getAuthorUsername = (authors?: Author[] | string[]): string | undefined => {
        if (!authors || authors.length === 0 || typeof authors[0] === 'string') return undefined;
        return (authors[0] as Author).username;
    };

    return (
        <div className="w-full px-4 lg:px-16 md:px-5 py-10">
            <div className="max-w-8xl mx-auto md:mx-12 lg:mx-20 flex flex-col gap-10">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <Link href={'/tourism'} className="text-text-color font-orienta text-lg font-[700] hover:underline">
                        {getNepaliCategory('tourism')}
                    </Link>
                    <div className="w-full h-[2px] bg-[#ebebeb]" />
                </div>

                {/* Content */}
                <div className="flex flex-col lg:flex-row gap-10 items-stretch">
                    {/* Featured Post */}
                    {featuredPost && (
                        <div className="flex-1 flex flex-col gap-4 justify-between">
                            <div>
                                <div className="w-full aspect-[3/2] relative rounded-xl overflow-hidden">
                                    <Image
                                        src={featuredPost.heroBanner?.url || '/images/placeholder.jpg'}
                                        alt={featuredPost.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                                    />
                                </div>
                                <Link href={`/${featuredPost.category}/${featuredPost.categoryId}`} className="font-ibm_plex_serif font-bold text-xl lg:text-2xl cursor-pointer text-text-color mt-3 hover:underline line-clamp-1">
                                    {featuredPost.title}
                                </Link>
                                <p className="text-[#808080] font-ibm_plex_serif font-medium text-base mt-1.5 line-clamp-3">
                                    {featuredPost.excerpt}
                                </p>
                            </div>
                            <div className="text-[#808080] font-roboto text-md flex items-center gap-2">
                                <Link href={`/author/${getAuthorUsername(featuredPost.authors)}`} className='font-bold'>{getAuthorName(featuredPost.authors)}</Link>
                                <span>·</span>
                                {featuredPost.updatedAt && (
                                    <span><NepaliDateTime updatedAt={featuredPost.updatedAt!} /></span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Grid Posts */}
                    <div className="flex-1 flex flex-col justify-between gap-8 md:gap-5 lg:gap-4">
                        {gridPosts.map((post) => (
                            <div key={post._id} className="flex flex-col sm:flex-row gap-3 group">
                                <div className="relative w-full sm:w-[40%] aspect-[7/6] overflow-hidden md:group-hover:translate-y-[-8px] md:transition md:duration-400 rounded-xl">
                                    <Image
                                        src={post.heroBanner?.url || '/images/placeholder.jpg'}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                                    />
                                </div>

                                <div className="flex flex-col gap-0.5 sm:w-[60%]">
                                    <Link href={`/${gridPosts[0].category}/${gridPosts[0].categoryId}`} className="font-ibm_plex_serif font-bold text-xl lg:text-lg cursor-pointer text-text-color hover:underline line-clamp-2">
                                        {post.title}
                                    </Link>
                                    <p className="text-[#808080] font-ibm_plex_serif font-medium text-base line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="text-[#808080] font-roboto text-md flex items-center gap-2 mt-1.5">
                                        <Link href={`/author/${getAuthorUsername(featuredPost.authors)}`} className='font-bold'>{getAuthorName(post.authors)}</Link>
                                        <span>·</span>
                                        {post.updatedAt && (
                                            <span><NepaliDateTime updatedAt={post.updatedAt} /></span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tourism