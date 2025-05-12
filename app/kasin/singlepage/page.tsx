import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock2Icon, TagIcon } from 'lucide-react';

function Page() {
    const SocialMedia = [
        {
            path: '/images/singlepage/facebook.svg'
        },
        {
            path: '/images/singlepage/instagram.svg'
        },
        {
            path: '/images/singlepage/linkedin.svg'
        },
        {
            path: '/images/singlepage/pinterest.svg'
        },
        {
            path: '/images/singlepage/snapchat.svg'
        },
        {
            path: '/images/singlepage/telegram.svg'
        },
        {
            path: '/images/singlepage/tiktok.svg'
        },
        {
            path: '/images/singlepage/viber.svg'
        },
        {
            path: '/images/singlepage/youtube.svg'

        },
    ]
    return (
        <div className="flex flex-col gap-12 ">
            <div className='h-[80vh] w-full bg-[#888888] relative'>
                <div className="w-[90%] lg:max-w-[1348px] bg-[#888888] mx-auto rounded-2xl left-0 right-0 bottom-[-13%] px-4 sm:px-6 md:px-8 lg:px-20 xl:px-36 py-5 sm:py-6 md:py-8 xl:py-10 text-black text-center font-jost flex flex-col items-center gap-3 sm:gap-5 md:gap-6 z-20 absolute">

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
                <Image src={'/images/kasinHomepage/SummaryImage1.png'} alt='' fill className='object-cover' />
            </div>
            <div className=' w-full max-w-screen-3xl px-4 md:px-24 md:text-start text-center flex flex-col gap-4 md:gap-8 font-[400] text-[20px] md:mt-24 mt-10'>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's...</p>
            </div>
            <div className='w-full max-w-screen-3xl px-4 md:px-24 flex flex-col md:flex-row items-center gap-10'>
                <div className='w-full md:w-1/2 flex flex-col gap-6 text-center md:text-start'>
                    <p className='font-[700] text-[40px] md:text-[40px]'>Lorem Ipsum is simply dummy text</p>
                    <p className='font-[400] text-[20px] md:text-[20px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p className='font-[400] text-[20px] md:text-[20px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s stan–</p>
                    <p className='font-[400] text-[20px] md:text-[20px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p className='font-[400] text-[20px] md:text-[20px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type–</p>
                </div>

                <div className='w-full md:w-2/5 h-[40vh] bg-[#888888] mx-auto'>
                    {/* IMAGE */}
                </div>
            </div>
            <div className='w-full max-w-screen-3xl px-4 md:px-24 text-center md:text-start'>
                <p className='font-[700] text-[40px] md:text-[40px]'>Lorem Ipsum is simply dummy text</p>
                <p className='font-[400] text-[20px] md:text-[20px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <div className='w-full max-w-screen-3xl px-4 md:px-24 text-center md:text-start flex flex-col gap-6'>
                <p className='font-[700] text-[40px] md:text-[40px]'>Conclusion</p>
                <p className='font-[400] text-[20px] md:text-[20px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p className='font-[400] text-[20px] md:text-[20px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <div className='flex max-w-screen-xl mx-auto gap-4'>
                {SocialMedia.map((items, index) =>
                    <div className='md:w-10 w-7 h-10 relative' key={index}>
                        <Image src={items.path} alt='' fill className='object-contain' />
                    </div>
                )}

            </div>
            <div className='mb-20 flex flex-col gap-6'>
                <p className='font-[700] text-[36px] text-center'>Related News</p>
                <div className='max-w-screen-3xl flex md:gap-3 gap-8 px-4 md:px-24 md:flex-row flex-col items-center'>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className='w-full md:max-w-2/3'>
                            <div className="w-full lg:h-[25vh] md:h-[15vh] h-[30vh] bg-[#888888]"></div>
                            <div >
                                <p className='font-[700] text-[36px]'>'Partying with Rebels': Shock rumours swirled Rachelle's murder</p>
                                <p>Rachelle Childs 'partied with bikies who killed her and severed her fingers'. This was one rumour peddled following her gruesome murder. Listen to the podcast and watch the video.</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Page
