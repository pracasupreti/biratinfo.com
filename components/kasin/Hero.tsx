import { Clock2Icon, TagIcon } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Hero() {
    return (
        <section className="w-full min-h-[calc(100vh-187px)] bg-[url('/images/kasinHomepage/Hero1.jpg')] bg-cover bg-no-repeat bg-center flex items-end justify-center">
            <div className="bg-white w-[95%] sm:w-[90%] lg:max-w-[1348px] mx-auto rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl px-4 sm:px-6 md:px-8 lg:px-20 xl:px-36 py-5 sm:py-6 md:py-8 xl:py-10 text-[#008000] text-center font-jost flex flex-col items-center gap-3 sm:gap-5 md:gap-6">

                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-tight">
                    कोइला लोड गरेको ट्रक अनियन्त्रित भई पल्टिँदा दुबैतर्फ बाटो अवरुद्ध
                </h1>

                <p className="text-xs sm:text-sm md:text-base lg:text-lg font-normal max-w-4xl">
                    वीरगञ्जबाट काठमाडौं जाँदै गरेको मधेश प्रदेश ०३-००१ख १८१७ नम्बरको ट्रक आइतबार बिहान ७ बजे पल्टिएको हो । ट्रक पल्टिंदा बाटो पूर्णरुपमा बन्द भएको छ । कोइला लोड गरेको सो ट्रक उकालो ओभरटेक गर्ने क्रममा पल्टिएको प्रहरीले जनाएको छ ।
                </p>

                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 md:gap-6 xl:gap-16 text-xs sm:text-sm md:text-base font-normal">
                    <p className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        प्रकाश थापा
                    </p>
                    <p className="flex items-center gap-2">
                        <Clock2Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        ६ मिनेटमा पढ्नुहोस
                    </p>
                    <p className="flex items-center gap-2">
                        <TagIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                        दुर्घटना
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Hero
