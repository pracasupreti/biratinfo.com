import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Footer from '@/components/kasin/Footer';
import { Button } from '@/components/ui/button';


function Page() {
    const relatedNews = [
        {
            title: 'ताप बढे सँगै बजारमा फलफूलको माग बढ्न थाल्यो(मूल्यसूची सहित)',
            path: '/images/kasinSinglepage/RelatedImage1.png',
            description: 'तापक्रममा भएको वृद्धिसँगै उपभोक्ताहरूले मौसमी फलफूलमा देखाएको आकर्षणले बजारमा माग बढाएको छ, जसको कारण ......'
        },
        {
            title: 'उपत्यकाको तापक्रम बढ्ने क्रममा : अरब सागरबाट भित्रिरहेको जलवाष्पयुक्त हावाको आंशिक प्रभाव',
            path: '/images/kasinSinglepage/RelatedImage2.jpg',
            description: 'उपत्यकामा तापक्रम वृद्धि जारी: अरब सागरबाट भित्रिएको जलवाष्पयुक्त हावाको आंशिक प्रभावले मौसममा सामान्य परिवर्तन ......'
        },
        {
            title: 'गाउँ गाउँमा रहेका भूमेस्थानमा राम्रोसँग काम होस् भनी प्रकृतिको पूजा आराधना गर्ने प्रचलन',
            path: '/images/kasinSinglepage/RelatedImage3.jpg',
            description: 'ग्रामीण भेगमा भूमेस्थानको धार्मिक र सांस्कृतिक महत्व: राम्रो फसल र शान्तिको कामना गर्दै प्रकृतिलाई गरिने परम्परागत पूजा ......'
        },
        {
            title: 'अहिंसा नै शान्ति र मैत्रीको आधारशिला हो : भगवान् गौतम बुद्ध',
            path: '/images/kasinSinglepage/RelatedImage4.png',
            description: 'संसारलाई शान्तिको बाटो: भगवान् गौतम बुद्धको कालजयी दर्शन - अहिंसा, प्रेम र करुणा नै मानव कल्याण र विश्व शान्तिको ......'
        },
    ]
    return (
        <div>
            <div className="flex flex-col gap-12 max-w-7xl mx-auto">
                <div className='relative w-full h-[60vh] md:h-[80vh] overflow-hidden'>
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10' />
                    <Image
                        src="/images/kasinHomepage/SummaryImage1.png"
                        alt="News headline image"
                        fill
                        className='object-cover'
                    />
                    <div className='absolute bottom-0 left-0 right-0 z-20 px-6 pb-8 md:px-12 md:pb-12 mb-16'>
                        <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-center'>
                            प्रधानमन्त्री ओलीको राजनीतिक चर्तुयाँईको घेरोमा सभापति देउवा : गर्भनरका कारण भित्रि मनमुटाव
                        </h1>
                    </div>
                </div>

                <article className='px-6 md:px-12 lg:px-24'>
                    <div className='relative -mt-10 md:-mt-34 mb-10 z-30'>
                        <div className='bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-4xl mx-auto'>
                            <p className='text-lg md:text-xl leading-relaxed text-gray-700 mb-6 text-center md:text-start'>
                                नेपालको राजनीति अहिले तरंगित अवस्थामा छ । नेपाली कांग्रेस र नेकपा एमालेको गठबन्धन सरकारको अहिले चौतर्फी आलोचना भैरहेको छ । देशले अहिले सम्म नयाँ गतिभिर पाउन सकेको छैन् ।
                            </p>
                            <div className='flex flex-wrap gap-4 justify-center'>
                                {['#समय सान्दर्भिक', '#समाचार', '#राजनीति', '#नेपाल'].map((tag, i) => (
                                    <span key={i} className='px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm'>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='prose prose-lg max-w-none md:prose-xl prose-p:text-gray-700 prose-headings:text-gray-900 text-center md:text-start'>
                        <p className='text-lg md:text-xl leading-relaxed text-gray-700'>
                            नेपालको राजनीति अहिले तरंगित अवस्थामा छ । नेपाली कांग्रेस र नेकपा एमालेको गठबन्धन सरकारको अहिले चौतर्फी आलोचना भैरहेको छ । देशले अहिले सम्म नयाँ गर्भर पाउन सकेको छैन । जसका कारण आर्थिक चलखेलका कुराहरु राम्ररी चलायमान हुन सकेको छैन । गठबन्धन सरकारको गृहमन्त्री रहेका रमेश लेखकले आफूले चाहेको जस्तो निर्णय गर्न सकेनन् । कांग्रेस सभापति शेरबहादुर देउवाको चाहनामा रहेको गर्भर पदले गर्दा अहिले कांग्रेसको मात्र नभई गृहमन्त्री लेखकको पनि आलोचना भैरहेको छ ।
                        </p>

                        <div className='my-12 grid md:grid-cols-2 gap-8 items-center'>
                            <div>
                                <h2 className='text-3xl md:text-4xl font-bold mb-6 text-text-color'>कहाँ जाँदै छ राज्य ? : प्रमुख क्षेत्र अर्थ, चिकित्सा , शिक्षा देखी हरेक क्षेत्र तनावग्रस्त</h2>
                                <p className='mb-4 text-lg md:text-xl leading-relaxed text-gray-700'>
                                    राज्य अहिले तहसनहस अवस्थामा पुगेको छ। प्रधानमन्त्री केपी शर्मा ओली नेतृत्वको गठबन्धन सरकार जनताको चाहनाको विपक्ष भन्दा पनि धेरै ध्यानकेन्द्रित गरिंदैछ। राजयमा अहिले प्रमुख विषय भनेको शिक्षक आन्दोलन भएको छ। आफ्नो माग पूरा नभएसम्म आन्दोलनलाई नरोक्ने घोषणा सडकमा उत्रिएका गुरु गुरुआमाहरुको मागलाई सम्बोधन गर्न भन्दा पनि आन्दोलनलाई कसरी तितरबितर पार्न दाउमा सरकार पक्ष लागेको देखिन थालेको छ।
                                </p>
                                <p className='mb-4 text-lg md:text-xl leading-relaxed text-gray-700'>
                                    गुरु गुरुआमाहरुको मागलाई सरकारले त्यति धेरै वास्ता नगर्नुको प्रमुख कारण शैक्षिक क्षेत्रमा लादिएको राजनीति पनि हो। शिक्षा संग सम्बन्धित एक शिक्षा विज्ञ भन्छन्, प्राय शिक्षकहरु कुनै न कुनै राजनीतिक दल संग सरोकार राख्ने हुँदा सरकारले उनीहरुको मागलाई त्यति गंभीरताका साथ लिएको नहो।
                                </p>
                                <p className='text-lg md:text-xl leading-relaxed text-gray-700'>
                                    हो उनको भनाईलाई मात्रै हो भने अहिले गठबन्धन सरकारका नेतृत्वकर्ता प्रधानमन्त्री ओली देखी सत्ता साझेदार दल नेपाल कांग्रेसका नेताहरु स्वयं पनि शिक्षक आन्दोलनमा लागेको गुरु गुरुआमाहरुलाई शिक्षक होइन कि आफ्नो दलका कार्यकर्ताहरुको रुपमा चित्रित गर्न हुँदा पनि यो अवस्था उब्जिएको हो।
                                </p>
                                <p className='text-lg md:text-xl leading-relaxed text-gray-700'>
                                    प्रहरीको ज्यादतीको विरोध स्वरुप शिक्षकहरुले आन्दोलन थप सशक्त बनाउदै भएका छन्। आन्दोलनको अगुवाई गरिरहेको नेपाल शिक्षक महासंघ राष्ट्रिय समितिले अन्तिम लडाईंका लागि अनिवार्य काठमाडौं आउन देशभरका शिक्षकलाई आह्वान गरेको छ।
                                </p>
                            </div>
                            <div className='w-full md:w-[502px] max-w-full relative mx-auto md:mx-0 h-auto' >
                                {/* SIDE IMAGE */}
                                <div className='relative w-full h-[700px] max-h-[100vh] bg-[url(/images/kasinSinglepage/SinglePage1.png)] rounded-md bg-cover bg-no-repeat' />
                            </div>
                        </div>

                        <h2 className='text-3xl md:text-4xl font-bold my-8 text-text-color'>प्रधानमन्त्री ओली : न सत्ता नेतृत्वमा सफल न पार्टी नेतृत्वमा : बोल्यो कि पोल्यो को बाटोमा ओली नेतृत्व</h2>
                        <p className='text-lg md:text-xl leading-relaxed text-gray-700'>
                            बुधवारप्रतिनिधिसभामा प्रतिपक्षी दलहरुले उनको राजीनामाको कुरा उठाए। भने अहिले आफ्नै दल नेकपा एमालेमा एउटा तानाशाही प्रवृत्तिको अध्यक्षको परिचय हुन थालेको छ। सत्ताको नेतृत्वकर्ता प्रधानमन्त्री ओलीले जसरी तानाशाही प्रवृत्ति लाद्दै छन्। त्यसरी पार्टीमा पनि उनको शैली त्यस्तै छ।
                        </p>

                        <blockquote className='border-l-4 border-gray-300 pl-6 my-8 italic text-lg md:text-xl leading-relaxed text-gray-700'>
                            &quot;कार्यकारी प्रमुखको गहन भूमिकामा रहेका प्रधानमन्त्री केपी ओली चौतर्फी बिरोधका पात्र &quot;
                        </blockquote>

                        <p className='text-lg md:text-xl leading-relaxed text-gray-700'>
                            यसरी शिक्षक आन्दोलनको पक्षमा बोलेकै भन्दै पूर्व शिक्षामन्त्री धनिराम पौडेललाई राजिनामा दिन बाध्य पारे। पूर्व मन्त्री भट्टराई शिक्षक बिधेयकलाई पास गर्नुपर्ने कुरा उठाउँछन्। अहिले एमालेमा अर्कोतिर तानाशाह बनिरहेका प्रधानमन्त्री ओली आफ्नो बिरोधको स्वर सुन्न नचाहने हठ्ठमाबादी सोचलाई अहिले पुनरवृत्ति गरिरहेका प्रधानमन्त्री ओलीले आफ्नो नेतृत्वको सत्ता र दलमा भरपूर पकड लिइरहेका छन्।
                        </p>

                        <h2 className='text-3xl md:text-4xl font-bold my-8 text-text-color'>निष्कर्ष</h2>
                        <p className='text-lg md:text-xl leading-relaxed text-gray-700'>
                            देशका हरेक स्थान होटल, पसल देखी सार्वजनिक स्थलहरुमा प्रधानमन्त्री ओलीको क्रियाकलापलाई निकै निचो चर्चा चुलु रहेको छ। युवाहरुमाझ चर्चित रहेको टिकटक ह्यान्डिलमा ओलीको कार्य व्यवहारले गर्दा अहिले देशका विशेष गरि युवा युवतीहरुको जमात उनी विरुद्ध जुरुमुर्याउदै अनेक थरी अवस्था रहेको छ।
                        </p>
                    </div>

                    <div className='border-t border-b border-gray-200 py-6 my-12'>
                        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                            <h3 className='text-lg font-semibold text-gray-800'>सेयर गर्नुहोस्:</h3>
                            <div className='flex flex-wrap gap-3 justify-center'>
                                {['facebook', 'twitter', 'youtube', 'instagram', 'linkedin'].map((icon, index) => (
                                    <button
                                        key={index}
                                        className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors'
                                        aria-label={`Share on ${icon}`}
                                    >
                                        <div className='relative w-5 h-5'>
                                            <Image
                                                src={`/images/kasinHomepage/${icon}.svg`}
                                                alt={`${icon} icon`}
                                                fill
                                                className='object-contain'
                                            />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center gap-4 p-6 bg-gray-50 rounded-lg mb-12'>
                        <div className='w-16 h-16 rounded-full overflow-hidden flex items-center'>
                            <Avatar >
                                <AvatarImage src="/images/kasinHomepage/author.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <h4 className='font-bold text-gray-900'>सुधीर नेपाल</h4>
                            <p className='text-gray-600 text-sm'> ७ मिनेट पढ्नुहोस्</p>
                            <p className='text-gray-700 mt-1 text-sm'>अपडेट गरिएको ५:०१ बिहान EDT, बिहीबार जेठ १, २०२५</p>
                        </div>
                    </div>
                </article>
            </div>

            {/* Related News */}
            <div className='mb-20 flex flex-col gap-6'>
                <p className='font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-center'>
                    सम्बन्धित खबर
                </p>

                <div className='max-w-screen-3xl w-full flex flex-col md:flex-row md:flex-wrap gap-8 md:gap-10 px-4 md:px-16 items-center md:items-stretch justify-center'>
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
                                <p className='font-semibold text-sm sm:text-base md:text-lg leading-snug text-text-color cursor-pointer '>
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


