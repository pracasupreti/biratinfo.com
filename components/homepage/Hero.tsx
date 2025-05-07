import { CircleIcon, Clock2Icon, TagIcon } from 'lucide-react'
import React from 'react'

function Hero() {
    return (
        <div className='h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] xl:h-[828px] w-full bg-[url(/images/homepage/Hero.jpg)] bg-center bg-cover flex items-end justify-center'>
            <div className='bg-white w-[95%] sm:w-[90%] md:w-[90%] lg:w-[1348px] rounded-xl sm:rounded-2xl md:rounded-3xl text-[#008000] flex flex-col justify-center items-center text-center font-jost px-4 sm:px-6 md:px-8 lg:px-36 py-4 sm:py-6 gap-3 sm:gap-5 md:gap-6 lg:gap-8 mx-auto'>
                <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[40px] font-[600] leading-tight'>
                    10 Best Places to Visit in Koshi Province
                </h1>
                <p className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-[20px] font-[400]'>
                    Koshi Province, located in the eastern part of Nepal, is a treasure trove of natural wonders, rich culture, and historical landmarks. From majestic mountains to serene wetlands, and spiritual hubs to thrilling trekking trails...
                </p>
                <div className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-[24px] font-[400] flex flex-col sm:flex-row items-center gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-44 flex-wrap justify-center'>
                    <p className='flex items-center gap-1 sm:gap-2'>
                        <CircleIcon
                            color='#d9d9d9'
                            fill='#d9d9d9'
                            size={20}
                            className='w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10'
                        />
                        Prakash Thapa
                    </p>
                    <p className='flex items-center gap-1 sm:gap-2'>
                        <Clock2Icon
                            size={20}
                            className='w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10'
                        />
                        6 Minutes Read
                    </p>
                    <p className='flex items-center gap-1 sm:gap-2'>
                        <TagIcon
                            size={20}
                            className='w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10'
                        />
                        Tourism
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Hero