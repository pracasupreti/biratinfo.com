import React from 'react'
import Image from 'next/image'

function Politics() {
    const Politics = [
        {
            description: 'Canva chose its generative AI tools by letting employees try them all. It’s an argument for consumption-based pricing.',
            imageUrl: '/images/homepage/PoliticsImage2.png'
        },
        {
            description: 'Should I tell the braless friend of a friend that her breasts wobble?',
            imageUrl: '/images/homepage/PoliticsImage3.png'
        },
        {
            description: 'The shoes Rebecca Harding has worn to death—and what she’ll buy next',
            imageUrl: '/images/homepage/PoliticsImage4.png'
        },
    ]

    return (
        <div className="flex flex-col gap-12 px-4 sm:px-6 lg:px-20 pb-10">
            <div className="flex flex-col gap-2">
                <p className="text-[#939393] font-orienta text-xl">Politics</p>
                <div className="w-full h-[3px] bg-[#ebebeb]" />
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1 flex flex-col gap-5">
                    <div className="w-full aspect-[3/2] bg-cover bg-center bg-no-repeat rounded bg-[url(/images/homepage/PoliticsImage1.png)]"
                    />
                    <p className="text-black font-ibm_plex_serif font-bold text-2xl lg:text-3xl">
                        How Liberty Mutual was able to jump into generative AI thanks to a clear data strategy and FinOps
                    </p>
                    <p className="text-[#808080] font-roboto text-sm flex items-center gap-2">
                        <span>TOM KRAZIT</span>
                        <span>·</span>
                        <span>FEB 18, 2025</span>
                    </p>
                </div>

                <div className="flex-1 flex flex-col gap-2">
                    {Politics.map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-4">
                            {/* Image */}
                            <div className="relative w-full sm:w-[40%] aspect-[3/2] rounded overflow-hidden">
                                <Image
                                    src={item.imageUrl}
                                    alt=""
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col gap-1 sm:w-[60%]">
                                <p className="text-black font-ibm_plex_serif font-semibold text-lg">{item.description}</p>
                                <p className="text-[#808080] font-roboto text-sm mt-2 flex items-center gap-2">
                                    <span>TOM KRAZIT</span>
                                    <span>·</span>
                                    <span>FEB 18, 2025</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Politics
