import React from 'react'

function Hero() {
    return (
        <div className='h-[500px] md:h-[828px] w-full bg-[url(/images/homepage/Hero.jpg)] bg-center bg-cover flex items-end justify-center'>
            <div className='bg-white w-[90%] md:w-[1348px] rounded-3xl text-[#008000] flex flex-col justify-center items-center text-center font-jost px-6 md:px-36 py-6 gap-6 md:gap-8'>
                <p className='text-[24px] md:text-[40px] font-[600]'>
                    10 Best Places to Visit in Koshi Province
                </p>
                <p className='text-[14px] md:text-[20px] font-[400]'>
                    Koshi Province, located in the eastern part of Nepal, is a treasure trove of natural wonders, rich culture, and historical landmarks. From majestic mountains to serene wetlands, and spiritual hubs to thrilling trekking trails...
                </p>
                <div className='text-[16px] md:text-[24px] font-[400] flex flex-col md:flex-row items-center gap-3 md:gap-44'>
                    <p>Prakash Thapa</p>
                    <p>6 Minutes Read</p>
                    <p>Tourism</p>
                </div>
            </div>
        </div>
    )
}

export default Hero
