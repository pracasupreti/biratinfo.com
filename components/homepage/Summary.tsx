import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IPost } from '@/types/Post'
import { getNepaliCategory } from './Hero'


interface SummaryProps {
    posts: IPost[]
}

function Summary({ posts }: SummaryProps) {
    if (!posts || posts.length === 0) {
        return (
            <div className="w-full px-4 lg:px-16 md:px-5 py-10">
                <p className="text-center text-text-color">No Summary posts available</p>
            </div>
        )
    }

    const currentPost = posts.slice(0, 5)
    // First post will be featured, rest will be in grid
    const [featuredPost, ...gridPosts] = currentPost

    return (
        <div className="w-full px-4 lg:px-16 md:px-5 py-10">
            <div className="max-w-8xl mx-auto md:mx-12 lg:mx-20 flex flex-col lg:flex-row gap-10">
                {/* Left Column - Featured Story */}
                {featuredPost && (
                    <div className="flex-1 flex flex-col gap-4 md:min-h-[400px] md:justify-between">
                        <div className="w-full aspect-[3/2] relative rounded-xl overflow-hidden">
                            <Image
                                src={featuredPost.heroBanner || '/images/placeholder.jpg'}
                                alt={featuredPost.nepaliTitle}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Link href={`/category/${featuredPost.category}`} className="text-text-color font-orienta text-sm sm:text-base font-[700] hover:underline">
                                {getNepaliCategory(featuredPost.category)}
                            </Link>
                            <Link
                                href={`/category/${featuredPost.category}/${featuredPost.categoryId}`}
                                className="text-text-color font-ibm_plex_serif font-bold text-xl lg:text-2xl hover:underline"
                            >
                                {featuredPost.nepaliTitle}
                            </Link>
                            <p className="text-[#808080] font-ibm_plex_serif font-medium text-sm lg:text-base line-clamp-4">
                                {featuredPost.excerpt}
                            </p>
                        </div>
                    </div>
                )}

                {/* Right Column - Grid Items */}
                <div className="flex-1 grid sm:grid-cols-2 gap-6 h-full">
                    {gridPosts.map((post) => (
                        <div key={post._id} className="flex flex-col gap-3 group h-full">
                            <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden md:group-hover:translate-y-[-8px] md:transition md:duration-300">
                                <Image
                                    src={post.heroBanner || '/images/placeholder.jpg'}
                                    alt={post.nepaliTitle}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Link href={`/category/${post.category}`} className="text-text-color font-orienta text-sm sm:text-base font-[700] hover:underline">
                                    {getNepaliCategory(post.category)}
                                </Link>
                                <Link
                                    href={`/category/${post.category}/${post.categoryId}`}
                                    className="text-text-color font-ibm_plex_serif font-semibold text-md hover:underline line-clamp-2"
                                >
                                    {post.nepaliTitle}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Summary