import React from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

function Technology() {
    const Society1 = [
        {
            title: 'विश्व मौसम विज्ञान दिवस पूर्वसूचना प्रणालीलाई सुदृढ बनाउने र जोखिम घटाउन सूचना प्रवाहमा जोड ',
            description: 'जलवायुसम्बन्धी समस्याबाट समाजलाई सुरक्षित राख्न चेतना मूलक गतिविधिको साथ विश्व मौसम विज्ञान दिवस विश्व भर मनाइदै छ । सन् १९५० मा विश्व मौसम विज्ञान संगठन स्थापना गर्न महासन्धि लागु भएको सम्झनामा यो दिवस मनाउन थालिएको हो ।',
            imageUrl: '/images/kasinHomepage/TechnologyImage.png',
            author: 'सुधिर नेपाल',
        },
        {
            title: 'डिजिटल अपराध नियन्त्रणसम्बन्धी दुई दिने अन्तर्राष्ट्रिय सम्मेलन काठमाडौंमा सुरु भयो',
            description: 'महान्यायाधिवक्ता कार्यालयको आयोजनामा डिजिटल अपराध नियन्त्रणसम्बन्धी दुई दिने अन्तर्राष्ट्रिय सम्मेलन बिहीबारदेखि सुरु भएको छ । सम्मेलनमा २३ देशका प्रतिनिधिहरुको सहभागिता रहेको छ । सम्मेलनको बिहीबार बिहान प्रधानमन्त्री केपी शर्मा ओलीले उद्घाटन गरेका हुन् ।',
            imageUrl: '/images/kasinHomepage/TechnologyImage1.png',
            author: 'सुधिर नेपाल',

        },
        {
            title: 'अभिव्यक्ति स्वतन्त्रतालाई कुण्ठित गर्ने खालको विधेयक कांग्रेसलाई मान्य छैन : महामन्त्री शर्मा',
            description: 'नेपाली कांग्रेसका महामन्त्री विश्वप्रकाश शर्माले अभिव्यक्ति स्वतन्त्रतालाई कुण्ठित गर्ने खालका विधेयकलाई कांग्रेसले स्वीकार नगर्ने बताएका छन् । महामन्त्री शर्माले सामाजिक सञ्जाल विधेयक ल्याउँदा दुई दलीय गहन छलफल नभएको पनि बताएका छन् ।',
            imageUrl: '/images/kasinHomepage/TechnologyImage3.png',
            author: 'सुधिर नेपाल',
        }
    ]

    return (
        <div className="w-full px-4 lg:px-20 md:px-6 py-12">
            <div className="max-w-8xl mx-auto md:mx-16 lg:mx-24 flex flex-col gap-12">
                <div className="flex flex-col gap-2">
                    <p className="text-text-color font-orienta text-[20px] font-[700]">विज्ञान र प्रविधि</p>
                    <div className="w-full h-[3px] bg-[#ebebeb]" />
                </div>

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {Society1.map((item, index) => (
                        <div className="flex flex-col gap-6 group" key={index}>
                            <div className="w-full aspect-[16/9] relative md:group-hover:translate-y-[-10px] md:transition md:duration-400 rounded-xl overflow-hidden">
                                <Image
                                    src={item.imageUrl}
                                    alt=""
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <p className="font-ibm_plex_serif font-bold text-[20px] cursor-pointer text-text-color line-clamp-1 hover:underline">
                                {item.title}
                            </p>
                            <p className="font-ibm_plex_serif font-[500] text-lg text-[#808080] line-clamp-2">
                                {item.description}
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="h-[27px] w-[27px] rounded-full">
                                    <Avatar>
                                        <AvatarImage src="/images/kasinHomepage/author.jpg" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                                <span className="font-inter font-[500] text-xl text-[#808080]">
                                    {item.author}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Technology
