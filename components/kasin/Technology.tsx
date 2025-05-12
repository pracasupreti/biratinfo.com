import React from 'react'
import Image from 'next/image'

function Technology() {
    const Society1 = [
        {
            title: 'विश्व मौसम विज्ञान दिवस पूर्वसूचना प्रणालीलाई सुदृढ बनाउने र जोखिम घटाउन सूचना प्रवाहमा जोड ',
            description: 'जलवायुसम्बन्धी समस्याबाट समाजलाई सुरक्षित राख्न चेतना मूलक गतिविधिको साथ विश्व मौसम विज्ञान दिवस विश्व भर मनाइदै छ । सन् १९५० मा विश्व मौसम विज्ञान संगठन स्थापना गर्न महासन्धि लागु भएको सम्झनामा यो दिवस मनाउन थालिएको हो ।',
            imageUrl: '/images/kasinHomepage/TechnologyImage.png',
            author: 'प्रकाश थापा',
        },
        {
            title: 'डिजिटल अपराध नियन्त्रणसम्बन्धी दुई दिने अन्तर्राष्ट्रिय सम्मेलन काठमाडौंमा सुरु भयो',
            description: 'महान्यायाधिवक्ता कार्यालयको आयोजनामा डिजिटल अपराध नियन्त्रणसम्बन्धी दुई दिने अन्तर्राष्ट्रिय सम्मेलन बिहीबारदेखि सुरु भएको छ । सम्मेलनमा २३ देशका प्रतिनिधिहरुको सहभागिता रहेको छ । सम्मेलनको बिहीबार बिहान प्रधानमन्त्री केपी शर्मा ओलीले उद्घाटन गरेका हुन् ।',
            imageUrl: '/images/kasinHomepage/TechnologyImage1.png',
            author: 'प्रकाश थापा',

        },
        {
            title: 'अभिव्यक्ति स्वतन्त्रतालाई कुण्ठित गर्ने खालको विधेयक कांग्रेसलाई मान्य छैन : महामन्त्री शर्मा',
            description: 'नेपाली कांग्रेसका महामन्त्री विश्वप्रकाश शर्माले अभिव्यक्ति स्वतन्त्रतालाई कुण्ठित गर्ने खालका विधेयकलाई कांग्रेसले स्वीकार नगर्ने बताएका छन् । महामन्त्री शर्माले सामाजिक सञ्जाल विधेयक ल्याउँदा दुई दलीय गहन छलफल नभएको पनि बताएका छन् ।',
            imageUrl: '/images/kasinHomepage/TechnologyImage3.png',
            author: 'प्रकाश थापा',
        }
    ]

    // const Society2 = [
    //     {
    //         description: 'A very basic error caused the Crowd Strike outage. Windows security may never be the same',
    //         imageUrl: '/images/homepage/SocietyImage7.png'
    //     },
    //     {
    //         description: 'A very basic error caused the Crowd Strike outage. Windows security may never be the same',
    //         imageUrl: '/images/homepage/SocietyImage6.png'
    //     },
    //     {
    //         description: 'A very basic error caused the Crowd Strike outage. Windows security may never be the same ',
    //         imageUrl: '/images/homepage/SocietyImage4.png'
    //     },
    //     {
    //         description: 'The Snowflake breaches are exposing the limits of cloud security’s shared-responsibility model',
    //         imageUrl: '/images/homepage/SocietyImage5.png'
    //     },
    // ]

    return (
        <div className='flex flex-col gap-12 pb-10'>
            <div className='flex flex-col gap-2 px-4 sm:px-10 lg:px-20'>
                <p className='text-[#939393] font-orienta text-[20px]'>विज्ञान र प्रविधि</p>
                <div className='w-full h-[3px] bg-[#ebebeb]' />
            </div>

            <div className='grid gap-10 px-4 sm:px-10 lg:px-20 md:grid-cols-2 lg:grid-cols-3'>
                {Society1.map((item, index) => (
                    <div className='flex flex-col gap-6' key={index}>
                        <div className='w-full aspect-[16/9] relative md:hover:translate-y-[-10px] md:transition md:duration-400'>
                            <Image
                                src={item.imageUrl}
                                alt=''
                                fill
                                className='object-cover'
                            />
                        </div>
                        <p className='font-roboto font-[400] text-[20px] text-black'>{item.title}</p>
                        <p className='font-inter font-[500] text-[14px] text-[#808080]'>{item.description}</p>
                        <div className='flex items-center gap-4'>
                            <div className='h-[27px] w-[27px] rounded-full bg-[#808080]' />
                            <span className='font-inter font-[500] text-[16px] text-[#808080]'>{item.author}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 
            <div className='flex flex-col gap-20 px-4 sm:px-10 lg:px-20'>
                <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-4'>
                    {Society2.map((item, index) => (
                        <div key={index} className='flex flex-col gap-4'>
                            <div className='w-full aspect-[3/2] relative'>
                                <Image
                                    src={item.imageUrl}
                                    alt=''
                                    fill
                                    className='object-cover rounded-md'
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-black font-ibm_plex_serif font-[700] text-[18px]'>{item.description}</p>
                                <p className='text-[#808080] font-roboto font-[500] text-[13px] flex items-center gap-x-2'>
                                    <span>TOM KRAZIT</span>
                                    <span>.</span>
                                    <span>FEB 18, 2025</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <Button className='w-[80%] sm:w-[344px] h-[42px] bg-white border border-[#c9c9c9] text-[#939393] font-roboto font-[600] text-[18px] mx-auto'>
                    Browse More
                </Button>
            </div> */}
        </div>
    )
}

export default Technology
