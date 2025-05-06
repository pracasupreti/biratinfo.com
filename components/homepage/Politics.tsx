import React from 'react'
import Image from 'next/image'

function Politics() {
    const Politics = [
        {
            description: 'Canva choose its generative AI tools by letting its employee try the all. It’s argument for consumption-based pricing ',
            imageUrl: '/images/homepage/PoliticsImage2.png'
        },
        {
            description: 'Should I tell the braless friend of a friend that her breasts wobble?',
            imageUrl: '/images/homepage/PoliticsImage3.png'
        },
        {
            description: 'The shies Rebecca Harding  has worn to death-and what she’ll buy next',
            imageUrl: '/images/homepage/PoliticsImage4.png'
        },
    ]
    return (
        <div className='flex flex-col gap-16 pb-10'>
            <div className='flex flex-col gap-2'>
                <p className='text-[#939393] font-orienta text-[20px] pl-20'>Politics</p>
                <div className='w-full h-[3px] bg-[#ebebeb]' />
            </div>
            <div className='md:flex-row flex flex-col px-20 md:px-60 gap-20'>
                <div className='flex flex-col items-start gap-5 md:w-[673px] w-[373px]'>
                    <div className='md:w-[673px] md:h-[448px] w-[373px] h-[248px] bg-[url(/images/homepage/PoliticsImage1.png)] bg-cover bg-no-repeat bg-center' />
                    <p className='text-black font-ibm_plex_serif font-[700] text-[30px] '>How Liberty Mutual was able to jump into
                        generative AI thanks to a clear data strategy
                        and FinOps</p>
                    <p className='text-[#808080] font-roboto font-[500] text-[13px] flex items-center gap-x-2'>
                        <span>TOM KRAZIT</span>
                        <span>.</span>
                        <span>FEB 18, 2025</span>
                    </p>
                </div>
                <div>
                    <div className='flex flex-col gap-y-12'>
                        {Politics.map((items, index) =>
                            <div key={index} className='flex gap-4 '>
                                <div className='min-w-[309px] h-[174px] relative'>
                                    <Image
                                        src={items.imageUrl}
                                        alt=''
                                        fill
                                        objectFit='contain'
                                    />
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <p className='text-black font-ibm_plex_serif font-[700] text-[20px] '>{items.description}</p>
                                    <p className='text-[#808080] font-roboto font-[500] text-[13px] flex items-center gap-x-2'>
                                        <span>TOM KRAZIT</span>
                                        <span>.</span>
                                        <span>FEB 18, 2025</span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Politics