import { CircleIcon, Clock2Icon, TagIcon } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Hero() {
    return (
        <section className="w-full min-h-[calc(100vh-210px)] bg-[url('/images/homepage/Hero.jpg')] bg-cover bg-center flex items-end justify-center">
            <div className="bg-white w-[95%] sm:w-[90%] lg:max-w-[1348px] mx-auto rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl px-4 sm:px-6 md:px-8 lg:px-20 xl:px-36 py-5 sm:py-6 md:py-8 xl:py-10 text-[#008000] text-center font-jost flex flex-col items-center gap-3 sm:gap-5 md:gap-6">

                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-tight">
                    10 Best Places to Visit in Koshi Province
                </h1>

                <p className="text-xs sm:text-sm md:text-base lg:text-lg font-normal max-w-4xl">
                    Koshi Province, located in the eastern part of Nepal, is a treasure trove of natural wonders, rich culture, and historical landmarks. From majestic mountains to serene wetlands, and spiritual hubs to thrilling trekking trails...
                </p>

                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 md:gap-6 xl:gap-16 text-xs sm:text-sm md:text-base font-normal">
                    <p className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        Prakash Thapa
                    </p>
                    <p className="flex items-center gap-2">
                        <Clock2Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        6 Minutes Read
                    </p>
                    <p className="flex items-center gap-2">
                        <TagIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                        Tourism
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Hero
