import { Clock2Icon, TagIcon } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import NepaliDateTime from './NepaliDate'

function Hero() {
    return (
        <section className="w-full min-h-[calc(100vh-172px)] bg-[url('/images/homepage/Hero.jpg')] bg-cover bg-no-repeat bg-center flex items-end justify-center">
            <div className="bg-white w-[95%] sm:w-[90%] max-w-8xl mx-auto md:mx-16 lg:mx-44 rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl  py-5 sm:py-6 md:py-8 xl:py-10 text-text-color text-center font-jost flex flex-col items-center gap-3 sm:gap-5 md:gap-6">

                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-5xl font-semibold leading-tight cursor-pointer hover:underline">
                    ट्रक अनियन्त्रित भई पल्टिँदा दुबैतर्फ बाटो अवरुद्ध
                </h1>

                <p className="text-lg md:text-base lg:text-xl leading-relaxed max-w-6xl">
                    वीरगञ्जबाट काठमाडौं जाँदै गरेको मधेश प्रदेश ०३-००१ख १८१७ नम्बरको ट्रक आइतबार बिहान ७ बजे पल्टिएको हो । ट्रक पल्टिंदा बाटो पूर्णरुपमा बन्द भएको छ । कोइला लोड गरेको सो ट्रक उकालो ओभरटेक गर्ने क्रममा पल्टिएको प्रहरीले जनाएको छ ।
                </p>

                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 md:gap-6 xl:gap-16 text-xs sm:text-sm md:text-lg font-normal">
                    <p className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                            <AvatarImage src="/images/kasinHomepage/author.jpg" alt="प्रकाश थापा" />
                            <AvatarFallback>PT</AvatarFallback>
                        </Avatar>
                        सुधिर नेपाल
                    </p>
                    <p className="flex items-center gap-2">
                        <Clock2Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        ६ मिनेटमा पढ्नुहोस
                    </p>
                    <p className="flex items-center gap-2">
                        <TagIcon className="w-4 h-4 sm:w-5 sm:h-5" />
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
