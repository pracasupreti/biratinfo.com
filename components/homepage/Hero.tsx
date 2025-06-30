import { Clock2Icon, TagIcon } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import NepaliDateTime from './NepaliDate'
import NepaliTimeDisplay from './NepaliTime'
import Link from 'next/link'
import { categoryOptions } from '@/types/Post'

interface Author {
    firstName: string
    lastName: string
    avatar?: string
    clerkId: string
}

interface HeroPost {
    nepaliTitle: string
    excerpt: string
    category: string
    categoryId: string
    authors: Author[]
    readingTime: string
    heroBanner?: string,
    createdAt?: string,
    updatedAt?: string
}

interface HeroProps {
    data: HeroPost | null
}

export const getNepaliCategory = (englishCategory: string) => {
    const foundCategory = categoryOptions.find(
        option => option.value === englishCategory.toLowerCase()
    );
    return foundCategory ? foundCategory.np : englishCategory; // Fallback to original if not found
};

function Hero({ data }: HeroProps) {
    const author = data?.authors?.[0]
    const authorId = author?.clerkId
    const authorName = author ? `${author.firstName} ${author.lastName}` : 'अज्ञात लेखक'
    const authorAvatar = author?.avatar || ''
    return (
        <section
            className="w-full min-h-[calc(100vh-128px)] bg-cover bg-no-repeat bg-center flex items-end justify-center"
            style={{
                backgroundImage: `url('${data?.heroBanner || 'placeholder-image'}')`,
            }}
        >
            <div className="bg-white w-[95%] sm:w-[90%] max-w-6xl mx-auto md:px-12 md:mx-12 lg:mx-32 rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl py-3 sm:py-3 md:py-4 xl:py-5 text-text-color text-center font-jost flex flex-col items-center gap-2 md:gap-3">

                <Link href={`/${data!.category}/${data!.categoryId}`} className="text-base sm:text-lg md:text-xl lg:text-3xl font-semibold leading-tight cursor-pointer hover:underline">
                    {data!.nepaliTitle}
                </Link>

                <p className="text-sm md:text-sm lg:text-base leading-relaxed max-w-4xl line-clamp-2">
                    {data?.excerpt}
                </p>

                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 xl:gap-8 text-xs sm:text-xs md:text-sm font-normal">
                    <Link href={`/author/${authorId}`} className="flex items-center gap-1">
                        <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                            <AvatarImage src={authorAvatar} alt={authorName} />
                            <AvatarFallback>{authorName.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {authorName}
                    </Link>

                    <p className="flex items-center gap-1">
                        <Clock2Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <NepaliTimeDisplay timeText={data!.readingTime!} />
                    </p>

                    <p className="flex items-center gap-1">
                        <TagIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        {getNepaliCategory(data!.category!)}
                    </p>
                </div>

                <div className="flex justify-center items-center gap-1 text-[#808080] font-roboto text-sm">
                    अपडेट गरिएको :
                    <NepaliDateTime updatedAt={data!.updatedAt!} />
                </div>
            </div>
        </section>
    )
}

export default Hero
