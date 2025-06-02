'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Summary() {
    // const { articles, loading, error } = useFetchArticles();
    // const Summary = articles.map(article => ({
    //     minititle: article.fields.Categories,
    //     title: article.fields.Title!,
    //     imageUrl: '/images/kasinHomepage/SummaryImage2.png',
    //     description: article.fields.Block1
    // }))
    const summary = [
        {
            minititle: 'अर्थ /कारोवार',
            title: 'घट्यो नेप्से : रू १० अर्ब २० करोड २७ लाख १ हजार ३ सय ४४ बराबरको कारोबार',
            imageUrl: '/images/kasinHomepage/SummaryImage2.png',
        },
        {
            minititle: 'विज्ञान र प्रविधि',
            title: 'रोक लगाएको सामाजिक सञ्जाल प्लाटफर्म सञ्चालन गर्ने व्यक्तिलाई २५ लाख सम्म जरिवाना',
            imageUrl: '/images/kasinHomepage/SummaryImage3.jpg',
        },
        {
            minititle: 'खेलकुद',
            title: 'बार्सिलोनालाई ७–६को अन्तरले हराउँदै इन्टर मिलान फाइनलमा',
            imageUrl: '/images/kasinHomepage/SummaryImage4.png',
        },
        {
            minititle: 'सुरक्षा',
            title: '५ सय दरका १ सय ८६ थान नक्कली नोट सहित अधिकारी पक्राउ',
            imageUrl: '/images/kasinHomepage/SummaryImage5.png',
        },
        // ...Summary
    ]

    return (
        <section className="w-full px-4 lg:px-20 md:px-6 py-12">
            <div className="max-w-8xl mx-auto md:mx-16 lg:mx-24 flex flex-col lg:flex-row gap-12 items-stretch">
                {/* Left Column - Featured Story */}
                <div className="flex-1 flex flex-col gap-6 h-full">
                    <div className="w-full aspect-[3/2] relative rounded-2xl overflow-hidden">
                        <Image
                            src="/images/kasinHomepage/SummaryImage1.png"
                            alt="Featured politics story"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-text-color font-orienta text-base sm:text-lg font-[700]">राजनीति</p>
                        <Link
                            href={'/singlepage'}
                            className="text-text-color font-ibm_plex_serif font-bold text-2xl lg:text-4xl hover:underline"
                        >
                            गर्भनरका कारण भित्रि मनमुटाव
                        </Link>
                        <p className="text-[#808080] font-ibm_plex_serif font-medium text-base lg:text-xl line-clamp-3">
                            नेपालको राजनीति अहिले तरंगित अवस्थामा छ । नेपाली कांग्रेस र नेकपा एमालेको गठबन्धन सरकारको अहिले चौतर्फी आलोचना भैरहेको छ । देशले अहिले सम्म नयाँ गतिभिर पाउन सकेको छैन् । जसका कारण आर्थिक चलखेलका कुराहरु राम्ररी चलायमान हुन सकेको छैन् ।
                        </p>
                    </div>
                </div>

                {/* Right Column - Grid Items */}
                <div className="flex-1 grid sm:grid-cols-2 gap-8 h-full">
                    {summary.map((item, index) => (
                        <div key={index} className="flex flex-col gap-4 group h-full">
                            <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden md:group-hover:translate-y-[-10px] md:transition md:duration-300">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className="text-text-color font-orienta text-lg font-[700]">{item.minititle}</p>
                                <Link
                                    href={'/kasin/singlepage'}
                                    className="text-text-color font-ibm_plex_serif font-semibold text-xl hover:underline line-clamp-2"
                                >
                                    {item.title}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Summary
