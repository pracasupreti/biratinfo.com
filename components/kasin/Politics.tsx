import React from 'react'
import Image from 'next/image'

function Politics() {
    const Politics = [
        {
            description: 'सरकार कुकर्मको बोझले ढल्ने : अब यी बुर्जुवाहरूको वैशाखी टेकेर चुनावमा गइदैंन – अध्यक्ष दाहाल',
            imageUrl: '/images/kasinHomepage/PoliticsImage2.png',
            author: 'प्रकाश थापा',
            publishedDate: 'बैशाख २७, २०८२'
        },
        {
            description: 'विचार / सम्भव खड्का सरकारप्रति जनताको विश्वास घट्दै : संवैधानिक मूल्य र मार्गचित्रको अवज्ञा',
            imageUrl: '/images/kasinHomepage/PoliticsImage3.jpg',
            author: 'प्रकाश थापा',
            publishedDate: 'बैशाख २७, २०८२'
        },
        {
            description: 'एनआरएनएको दोहोरो नागरिकता,सम्पति राख्नेलगायत विषयमा सरकारले छुट्टै नीति ल्याउनुपर्ने : सांसद साउद',
            imageUrl: '/images/kasinHomepage/PoliticsImage4.jpg',
            author: 'प्रकाश थापा',
            publishedDate: 'बैशाख २४, २०८२'
        },
    ]

    return (
        <div className="flex flex-col gap-12 px-4 sm:px-6 lg:px-20 pb-10">
            <div className="flex flex-col gap-2">
                <p className="text-[#939393] font-orienta text-xl">राजनीति</p>
                <div className="w-full h-[3px] bg-[#ebebeb]" />
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1 flex flex-col gap-5">
                    <div className="w-full aspect-[3/2] bg-cover bg-center bg-no-repeat bg-[url(/images/kasinHomepage/PoliticsImage1.png)]"
                    />
                    <p className="text-black font-ibm_plex_serif font-bold text-2xl lg:text-3xl cursor-pointer">
                        प्राप्त उपलब्धिको रक्षा एवं प्रवद्र्धन गर्न प्रस्तुत नीतिमा सदन एक हुने : प्रधानमन्त्री ओली (पूर्ण पाठ सहित)
                    </p>
                    <p className="text-[#808080] font-roboto text-sm flex items-center gap-2">
                        <span>प्रकाश थापा</span>
                        <span>·</span>
                        <span>बैशाख २८, २०८२</span>
                    </p>
                </div>

                <div className="flex-1 flex flex-col gap-2">
                    {Politics.map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-4">
                            {/* Image */}
                            <div className="relative w-full sm:w-[40%] aspect-[3/2] overflow-hidden md:hover:translate-y-[-10px] md:transition md:duration-400">
                                <Image
                                    src={item.imageUrl}
                                    alt=""
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col gap-1 sm:w-[60%]">
                                <p className="text-black font-ibm_plex_serif font-semibold text-lg cursor-pointer">{item.description}</p>
                                <p className="text-[#808080] font-roboto text-sm mt-2 flex items-center gap-2">
                                    <span>{item.author}</span>
                                    <span>·</span>
                                    <span>{item.publishedDate}</span>
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
