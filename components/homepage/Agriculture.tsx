import React from 'react'
import Image from 'next/image'
import { Author, IPost } from '@/types/Post'
import { getNepaliCategory } from './Hero'
import NepaliDateTime from './NepaliDate'
import Link from 'next/link'

interface SummaryProps {
    posts: IPost[]
}

function Agriculture({ posts }: SummaryProps) {

    if (!posts || posts.length === 0) {
        return (
            <div className="w-full px-4 lg:px-16 md:px-5 py-10">
                <p className="text-center text-text-color">No Agriculture posts available</p>
            </div>
        )
    }

    const [featuredPost, ...gridPosts] = posts

    const getAuthorName = (authors: Author[] | undefined): string => {
        if (!authors || authors.length === 0) return 'अज्ञात'
        const firstAuthor = authors[0]
        return `${firstAuthor.firstName} ${firstAuthor.lastName}`.trim()
    }

    return (
        <div className="w-full px-4 lg:px-16 md:px-5 py-10">
            <div className="max-w-8xl mx-auto md:mx-12 lg:mx-20 flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                    <Link href={'/agriculture'} className="text-text-color font-orienta text-[18px] font-[700] hover:underline">{getNepaliCategory('agriculture')}</Link>
                    <div className="w-full h-[2px] bg-[#ebebeb]" />
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-stretch">
                    {/* Left Column - Featured Story */}
                    {featuredPost && (
                        <div className="flex-1 flex flex-col gap-5 h-full justify-between">
                            <div>
                                <div className={`w-full aspect-[3/2] bg-cover bg-center bg-no-repeat rounded-xl`} style={{ backgroundImage: `url(${featuredPost.heroBanner?.url})` }} />
                                <Link href={`/${featuredPost.category}/${featuredPost.categoryId}`} className="font-ibm_plex_serif font-bold text-[16px] md:text-[18px] lg:text-[20px] cursor-pointer text-text-color mt-4 hover:underline line-clamp-1">
                                    {featuredPost.title}
                                </Link>
                                <p className="text-[#808080] font-ibm_plex_serif font-medium text-sm sm:text-base lg:text-[16px] mt-2 line-clamp-3">
                                    {featuredPost.excerpt}
                                </p>
                            </div>
                            <div className="text-[#808080] font-roboto text-md flex items-center gap-2">
                                <Link href={`/author/${featuredPost.authors[0]?.clerkId}`} className='font-bold'>{getAuthorName(featuredPost.authors)}</Link>
                                <span>·</span>
                                {featuredPost.updatedAt && (
                                    <span><NepaliDateTime updatedAt={featuredPost.updatedAt!} /></span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Right Column - Grid Items */}
                    <div className="flex-1 flex flex-col gap-6 justify-between">
                        {gridPosts.map((post, index) => (
                            <div key={index} className="flex flex-col sm:flex-row gap-4 group items-start">
                                <div className="relative w-full sm:w-[40%] aspect-[4/3] overflow-hidden md:group-hover:translate-y-[-8px] md:transition md:duration-400 rounded-xl">
                                    <Image
                                        src={post.heroBanner?.url || '/images/placeholder.jpg'}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 sm:w-[60%]">
                                    <Link href={`/${post.category}/${post.categoryId}`} className="font-ibm_plex_serif font-semibold text-[16px] md:text-[18px] cursor-pointer text-text-color hover:underline line-clamp-1">
                                        {post.title}
                                    </Link>
                                    <p className="text-[#808080] font-ibm_plex_serif font-medium text-[16px] line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="text-[#808080] font-roboto text-md flex items-center gap-2">
                                        <Link href={`/author/${featuredPost.authors[0]?.clerkId}`} className='font-bold'>{getAuthorName(featuredPost.authors)}</Link>
                                        <span>·</span>
                                        {featuredPost.updatedAt && (
                                            <span><NepaliDateTime updatedAt={featuredPost.updatedAt!} /></span>
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

export default Agriculture