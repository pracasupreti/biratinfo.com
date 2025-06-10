import { Clock2Icon, TagIcon } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import NepaliDateTime from './NepaliDate'

function Hero() {
    return (
        <section className="w-full min-h-[calc(100vh-139px)] bg-[url('/images/homepage/Hero.jpg')] bg-cover bg-no-repeat bg-center flex items-end justify-center">
            <div className="bg-white w-[95%] sm:w-[90%] max-w-6xl mx-auto md:px-12 md:mx-12 lg:mx-32 rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl py-3 sm:py-3 md:py-4 xl:py-5 text-text-color text-center font-jost flex flex-col items-center gap-2 md:gap-3">

                <h1 className="text-base sm:text-lg md:text-xl lg:text-3xl font-semibold leading-tight cursor-pointer hover:underline">
                    कोशी प्रदेशका उत्कृष्ट गन्तव्यहरू
                </h1>

                <p className="text-sm md:text-sm lg:text-base leading-relaxed max-w-4xl">
                    नेपालका सातवटै प्रदेशमध्य कोशी प्रदेश पर्यटकीय, प्राकृतिक तथा सांस्कृतिक दृष्टिले अत्यन्त महत्वपूर्ण मानिन्छ। हिमालदेखि तराईसम्म फैलिएको यो प्रदेशमा पर्यटकहरूको लागि विविध अनुभव प्रदान गर्ने गन्तव्यहरू समेटिएको छ।
                </p>

                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 xl:gap-8 text-xs sm:text-xs md:text-sm font-normal">
                    <p className="flex items-center gap-1">
                        <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                            <AvatarImage src="/images/kasinHomepage/author.jpg" alt="प्रकाश थापा" />
                            <AvatarFallback>PT</AvatarFallback>
                        </Avatar>
                        सुधिर नेपाल
                    </p>
                    <p className="flex items-center gap-1">
                        <Clock2Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                        ६ मिनेटमा पढ्नुहोस
                    </p>
                    <p className="flex items-center gap-1">
                        <TagIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        दुर्घटना
                    </p>
                </div>
                <div className='flex justify-center'>
                    <NepaliDateTime />
                </div>
            </div>
        </section>
    )
}

export default Hero