import React from 'react'
import Image from 'next/image'

function Sports() {
    const Politics = [
        {
            description: 'जुम्ला–रारा म्याराथन , ५ सय ९१ धावक सहभागी हुँदै',
            imageUrl: '/images/kasinHomepage/SportsImage2.jpeg',
            author: 'प्रकाश थापा',
            publishedDate: 'बैशाख २७, २०८२'
        },
        {
            description: 'खेल रद्द भएर नेपाल विश्वकपबाट वञ्चित भएपछि समर्थकहरू आक्रोशित',
            imageUrl: '/images/kasinHomepage/SportsImage3.png',
            author: 'प्रकाश थापा',
            publishedDate: 'बैशाख २७, २०८२'
        },
        {
            description: 'इंग्लिस प्रिमियर लिग आर्सनलको कमजोर प्रदर्शन बन्यो लिभरपुललाई उपाधि चुम्ने अवसर',
            imageUrl: '/images/kasinHomepage/SportsImage4.png',
            author: 'प्रकाश थापा',
            publishedDate: 'बैशाख २४, २०८२'
        },
    ]

    return (
        <div className="flex flex-col gap-12 px-4 sm:px-6 lg:px-20 pb-10">
            <div className="flex flex-col gap-2">
                <p className="text-[#939393] font-orienta text-xl">खेलकुद</p>
                <div className="w-full h-[3px] bg-[#ebebeb]" />
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1 flex flex-col gap-5">
                    <div className="w-full aspect-[3/2] bg-cover bg-center bg-no-repeat bg-[url(/images/kasinHomepage/SportsImage1.png)]"
                    />
                    <p className="text-black font-ibm_plex_serif font-bold text-2xl lg:text-3xl cursor-pointer">
                        आइसीसी यू-१९ विश्वकप एसिया छनोट अन्तर्गत नेपाल र अफगानिस्तानबीचको खेल रद्द भए नेपाल विश्वकपबाट बञ्चित भएपछि समर्थकहरु आक्रोशित बनेका छन् ।
                    </p>
                    <p className="text-[#808080] font-roboto text-sm flex items-center gap-2">
                        <span>प्रकाश थापा</span>
                        <span>·</span>
                        <span>बैशाख २५, २०८२</span>
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

export default Sports
