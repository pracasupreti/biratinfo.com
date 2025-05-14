import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarIcon, Clock2Icon } from 'lucide-react';
import Footer from '@/components/kasin/Footer';
import { Button } from '@/components/ui/button';


function Page() {
    // const SocialMedia = [
    //     {
    //         path: '/images/singlepage/facebook.svg'
    //     },
    //     {
    //         path: '/images/singlepage/instagram.svg'
    //     },
    //     {
    //         path: '/images/singlepage/linkedin.svg'
    //     },
    //     {
    //         path: '/images/singlepage/pinterest.svg'
    //     },
    //     {
    //         path: '/images/singlepage/snapchat.svg'
    //     },
    //     {
    //         path: '/images/singlepage/telegram.svg'
    //     },
    //     {
    //         path: '/images/singlepage/tiktok.svg'
    //     },
    //     {
    //         path: '/images/singlepage/viber.svg'
    //     },
    //     {
    //         path: '/images/singlepage/youtube.svg'

    //     },
    // ]

    const relatedNews = [
        {
            title: 'ताप बढे सँगै बजारमा फलफूलको माग बढ्न थाल्यो(मूल्यसूची सहित)',
            path: '/images/kasinSinglepage/RelatedImage1.png',
            description: 'नेपालको राजनीति अहिले तरंगित अवस्थामा छ । नेपाली कांग्रेस र नेकपा एमालेको गठबन्धन सरकारको अहिले चौतर्फी आलोचना भैरहेको छ । देशले अहिले सम्म नयाँ गतिभिर पाउन सकेको छैन् । जसका कारण आर्थिक चलखेलका कुराहरु राम्ररी चलायमान हुन ......'
        },
        {
            title: 'उपत्यकाको तापक्रम बढ्ने क्रममा : अरब सागरबाट भित्रिरहेको जलवाष्पयुक्त हावाको आंशिक प्रभाव',
            path: '/images/kasinSinglepage/RelatedImage2.jpg',
            description: 'नेपालको राजनीति अहिले तरंगित अवस्थामा छ । नेपाली कांग्रेस र नेकपा एमालेको गठबन्धन सरकारको अहिले चौतर्फी आलोचना भैरहेको छ । देशले अहिले सम्म नयाँ गतिभिर पाउन सकेको छैन् । जसका कारण आर्थिक चलखेलका कुराहरु राम्ररी चलायमान हुन सकेको छैन् ......'
        },
        {
            title: 'गाउँ गाउँमा रहेका भूमेस्थानमा राम्रोसँग काम होस् भनी प्रकृतिको पूजा आराधना गर्ने प्रचलन',
            path: '/images/kasinSinglepage/RelatedImage3.jpg',
            description: 'नेपालको राजनीति अहिले तरंगित अवस्थामा छ । नेपाली कांग्रेस र नेकपा एमालेको गठबन्धन सरकारको अहिले चौतर्फी आलोचना भैरहेको छ । देशले अहिले सम्म नयाँ गतिभिर पाउन सकेको छैन् । जसका कारण आर्थिक चलखेलका कुराहरु राम्ररी चलायमान हुन सकेको छैन् ......'
        },
        {
            title: 'अहिंसा नै शान्ति र मैत्रीको आधारशिला हो : भगवान् गौतम बुद्ध',
            path: '/images/kasinSinglepage/RelatedImage4.png',
            description: 'नेपालको राजनीति अहिले तरंगित अवस्थामा छ । नेपाली कांग्रेस र नेकपा एमालेको गठबन्धन सरकारको अहिले चौतर्फी आलोचना भैरहेको छ । देशले अहिले सम्म नयाँ गतिभिर पाउन सकेको छैन् । जसका कारण आर्थिक चलखेलका कुराहरु राम्ररी चलायमान हुन सकेको छैन् ......'
        },
    ]
    return (
        <div className="flex flex-col gap-12 ">
            <div className='h-[80vh] w-full bg-[#888888] relative'>
                <div className="w-[90%] lg:max-w-[1348px] bg-white shadow-xl mx-auto rounded-2xl left-0 right-0 bottom-[-13%] px-4 sm:px-6 md:px-8 lg:px-20 xl:px-36 py-5 sm:py-6 md:py-8 xl:py-10 text-[#008000] text-center font-jost flex flex-col items-center gap-3 sm:gap-5 md:gap-6 z-20 absolute">

                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-tight">
                        प्रधानमन्त्री ओलीको राजनीतिक चर्तुयाँईको घेरोमा सभापति देउवा : गर्भनरका कारण भित्रि मनमुटाव
                    </h1>

                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-normal max-w-4xl">
                        नेपालको राजनीति अहिले तरंगित अवस्थामा छ । नेपाली कांग्रेस र नेकपा एमालेको गठबन्धन सरकारको अहिले चौतर्फी आलोचना भैरहेको छ । देशले अहिले सम्म नयाँ गतिभिर पाउन सकेको छैन् । जसका कारण आर्थिक चलखेलका कुराहरु राम्ररी चलायमान हुन सकेको छैन् ।
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 md:gap-6 xl:gap-16 text-xs sm:text-sm md:text-base font-normal">
                        <p className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src="/images/kasinHomepage/author.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            सुधीर नेपाल
                        </p>
                        <p className="flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                            बैशाख २८, २०८२
                        </p>
                        <p className="flex items-center gap-2">
                            <Clock2Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                            ६ मिनेटमा पढ्नुहोस
                        </p>

                    </div>
                </div>
                <Image src={'/images/kasinHomepage/SummaryImage1.png'} alt='' fill className='object-cover' quality={100} />
            </div>
            <div className=' w-full max-w-screen-3xl px-4 md:px-24 md:text-start text-center flex flex-col gap-4 md:gap-8 font-[400] text-xs sm:text-sm md:text-base lg:text-lg md:mt-24 mt-10'>
                <p>नेपालको राजनीति अहिले तरंगित अवस्थामा छ । नेपाली कांग्रेस र नेकपा एमालेको गठबन्धन सरकारको अहिले चौतर्फी आलोचना भैरहेको छ । देशले अहिले सम्म नयाँ गर्भर पाउन सकेको छैन । जसका कारण आर्थिक चलखेलका कुराहरु राम्ररी चलायमान हुन सकेको छैन । गठबन्धन सरकारको गृहमन्त्री रहेका रमेश लेखकले आफूले चाहेको जस्तो निर्णय गर्न सकेनन् । कांग्रेस सभापति शेरबहादुर देउवाको चाहनामा रहेको गर्भर पदले गर्दा अहिले कांग्रेसको मात्र नभई गृहमन्त्री लेखकको पनि आलोचना भैरहेको छ ।</p>
                <p>उता प्रहरी महानिरिक्षक पनि गर्भर पनि दुवैमा आफूले रोजेको व्यक्तिलाई लान प्रयाशमा लागेका प्रधानमन्त्री केपी शर्मा ओली प्रहरी महानिरिक्षक पदमा आफूले चाहेको व्यक्तिलाई नियुक्ति दिन सफल भए अब गर्भरमा आफ्नो चाहना बिपरित निर्णय हुन् दिने चाहनामा रहेका छन् । कांग्रेस सभापति देउवा अझै पनि गर्भर नै हाम्रै भन्दै प्रधानमन्त्री ओली र आफू बिच कुनै बैमनश्यता नरहेको दाबी गरिरहेका छन् । सत्ता साझेदारीमा रहेका एमाले र कांग्रेसले अहिले देशमा भित्रिरहेको बिद्यमान अबस्थाको समाधान गर्ने भन्दा पनि भागबण्डा नितिालाई प्राथमिकता दिइरहेका छन् ।</p>
                <p>जसको कारण राष्ट्रको आर्थिक कारोबारको मुटु मानिएको नेपाल राष्ट्र बैंकमा गर्भर पद खाली भैरहेको धेरै समय भै सकेको छ । तर अहिले सम्म नयाँ गर्भर नियुक्ती गर्न प्रधानमन्त्री ओली नेतृत्व सरकार सफल भएको छैन ।</p>
            </div>
            <div className='w-full max-w-screen-3xl px-4 md:px-24 flex flex-col lg:flex-row items-center lg:gap-40 md:gap-20 gap-10'>
                <div className='w-full lg:w-1/2 flex flex-col gap-6 text-center md:text-start'>
                    <p className='font-[700] text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#055D59]'>गर्भर कसले गर्दा सभापति देउवा प्रधानमन्त्री ओलीसँग टाढिएका हुन् भन्ने आंकलन राजनीति पण्डितहरुको</p>
                    <p className='font-[400] text-xs sm:text-sm md:text-base lg:text-lg'>गर्भर र नेपाल प्रहरीको प्रमुख पदमा भागबन्डा गरेकोमा प्रमुख नियुक्त भएका छन भन्ने गर्भरमा भागबन्डा नमिलेको कुरा स्पष्ट देखिन्छ । पाका नेताहरुलाई सत्ताको आग्रह र आफन्तहरुको प्रभावले अहिले पनि सत्ताइन्दों (बिधित र अब्यबस्थापनको मारमा चलिरहेको नेपाली राजनीतिमा अहिले एक प्रकारको तुवाँलो लागिरहेको छ ।</p>
                    <p className='font-[400] text-xs sm:text-sm md:text-base lg:text-lg'>देशमा देखीएका आर्थिक, बेरोजगारी जस्ता जटिल समस्याहरुको समाधान तर्फ प्रधानमन्त्री ओली नेतृत्वको सरकारको आँखा जानु मुख्य बिषय थियो । तर त्यो हुन सकेको छैन । जसले गर्दा राजनीति खराब हुदाँ हुदै पनि राज्य संचालनका लागि अपरिहार्य हुन्छ । यसो भन्दैमा राजनीति त्यति खराब विधा पनि हैन, यसका केही नैतिक मूल्य, मान्यता, आदर्श र उद्देश्य अवश्य हुन्छन् ।</p>
                    <p className='font-[400] text-xs sm:text-sm md:text-base lg:text-lg'>राजनीतिमा चतुरता, छलछाम, तिकडम, धुर्तता र बललाई अबस्य हुन्छ, तर त्यसको पनि एउटा नैतिक सीमा, मर्यादा र समझदारी हुन्छ । अहिले प्रधानमन्त्री ओलीको यही राजनीति चर्चाएका कारण कांग्रेस सभापति सितार भिट्ट गर्दै गइरहेको अहिलेको राजनीतिक परिस्थितिले पनि देखाउँछ ।</p>
                    <p className='font-[400] text-xs sm:text-sm md:text-base lg:text-lg'>राजनीतिको धमिलो गतिले गर्दा रुपमा बिकसित हुदै गइरहेको नेपालको अहिले प्रधानमन्त्री ओली र सभापति देउवा भित्रि रुपमा केमेल सिर्जना भइरहेको अहिले अबस्थाले पनि देखाउँछ । जसको मुल कारण गर्भर नियुक्ति नै हो । जुन अहिले सम्म हुन सकेको छैन । धमिलो पानी माथि माछा मान्ने चालले अहिले माओवादी केन्द्रका अध्यक्ष दाहाल लागेका छन् । कहिले आफै एकताको सन्देश दिन्छन त कहिले कसरी सत्ता हत्याउने भन्ने खेलमा लागिरहेछन । दाहालको प्रश्नको जवाफ दिन प्रधानमन्त्री ओलीलाई हतारो हुन्छ भने उता सभापति देउवाको चाल भनेको जसरी हुन्छ प्रधानमन्त्री बन्ने हो । जसका लागि सभापति देउवाले मध्यममार्कको भुमिका खेली रहेका छन् ।</p>
                    <p className='font-[400] text-xs sm:text-sm md:text-base lg:text-lg'>राजनीतिको धमिलो गतिले गर्दा रुपमा बिकसित हुदै गइरहेको नेपालको अहिले प्रधानमन्त्री ओली र सभापति देउवा भित्रि रुपमा केमेल सिर्जना भइरहेको अहिले अबस्थाले पनि देखाउँछ । जसको मुल कारण गर्भर नियुक्ति नै हो । जुन अहिले सम्म हुन सकेको छैन । धमिलो पानी माथि माछा मान्ने चालले अहिले माओवादी केन्द्रका अध्यक्ष दाहाल लागेका छन् । कहिले आफै एकताको सन्देश दिन्छन त कहिले कसरी सत्ता हत्याउने भन्ने खेलमा लागिरहेछन । दाहालको प्रश्नको जवाफ दिन प्रधानमन्त्री ओलीलाई हतारो हुन्छ भने उता सभापति देउवाको चाल भनेको जसरी हुन्छ प्रधानमन्त्री बन्ने हो । जसका लागि सभापति देउवाले मध्यममार्कको भुमिका खेली रहेका छन् ।</p>
                </div>
                {/* SIDE IMAGE */}
                <div className='w-full md:w-[502px] max-w-full relative mx-auto md:mx-0 h-auto' >
                    <div className='relative w-full h-[700px] max-h-[100vh]'>
                        <Image
                            src={'/images/kasinSinglepage/advertisement.avif'}
                            alt='Nepal Politics'
                            fill
                            className='object-cover rounded-md'
                        />
                    </div>
                </div>
            </div>
            <div className='w-full max-w-screen-3xl px-4 md:px-24 text-center md:text-start flex flex-col gap-6'>
                <p className='font-[700] text-lg sm:text-xl md:text-2xl lg:text-3xl'>राजसंस्था पुनस्थापनाका लागि आगामी जेठ २४ गते काठमाडौंमा प्रदर्शनमा हुने </p>
                <p className='font-[400] text-xs sm:text-sm md:text-base lg:text-lg'>उता राजसंस्था पुनस्थापनाका लागि गठित संयुक्त जनआन्दोलन समितिले आगामी जेठ २४ गते काठमाडौंमा हुने प्रदर्शनमा सहभागी हुन उपत्यका बाहिरका जनतालाई पनि आह्वान गरेको छ । भने प्रधानमन्त्री केपी शर्मा ओलीले नेपाली जनताले राजा फर्काउने राजावादीहरुका सपना कहिल्यै पूरा हुन् दिने नबताएन बताएका छन् । नेपाली उखान कहिले सासुको पालो त कहिले बुहारीको पालो भने झै अहिले राज्यका तिन बरिश नेतृत्व एक आपसमा नाघिरहेका छन् । जनता भुल्ने काममा यि तिनै जनालाई कसैले पनि भेट्न सक्दैन । नेकपा माओवादी केन्द्रका अध्यक्ष पुष्पकमल दाहाल प्रचण्डले बर्तमान सरकारले कुरुकर्मको बोझले ढाल्ने दाबी गरिरहेका छन् । तर आफुहरुले सरकार हाल्ने हतियार नभएको भनाइ पनि बेला बखत राखैरहेका छन् ।</p>
            </div>
            <div className='w-full max-w-screen-3xl px-4 md:px-24 text-center md:text-start flex flex-col gap-6'>
                <p className='font-[700] text-lg sm:text-xl md:text-2xl lg:text-3xl'>निष्कर्ष</p>
                <p className='font-[400] text-xs sm:text-sm md:text-base lg:text-lg'>धमिलो पानी माथि माछा मान्ने चालले अहिले माओवादी केन्द्रका अध्यक्ष दाहाल लागेका छन् । कहिले आफै एकताको सन्देश दिन्छन त कहिले कसरी सत्ता हत्याउने भन्ने खेलमा लागिरहेछन । दाहालको प्रश्नको जवाफ दिन प्रधानमन्त्री ओलीलाई हतारो हुन्छ भने उता सभापति देउवाको चाल भनेको जसरी हुन्छ प्रधानमन्त्री बन्ने हो । जसका लागि सभापति देउवाले मध्यममार्कको भुमिका खेली रहेका छन् ।</p>
                <p className='font-[400] text-xs sm:text-sm md:text-base lg:text-lg'>अहिलेको तरंगित राजनीतिलाई राम्ररी नियाल्ने हो भने गर्भर कसले गर्दा सभापति देउवा प्रधानमन्त्री ओली संग टाढिएका हुन कि आंकलन राजनीति पण्डितहरुले गर्न थालेका छन् । जसको मूल खेलो भनेको सरकार परिबर्तन हो भन्दा पनि फरक नपर्ने अवस्था अहिले सिर्जना हुन थालेको छ ।</p>
            </div>
            <div className='flex max-w-screen-xl mx-auto gap-4'>
                {['facebook', 'twitter', 'youtube', 'instagram', 'linkedin'].map((icon) => (
                    <div key={icon} className='w-[42px] h-[42px] bg-[#d9d9d9] rounded-full flex items-center justify-center hover:translate-y-[-10px] transition duration-200 cursor-pointer'>
                        <Image src={`/images/kasinHomepage/${icon}.svg`} alt={`${icon} icon`} width={25} height={25} />
                    </div>
                ))}

            </div>
            <div className='mb-20 flex flex-col gap-6'>
                <p className='font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-center'>
                    सम्बन्धित खवर
                </p>

                <div className='max-w-screen-3xl w-full flex flex-col md:flex-row md:flex-wrap gap-8 md:gap-6 px-4 md:px-24 items-center md:items-stretch justify-center'>
                    {relatedNews.map((items, index) => (
                        <div
                            key={index}
                            className='w-full md:max-w-sm flex flex-col gap-3 group border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white'
                        >
                            <div className='w-full h-[30vh] sm:h-[25vh] md:h-[20vh] lg:h-[25vh] relative overflow-hidden rounded-t-xl'>
                                <Image
                                    src={items.path}
                                    alt='image'
                                    fill
                                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                                />
                            </div>
                            <div className='p-4 flex flex-col gap-2'>
                                <p className='font-semibold text-sm sm:text-base md:text-lg leading-snug hover:text-green-700 cursor-pointer transition-colors duration-200'>
                                    {items.title}
                                </p>
                                <p className='font-[400] text-xs sm:text-sm md:text-base text-zinc-500'>
                                    {items.description}
                                </p>
                                <div>
                                    <Button className='font-[400] font-inter bg-white text-black border border-zinc-400 shadow-lg'>थप पढ्नुहोस्</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Page
