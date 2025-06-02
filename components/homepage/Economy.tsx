import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

function Economy() {
    const economy = [
        {
            title: '१ तोला सुनको मूल्य रु १ लाख ९० हजार ५ सय रुपैंया कायम',
            description: 'अन्तर्राष्ट्रिय बजारमा सुनको मूल्य सामान्य गिरावट आएको छ। त्यसको प्रभाव स्थानीय बजारमा पनि परेको छ। गत शुक्रबारको तुलनामा आज तोलामा रू ३ सयले सुनको मूल्य घटेको छ। चाँदीमा भने प्रति तोला रू १० ले वृद्धि भएको छ।',
            imageUrl: '/images/kasinHomepage/EconomyImage1.png',
            author: 'सुधिर नेपाल',
            publishedDate: 'बैशाख २८, २०८२'
        },
        {
            title: 'एक तोला सुनको मूल्य रु १ लाख ९० हजार ८ सय कायम',
            description: 'अन्तर्राष्ट्रिय बजारमा सुनको मूल्य सामान्य कमी आएको छ। त्यसको प्रभाव स्थानीय बजारमा पनि परेको छ। बिहीबारको तुलनामा शुक्रबार तोलामा रू १ हजार ५ सयले घटेको छ। चाँदीमा भने प्रति तोला रू पाँचले वृद्धि भएको छ।',
            imageUrl: '/images/kasinHomepage/EconomyImage2.png',
            author: 'सुधिर नेपाल',
            publishedDate: 'बैशाख २६, २०८२'
        },
        {
            title: 'अंक घट्यो / कारोबार बढ्यो : रू ११ अर्ब ६५ करोड १७ हजार ८ सय ५१ बराबरको कारोबार',
            description: 'नेपाल स्टक एक्सचेञ्ज (नेप्से) परिसूचक दोहोरो अङ्कले गिरावट देखिएको छ। बिहीबार नेप्से परिसूचक १२ दशमलव शून्य चार अङ्कले घटेर दुई हजार ६ सय ६१ दशमलव ८६ को बिन्दुमा कायम भएको हो।',
            imageUrl: '/images/kasinHomepage/EconomyImage3.jpg',
            author: 'सुधिर नेपाल',
            publishedDate: 'बैशाख २५, २०८२'
        },
        {
            title: 'राष्ट्र बैंकद्वारा पूर्व बजेटकालीन समीक्षा प्रतिवेदन अर्थ मन्त्रालयमा पेस',
            description: 'नेपाल राष्ट्र बैंकले आगामी आर्थिक वर्ष २०८२/८३ को पूर्वबजेटकालीन समीक्षा प्रतिवेदन अर्थ मन्त्रालयलाई बुझाएको छ। नेपाल राष्ट्र बैंकका कायम मुकायम गभर्नर डा. नीलम ढुङ्गाना तिम्सिना। ',
            imageUrl: '/images/kasinHomepage/EconomyImage4.png',
            author: 'सुधिर नेपाल',
            publishedDate: 'बैशाख २४, २०८२'
        },
    ]

    return (
        <section className="w-full px-4 lg:px-20 md:px-6 py-12">
            <div className="max-w-8xl mx-auto md:mx-16 lg:mx-24 flex flex-col gap-12">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <p className="text-text-color font-orienta text-[20px] font-[700]">अर्थ / कारोबार</p>
                    <div className="w-full h-[3px] bg-[#ebebeb]" />
                </div>

                {/* Articles */}
                <div className="flex flex-col gap-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
                        {economy.map((item, index) => (
                            <div key={index} className="flex flex-col lg:flex-row gap-6 group">
                                <div className="w-full lg:w-[40%] aspect-[3/2] relative md:group-hover:translate-y-[-10px] md:transition md:duration-400 rounded-xl overflow-hidden">
                                    <Image
                                        src={item.imageUrl}
                                        alt=""
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex flex-col gap-4 lg:w-[60%]">
                                    <p className="text-text-color font-ibm_plex_serif font-bold text-[18px] md:text-[20px] leading-snug cursor-pointer line-clamp-2 hover:underline">
                                        {item.title}
                                    </p>
                                    <p className="text-[#808080] font-ibm_plex_serif font-medium text-lg line-clamp-2">
                                        {item.description}
                                    </p>
                                    <p className="text-[#808080] font-roboto font-medium text-xl flex items-center gap-x-2">
                                        <span>{item.author}</span>
                                        <span>·</span>
                                        <span>{item.publishedDate}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button className="w-full max-w-[344px] h-[42px] bg-white border border-[#c9c9c9] text-[#939393] font-roboto font-semibold text-[20px] text-center mx-auto hover:bg-gray-50 transition-colors">
                        थप पढ्नुहोस्
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Economy
