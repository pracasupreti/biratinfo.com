'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Author, IPost } from '@/types/Post'
import { getNepaliCategory } from './Hero'
import NepaliDateTime from './NepaliDate'
import Link from 'next/link'

interface SummaryProps {
    posts: IPost[]
}
function Economy({ posts }: SummaryProps) {
    const [showAll, setShowAll] = useState(false)

    if (!posts || posts.length === 0) {
        return (
            <div className="w-full px-4 lg:px-16 md:px-5 py-10">
                <p className="text-center text-text-color">No Economy posts available</p>
            </div>
        )
    }

    const getAuthorName = (authors: Author[] | undefined): string => {
        if (!authors || authors.length === 0) return 'अज्ञात'
        const firstAuthor = authors[0]
        return `${firstAuthor.firstName} ${firstAuthor.lastName}`.trim()
    }

    // Determine which posts to display
    const displayedPosts = showAll ? posts : posts.slice(0, 4)

    return (
        <section className="w-full px-4 lg:px-16 md:px-5 py-10">
            <div className="max-w-8xl mx-auto md:mx-12 lg:mx-20 flex flex-col gap-10">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <Link href={'/economy'} className="text-text-color font-orienta text-[18px] font-[700] hover:underline">{getNepaliCategory('economy')}</Link>
                    <div className="w-full h-[2px] bg-[#ebebeb]" />
                </div>

                {/* Articles */}
                <div className="flex flex-col gap-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                        {displayedPosts.map((post, index) => (
                            <div key={index} className="flex flex-col lg:flex-row gap-5 group">
                                <div className="w-full lg:w-[40%] aspect-[3/2] relative md:group-hover:translate-y-[-8px] md:transition md:duration-400 rounded-xl overflow-hidden">
                                    <Image
                                        src={post.heroBanner || '/images/placeholder.jpg'}
                                        alt={post.nepaliTitle}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex flex-col gap-2 lg:w-[60%]">
                                    <Link href={`/${post.category}/${post.categoryId}`} className="text-text-color font-ibm_plex_serif font-bold text-[16px] md:text-[18px] leading-snug cursor-pointer line-clamp-2 hover:underline">
                                        {post.nepaliTitle}
                                    </Link>
                                    <p className="text-[#808080] font-ibm_plex_serif font-medium text-base line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="text-[#808080] font-roboto text-md flex items-center gap-2 mt-1.5">
                                        <span className='font-bold'>{getAuthorName(post.authors)}</span>
                                        <span>·</span>
                                        {post.updatedAt && (
                                            <span><NepaliDateTime updatedAt={post.updatedAt} /></span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {posts.length > 4 && (
                        <Button
                            onClick={() => setShowAll(!showAll)}
                            className="w-full max-w-[320px] h-[38px] bg-white border border-[#c9c9c9] text-[#939393] font-roboto font-semibold text-[18px] text-center mx-auto hover:bg-gray-50 transition-colors"
                        >
                            {showAll ? 'कम पढ्नुहोस्' : 'थप पढ्नुहोस्'}
                        </Button>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Economy