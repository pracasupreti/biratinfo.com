import { Clock2Icon, TagIcon } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'

function Hero() {
    return (
        <section className="w-full min-h-[calc(100vh-210px)] bg-[url('/images/homepage/HeroImage.webp')] bg-cover flex items-end justify-center">
            <div className="bg-white w-[95%] sm:w-[90%] lg:max-w-[1348px] xl:max-w-[1440px] mx-auto rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl px-4 sm:px-6 md:px-8 lg:px-20 xl:px-36 py-5 sm:py-6 md:py-8 xl:py-10 text-[#008000] text-center font-jost flex flex-col items-center gap-3 sm:gap-5 md:gap-6">

                <Link href={'/en/singlepage'} className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight text-text-color">
                    Trump Lands in Qatar After Meeting Militant Who Now Leads Syria
                </Link>

                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-normal lg:max-w-4xl xl:max-w-5xl text-text-color">
                    President Trump&apos;s meeting with President Ahmed al-Shara came after he said he would lift U.S. sanctions on Syria. Mr. Trump&apos;s Gulf tour has mostly sidestepped the war in Gaza.
                </p>

                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 md:gap-6 xl:gap-16 xl:text-lg text-xs sm:text-sm md:text-base font-normal text-text-color">
                    <p className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src="/images/homepage/author.webp" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        Ismaeel Naar
                    </p>
                    <p className="flex items-center gap-2">
                        <Clock2Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        6 Minutes Read
                    </p>
                    <p className="flex items-center gap-2">
                        <TagIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                        Politics
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Hero
