import React from 'react'
import Image from 'next/image'
import { IPost } from '@/types/Post'
import { getNepaliCategory } from './Hero'
import Link from 'next/link'

interface SummaryProps {
    posts: IPost[]
}

const Lifestyle = ({ posts }: SummaryProps) => {
    if (!posts || posts.length === 0) {
        return (
            <div className="w-full px-4 lg:px-16 md:px-5 py-10">
                <p className="text-center text-text-color">No Technology posts available</p>
            </div>
        )
    }

    return (
        <section className='w-full px-4 lg:px-16 md:px-5 py-10'>
            <div className='max-w-8xl mx-auto md:mx-12 lg:mx-20 flex flex-col gap-10'>
                <div className='flex flex-col gap-2'>
                    <p className='text-text-color font-orienta text-[18px] font-[700]'>{getNepaliCategory('lifestyle')}</p>
                    <div className='w-full h-[2px] bg-[#ebebeb]' />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8'>
                    {posts.map((post, index) => (
                        <div className='flex flex-col gap-3 group' key={index}>
                            <div className='w-full aspect-[16/9] relative md:group-hover:translate-y-[-8px] md:transition md:duration-400 rounded-md overflow-hidden'>
                                <Image
                                    src={post.heroBanner || '/images/placeholder.jpg'}
                                    alt={post.nepaliTitle}
                                    fill
                                    className='object-cover'
                                />
                            </div>

                            <Link href={`/${post.category}/${post.categoryId}`} className='font-ibm_plex_serif font-bold text-[16px] md:text-[18px] leading-snug text-text-color line-clamp-2 hover:underline cursor-pointer'>
                                {post.nepaliTitle}
                            </Link>

                            <p className='text-[#808080] font-ibm_plex_serif font-medium text-[14px] line-clamp-2'>
                                {post.excerpt}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Lifestyle