import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Summary() {
    const summary = [
        {
            minititle: 'अर्थ /कारोवार',
            title: 'घट्यो नेप्से : रू १० अर्ब २० करोड २७ लाख १ हजार ३ सय ४४ बराबरको कारोबार',
            imageUrl: '/images/kasinHomepage/SummaryImage2.png',
            description: 'काठमाडौँ, २८ वैशाख। यो साता कारोबारको पहिलो दिन नेपाल स्टक एक्सचेञ्ज (नेप्से) परिसूचक दोहोरो अङ्कले घटेको ...'
        },
        {
            minititle: 'विज्ञान र प्रविधि',
            title: 'रोक लगाएको सामाजिक सञ्जाल प्लाटफर्म सञ्चालन गर्ने व्यक्तिलाई २५ लाख सम्म जरिवाना',
            imageUrl: '/images/kasinHomepage/SummaryImage3.jpg',
            description: 'सामाजिक सञ्जाललाई नियमन गर्ने नाममा यसको प्रयोगकर्तालाई सरकारले आर्थिक जरिवाना र कैदसम्मको व्यवस्था गर्न लागेको ...'
        },
        {
            minititle: 'खेलकुद',
            title: 'बार्सिलोनालाई ७–६को अन्तरले हराउँदै इन्टर मिलान फाइनलमा',
            imageUrl: '/images/kasinHomepage/SummaryImage4.png',

            description: 'इटालियन क्लब इन्टर मिलान युरोपेली च्याम्पियन्स लिगको फाइनलमा स्थान बनाउन सफल भएको छ च्याटलान क्लब एसी मिलानलाई ...'
        },
        {
            minititle: 'सुरक्षा',
            title: '५ सय दरका १ सय ८६ थान नक्कली नोट सहित अधिकारी पक्राउ',
            imageUrl: '/images/kasinHomepage/SummaryImage5.png',
            description: 'हेटौँडा उपमहानगरपालिका-१९, रातमाटेबाट नेपाली ५ सय दरका १ सय ८६ थान नक्कली नोट सहित सोही उपमहानगरपालिका वडा नम्बर ...'
        },
    ]

    return (
        <section className="w-full px-4 sm:px-6 lg:px-20 py-10 flex flex-col lg:flex-row gap-16">
            <div className="flex flex-col text-center items-center lg:items-start lg:text-left lg:w-1/2 gap-4">
                <div className="w-full aspect-[3/2] bg-cover bg-center bg-no-repeat rounded-2xl bg-[url('/images/kasinHomepage/SummaryImage1.png')]" />
                <p className="text-[#939393] font-orienta text-base sm:text-lg font-[700]">राजनीति</p>
                <Link href={'/kasin/singlepage'} className="text-text-color font-ibm_plex_serif font-bold text-xl sm:text-2xl lg:text-3xl cursor-pointer">
                    प्रधानमन्त्री ओलीको राजनीतिक चर्तुयाँईको घेरोमा सभापति देउवा : गर्भनरका कारण भित्रि मनमुटाव
                </Link>
                <p className="text-[#808080] font-ibm_plex_serif font-medium text-sm sm:text-base lg:text-lg cursor-pointer">
                    नेपालको राजनीति अहिले तरंगित अवस्थामा छ । नेपाली कांग्रेस र नेकपा एमालेको गठबन्धन सरकारको अहिले चौतर्फी आलोचना भैरहेको छ । देशले अहिले सम्म नयाँ गतिभिर पाउन सकेको छैन् । जसका कारण आर्थिक चलखेलका कुराहरु राम्ररी चलायमान हुन सकेको छैन् ।
                </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-14 lg:w-1/2 items-end h-full">
                {summary.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2 group md:items-center lg:items-end">
                        <div className="relative w-full aspect-[3/2] sm:max-h-[200px]  sm:max-w-[350px] overflow-hidden md:group-hover:translate-y-[-10px] md:transition md:duration-400 rounded-xl">
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className='flex flex-col gap-1 h-full'>
                            <div className="text-[#939393] font-orienta text-sm font-[700]">{item.minititle}</div>
                            <h3 className="text-text-color font-ibm_plex_serif font-semibold text-base sm:text-lg md:max-w-[350px] max-w-full cursor-pointer text-wrap">
                                {item.title}
                            </h3>
                            <p className="text-[#808080] font-ibm_plex_serif font-medium text-sm md:max-w-[350px] max-w-full">
                                {item.description}
                            </p>
                        </div>
                    </div>

                ))}
            </div>
        </section>
    )
}

export default Summary
