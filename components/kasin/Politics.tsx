import React from 'react'
import Image from 'next/image'

function Politics() {
    const Politics = [
        {
            title: 'सरकार कुकर्मको बोझले ढल्ने : अब यी बुर्जुवाहरूको वैशाखी टेकेर चुनावमा गइदैंन – अध्यक्ष दाहाल',
            description: 'नेपाल कम्युनिष्ट पार्टी (माओवादी केन्द्र) का अध्यक्ष पुष्पकमल दाहाल प्रचण्डले वर्तमान सरकार आफ्नै कुकर्मको बोझले ढल्ने दाबी गरेका छन् । तर, आफूहरू अहिले सरकार ढाल्ने हतारोमा नरहेको उनको भनाइ ...',
            imageUrl: '/images/kasinHomepage/PoliticsImage2.png',
            author: 'प्रकाश थापा',
            publishedDate: 'बैशाख २७, २०८२'
        },
        {
            title: 'विचार / सम्भव खड्का सरकारप्रति जनताको विश्वास घट्दै : संवैधानिक मूल्य र मार्गचित्रको अवज्ञा',
            description: 'नेपालको राजनीतिक इतिहासमा संविधानले सधैँ महत्त्वपूर्ण भूमिका खेलेको छ। नेपालको संविधान, २०७२ राष्ट्रको सर्वोच्च कानूनी दस्तावेज हो। यसले मुलुकको शासन प्रणाली, नागरिकका अधिकार, सरकारको ...',
            imageUrl: '/images/kasinHomepage/PoliticsImage3.jpg',
            author: 'प्रकाश थापा',
            publishedDate: 'बैशाख २७, २०८२'
        },
        {
            title: 'एनआरएनएको दोहोरो नागरिकता,सम्पति राख्नेलगायत विषयमा सरकारले छुट्टै नीति ल्याउनुपर्ने : सांसद साउद',
            description: 'सङ्घीय संसद्को प्रतिनिधि सभामा सरकारको वार्षिक नीति तथा कार्यक्रममाथि छलफल जारी रहेको छ । राष्ट्रपति रामचन्द्र पौडेलले यही वैशाख २९ गते सङ्घीय संसद्को दुवै सदनको संयुक्त बैठकमा प्रस्तुत गरेको ...',
            imageUrl: '/images/kasinHomepage/PoliticsImage4.jpg',
            author: 'प्रकाश थापा',
            publishedDate: 'बैशाख २४, २०८२'
        },
    ]

    return (
        <div className="flex flex-col gap-12 px-4 sm:px-6 lg:px-20 pb-10">
            <div className="flex flex-col gap-2">
                <p className="text-[#939393] font-orienta text-xl font-[700]">राजनीति</p>
                <div className="w-full h-[3px] bg-[#ebebeb]" />
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1 flex flex-col gap-5">
                    <div className="w-full aspect-[3/2] bg-cover bg-center bg-no-repeat bg-[url(/images/kasinHomepage/PoliticsImage1.png)] rounded-xl"
                    />
                    <p className="font-ibm_plex_serif font-bold text-2xl lg:text-3xl cursor-pointer text-text-color">
                        प्राप्त उपलब्धिको रक्षा एवं प्रवद्र्धन गर्न प्रस्तुत नीतिमा सदन एक हुने : प्रधानमन्त्री ओली (पूर्ण पाठ सहित)
                    </p>
                    <p className="text-[#808080] font-ibm_plex_serif font-medium text-sm sm:text-base lg:text-lg">
                        प्रतिनिधिसभाको आइतबारको बैठकमा सरकार गठनका बेला संविधानको समीक्षा गर्ने प्रतिबद्धता, त्यसका सबल पक्षलाई सुदृढ गर्दै कार्यान्वयनमा देखिएका कमीकमजोरी सच्याउने प्राथमिकताको स्मरण गर्दै उनले संविधान संशोधनको प्रतिबद्धता व्यक्त गरेका हुन् ।
                    </p>
                    <p className="text-[#808080] font-roboto text-sm flex items-center gap-2">
                        <span>प्रकाश थापा</span>
                        <span>·</span>
                        <span>बैशाख २८, २०८२</span>
                    </p>
                </div>

                <div className="flex-1 flex flex-col gap-10 md:gap-6 lg:gap-4">
                    {Politics.map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-4 group">
                            {/* Image */}
                            <div className="relative w-full sm:w-[40%] aspect-[3/2] overflow-hidden md:group-hover:translate-y-[-10px] md:transition md:duration-400 rounded-xl">
                                <Image
                                    src={item.imageUrl}
                                    alt=""
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col gap-1 sm:w-[60%]">
                                <p className="font-ibm_plex_serif font-semibold text-lg cursor-pointer text-text-color">{item.title}</p>
                                <p className="text-[#808080] font-ibm_plex_serif font-medium text-sm ">
                                    {item.description}
                                </p>
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
