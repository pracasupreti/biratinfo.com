import { Clock2Icon, TagIcon } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Hero() {
    return (
        <section className="w-full min-h-[calc(100vh-195px)] bg-[url('/images/homepage/Hero.jpg')] bg-cover bg-center flex items-end justify-center">
            <div className="bg-white w-[95%] sm:w-[90%] lg:max-w-[1348px] mx-auto rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl px-4 sm:px-6 md:px-8 lg:px-20 xl:px-36 py-5 sm:py-6 md:py-8 xl:py-10 text-[#008000] text-center font-jost flex flex-col items-center gap-3 sm:gap-5 md:gap-6">

                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-tight">
                    मोटरसाइकल अनियन्त्रित भई दुर्घटना हुँदा स्वयम्भू बस्ने उमेशको मृत्यु
                </h1>

                <p className="text-xs sm:text-sm md:text-base lg:text-lg font-normal max-w-4xl">
                    जीतपुरसिमरा सडक खण्डमा बा.प्र.०२ ०३९ प १०८५ नम्बरको मोटरसाइकल अनियन्त्रित भई आइतबार बिहान दुर्घटना हुँदा चालक काठमाण्डौं महानगरपालिका ३ स्वयंभू बस्ने ३५ वर्षीय अशोक लामाको मृत्यु भएको छ ।
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
