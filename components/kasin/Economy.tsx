import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

function Economy() {
    const economy = [
        {
            description: '१ तोला सुनको मूल्य रु १ लाख ९० हजार ५ सय रुपैंया कायम',
            imageUrl: '/images/kasinHomepage/EconomyImage1.png',
            author: 'प्रकाश थापा',
            publishedDate: 'बैशाख २८, २०८२'
        },
        {
            description: 'एक तोला सुनको मूल्य रु १ लाख ९० हजार ८ सय कायम',
            imageUrl: '/images/kasinHomepage/EconomyImage2.png',
            author: 'प्रकाश थापा',
            publishedDate: 'बैशाख २६, २०८२'
        },
        {
            description: 'अंक घट्यो / कारोबार बढ्यो : रू ११ अर्ब ६५ करोड १७ हजार ८ सय ५१ बराबरको कारोबार',
            imageUrl: '/images/kasinHomepage/EconomyImage3.jpg',
            author: 'प्रकाश थापा',
            publishedDate: 'बैशाख २५, २०८२'
        },
        {
            description: 'राष्ट्र बैंकद्वारा पूर्व बजेटकालीन समीक्षा प्रतिवेदन अर्थ मन्त्रालयमा पेस',
            imageUrl: '/images/kasinHomepage/EconomyImage4.png',
            author: 'प्रकाश थापा',
            publishedDate: 'बैशाख २४, २०८२'
        },
    ]

    return (
        <section className="flex flex-col gap-12 pb-10 px-4 sm:px-8 md:px-20">
            <div className="flex flex-col gap-2 max-w-screen-4xl w-full mx-auto">
                <p className="text-[#939393] font-orienta text-[20px]">अर्थ /कारोवार</p>
                <div className="w-full h-[3px] bg-[#ebebeb]" />
            </div>

            <div className="flex flex-col gap-20 max-w-screen-2xl w-full mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
                    {economy.map((item, index) => (
                        <div key={index} className="flex flex-col lg:flex-row gap-6">
                            <div className="w-full aspect-[3/2] relative md:hover:translate-y-[-10px] md:transition md:duration-400">
                                <Image
                                    src={item.imageUrl}
                                    alt=""
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex flex-col gap-4 w-full" >
                                <p className="text-black font-ibm_plex_serif font-bold text-[18px] md:text-[20px] leading-snug md:mt-1">
                                    {item.description}
                                </p>
                                <p className="text-[#808080] font-roboto font-medium text-[13px] flex items-center gap-x-2">
                                    <span>{item.author}</span>
                                    <span>.</span>
                                    <span>{item.publishedDate}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <Button className="w-full max-w-[344px] h-[42px] bg-white border border-[#c9c9c9] text-[#939393] font-roboto font-semibold text-[20px] text-center mx-auto">
                    Browse More
                </Button>
            </div>
        </section>
    )
}

export default Economy
