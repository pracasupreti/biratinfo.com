import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarIcon, Clock2Icon } from 'lucide-react';
import Footer from '@/components/kasin/Footer';

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

    const relatedNews = [
        {
            title: 'ताप बढे सँगै बजारमा फलफूलको माग बढ्न थाल्यो(मूल्यसूची सहित)',
            path: '/images/kasinSinglepage/RelatedImage1.png'
        },
        {
            title: 'उपत्यकाको तापक्रम बढ्ने क्रममा : अरब सागरबाट भित्रिरहेको जलवाष्पयुक्त हावाको आंशिक प्रभाव',
            path: '/images/kasinSinglepage/RelatedImage2.jpg'
        },
        {
            title: 'गाउँ गाउँमा रहेका भूमेस्थानमा राम्रोसँग काम होस् भनी प्रकृतिको पूजा आराधना गर्ने प्रचलन',
            path: '/images/kasinSinglepage/RelatedImage3.jpg'
        },
        {
            title: 'अहिंसा नै शान्ति र मैत्रीको आधारशिला हो : भगवान् गौतम बुद्ध',
            path: '/images/kasinSinglepage/RelatedImage4.png'
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
            <div className=' w-full max-w-screen-3xl px-4 md:px-24 md:text-start text-center flex flex-col gap-4 md:gap-8 font-[400] text-[20px] md:mt-24 mt-10'>
                <p>नेपालको राजनीति अहिले तरंगित अवस्थामा छ । नेपाली कांग्रेस र नेकपा एमालेको गठबन्धन सरकारको अहिले चौतर्फी आलोचना भैरहेको छ । देशले अहिले सम्म नयाँ गर्भर पाउन सकेको छैन । जसका कारण आर्थिक चलखेलका कुराहरु राम्ररी चलायमान हुन सकेको छैन । गठबन्धन सरकारको गृहमन्त्री रहेका रमेश लेखकले आफूले चाहेको जस्तो निर्णय गर्न सकेनन् । कांग्रेस सभापति शेरबहादुर देउवाको चाहनामा रहेको गर्भर पदले गर्दा अहिले कांग्रेसको मात्र नभई गृहमन्त्री लेखकको पनि आलोचना भैरहेको छ ।</p>
                <p>उता प्रहरी महानिरिक्षक पनि गर्भर पनि दुवैमा आफूले रोजेको व्यक्तिलाई लान प्रयाशमा लागेका प्रधानमन्त्री केपी शर्मा ओली प्रहरी महानिरिक्षक पदमा आफूले चाहेको व्यक्तिलाई नियुक्ति दिन सफल भए अब गर्भरमा आफ्नो चाहना बिपरित निर्णय हुन् दिने चाहनामा रहेका छन् । कांग्रेस सभापति देउवा अझै पनि गर्भर नै हाम्रै भन्दै प्रधानमन्त्री ओली र आफू बिच कुनै बैमनश्यता नरहेको दाबी गरिरहेका छन् । सत्ता साझेदारीमा रहेका एमाले र कांग्रेसले अहिले देशमा भित्रिरहेको बिद्यमान अबस्थाको समाधान गर्ने भन्दा पनि भागबण्डा नितिालाई प्राथमिकता दिइरहेका छन् ।</p>
                <p>जसको कारण राष्ट्रको आर्थिक कारोबारको मुटु मानिएको नेपाल राष्ट्र बैंकमा गर्भर पद खाली भैरहेको धेरै समय भै सकेको छ । तर अहिले सम्म नयाँ गर्भर नियुक्ती गर्न प्रधानमन्त्री ओली नेतृत्व सरकार सफल भएको छैन ।</p>
            </div>
            <div className='w-full max-w-screen-3xl px-4 md:px-24 flex flex-col md:flex-row items-center gap-10'>
                <div className='w-full md:w-1/2 flex flex-col gap-6 text-center md:text-start'>
                    <p className='font-[700] text-[40px] md:text-[40px]'>गर्भर कसले गर्दा सभापति देउवा प्रधानमन्त्री ओलीसँग टाढिएका हुन् भन्ने आंकलन राजनीति पण्डितहरुको</p>
                    <p className='font-[400] text-[20px] md:text-[20px]'>गर्भर र नेपाल प्रहरीको प्रमुख पदमा भागबन्डा गरेकोमा प्रमुख नियुक्त भएका छन भन्ने गर्भरमा भागबन्डा नमिलेको कुरा स्पष्ट देखिन्छ । पाका नेताहरुलाई सत्ताको आग्रह र आफन्तहरुको प्रभावले अहिले पनि सत्ताइन्दों (बिधित र अब्यबस्थापनको मारमा चलिरहेको नेपाली राजनीतिमा अहिले एक प्रकारको तुवाँलो लागिरहेको छ ।</p>
                    <p className='font-[400] text-[20px] md:text-[20px]'>देशमा देखीएका आर्थिक, बेरोजगारी जस्ता जटिल समस्याहरुको समाधान तर्फ प्रधानमन्त्री ओली नेतृत्वको सरकारको आँखा जानु मुख्य बिषय थियो । तर त्यो हुन सकेको छैन । जसले गर्दा राजनीति खराब हुदाँ हुदै पनि राज्य संचालनका लागि अपरिहार्य हुन्छ । यसो भन्दैमा राजनीति त्यति खराब विधा पनि हैन, यसका केही नैतिक मूल्य, मान्यता, आदर्श र उद्देश्य अवश्य हुन्छन् ।</p>
                    <p className='font-[400] text-[20px] md:text-[20px]'>राजनीतिमा चतुरता, छलछाम, तिकडम, धुर्तता र बललाई अबस्य हुन्छ, तर त्यसको पनि एउटा नैतिक सीमा, मर्यादा र समझदारी हुन्छ । अहिले प्रधानमन्त्री ओलीको यही राजनीति चर्चाएका कारण कांग्रेस सभापति सितार भिट्ट गर्दै गइरहेको अहिलेको राजनीतिक परिस्थितिले पनि देखाउँछ ।</p>
                    <p className='font-[400] text-[20px] md:text-[20px]'>राजनीतिको धमिलो गतिले गर्दा रुपमा बिकसित हुदै गइरहेको नेपालको अहिले प्रधानमन्त्री ओली र सभापति देउवा भित्रि रुपमा केमेल सिर्जना भइरहेको अहिले अबस्थाले पनि देखाउँछ । जसको मुल कारण गर्भर नियुक्ति नै हो । जुन अहिले सम्म हुन सकेको छैन ।</p>
                </div>
                {/* SIDE IMAGE */}
                <div className='w-full md:w-2/6 h-[60vh] relative mx-auto' >
                    <Image src={'/images/kasinSinglepage/Image1.jpg'} alt='' fill className='object-cover' />
                </div>
            </div>
            <div className='w-full max-w-screen-3xl px-4 md:px-24 text-center md:text-start'>
                <p className='font-[700] text-[40px] md:text-[40px]'>राजसंस्था पुनस्थापनाका लागि आगामी जेठ २४ गते काठमाडौंमा प्रदर्शनमा हुने </p>
                <p className='font-[400] text-[20px] md:text-[20px]'>उता राजसंस्था पुनस्थापनाका लागि गठित संयुक्त जनआन्दोलन समितिले आगामी जेठ २४ गते काठमाडौंमा हुने प्रदर्शनमा सहभागी हुन उपत्यका बाहिरका जनतालाई पनि आह्वान गरेको छ । भने प्रधानमन्त्री केपी शर्मा ओलीले नेपाली जनताले राजा फर्काउने राजावादीहरुका सपना कहिल्यै पूरा हुन् दिने नबताएन बताएका छन् । नेपाली उखान कहिले सासुको पालो त कहिले बुहारीको पालो भने झै अहिले राज्यका तिन बरिश नेतृत्व एक आपसमा नाघिरहेका छन् । जनता भुल्ने काममा यि तिनै जनालाई कसैले पनि भेट्न सक्दैन । नेकपा माओवादी केन्द्रका अध्यक्ष पुष्पकमल दाहाल प्रचण्डले बर्तमान सरकारले कुरुकर्मको बोझले ढाल्ने दाबी गरिरहेका छन् । तर आफुहरुले सरकार हाल्ने हतियार नभएको भनाइ पनि बेला बखत राखैरहेका छन् ।</p>
            </div>
            <div className='w-full max-w-screen-3xl px-4 md:px-24 text-center md:text-start flex flex-col gap-6'>
                <p className='font-[700] text-[40px] md:text-[40px]'>निष्कर्ष</p>
                <p className='font-[400] text-[20px] md:text-[20px]'>धमिलो पानी माथि माछा मान्ने चालले अहिले माओवादी केन्द्रका अध्यक्ष दाहाल लागेका छन् । कहिले आफै एकताको सन्देश दिन्छन त कहिले कसरी सत्ता हत्याउने भन्ने खेलमा लागिरहेछन । दाहालको प्रश्नको जवाफ दिन प्रधानमन्त्री ओलीलाई हतारो हुन्छ भने उता सभापति देउवाको चाल भनेको जसरी हुन्छ प्रधानमन्त्री बन्ने हो । जसका लागि सभापति देउवाले मध्यममार्कको भुमिका खेली रहेका छन् ।</p>
                <p className='font-[400] text-[20px] md:text-[20px]'>अहिलेको तरंगित राजनीतिलाई राम्ररी नियाल्ने हो भने गर्भर कसले गर्दा सभापति देउवा प्रधानमन्त्री ओली संग टाढिएका हुन कि आंकलन राजनीति पण्डितहरुले गर्न थालेका छन् । जसको मूल खेलो भनेको सरकार परिबर्तन हो भन्दा पनि फरक नपर्ने अवस्था अहिले सिर्जना हुन थालेको छ ।</p>
            </div>
            <div className='flex max-w-screen-xl mx-auto gap-4'>
                {SocialMedia.map((items, index) =>
                    <div className='md:w-10 w-7 h-10 relative hover:translate-y-[-10px] transition duration-300 cursor-pointer' key={index}>
                        <Image src={items.path} alt='' fill className='object-contain' />
                    </div>
                )}

            </div>
            <div className='mb-20 flex flex-col gap-6'>
                <p className='font-[700] text-[36px] text-center'>सम्बन्धित खवर</p>
                <div className='max-w-screen-3xl flex md:gap-3 gap-8 px-4 md:px-24 md:flex-row flex-col items-center'>
                    {relatedNews.map((items, index) =>
                        <div key={index} className='w-full md:max-w-2/3 flex flex-col gap-3 group'>
                            <div className="w-full lg:h-[25vh] md:h-[15vh] h-[30vh] bg-[#888888] relative group-hover:translate-y-[-10px] transition duration-300 ">
                                <Image src={items.path} fill alt='image' className='object-cover' />
                            </div>
                            <div >
                                <p className='font-[700] text-[20px] cursor-pointer'>{items.title}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Page
