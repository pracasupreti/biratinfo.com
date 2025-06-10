import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Footer from '@/components/homepage/Footer';
import { Button } from '@/components/ui/button';
import Header from '@/components/homepage/Header';
import { Clock2Icon, TagIcon } from 'lucide-react';
import NepaliDateTime from '@/components/homepage/NepaliDate';

function Page() {
    const relatedNews = [
        {
            title: 'ताप बढे सँगै बजारमा फलफूलको माग बढ्न थाल्यो(मूल्यसूची सहित)',
            path: '/images/kasinSinglepage/RelatedImage1.png',
            description: 'तापक्रममा भएको वृद्धिसँगै उपभोक्ताहरूले मौसमी फलफूलमा देखाएको आकर्षणले बजारमा माग बढाएको छ, जसको ......'
        },
        {
            title: 'उपत्यकाको तापक्रम बढ्ने क्रममा : अरब सागरबाट भित्रिरहेको जलवाष्पयुक्त हावाको आंशिक प्रभाव',
            path: '/images/kasinSinglepage/RelatedImage2.jpg',
            description: 'उपत्यकामा तापक्रम वृद्धि जारी: अरब सागरबाट भित्रिएको जलवाष्पयुक्त हावाको आंशिक प्रभावले मौसममा ......'
        },
        {
            title: 'गाउँ गाउँमा रहेका भूमेस्थानमा राम्रोसँग काम होस् भनी प्रकृतिको पूजा आराधना गर्ने प्रचलन',
            path: '/images/kasinSinglepage/RelatedImage3.jpg',
            description: 'ग्रामीण भेगमा भूमेस्थानको धार्मिक र सांस्कृतिक महत्व: राम्रो फसल र शान्तिको कामना गर्दै प्रकृतिलाई गरिने ......'
        },
        {
            title: 'अहिंसा नै शान्ति र मैत्रीको आधारशिला हो : भगवान् गौतम बुद्ध',
            path: '/images/kasinSinglepage/RelatedImage4.png',
            description: 'संसारलाई शान्तिको बाटो: भगवान् गौतम बुद्धको कालजयी दर्शन - अहिंसा, प्रेम र करुणा नै मानव कल्याण र विश्व ......'
        },
    ]
    return (
        <div>
            <Header />
            <div className='relative w-full h-[40vh] md:h-[50vh] lg:h-[85vh] overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10' />
                <Image
                    src="/images/kasinHomepage/SummaryImage1.png"
                    alt="News headline image"
                    fill
                    className='object-cover w-full'
                />
            </div>

            <div className="flex flex-col gap-8 max-w-5xl mx-auto px-4 sm:px-6">
                <article className='mt-4 md:mt-8'>
                    <div className='relative -mt-20 md:-mt-32 lg:-mt-40 mb-8 z-30'>
                        <div className='bg-white p-4 md:p-6 rounded-xl shadow-lg max-w-3xl mx-auto'>
                            <h1 className='text-[16px] md:text-3xl font-bold leading-tight text-text-color mb-2 text-center'>
                                प्रधानमन्त्री ओलीको राजनीतिक चर्तुयाँईको घेरोमा सभापति देउवा : गर्भनरका कारण भित्रि मनमुटाव
                            </h1>

                            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 md:gap-5 xl:gap-12 xl:text-base text-xs sm:text-sm md:text-sm font-normal text-text-color mb-2">
                                <p className="flex items-center gap-1">
                                    <Avatar className="w-6 h-6">
                                        <AvatarImage src="/images/kasinHomepage/author.jpg" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    प्रकाश थापा
                                </p>
                                <p className="flex items-center gap-1">
                                    <Clock2Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    ६ मिनेटमा पढ्नुहोस
                                </p>
                                <p className="flex items-center gap-1">
                                    <TagIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    दुर्घटना
                                </p>
                            </div>
                            <div className='flex justify-center'>
                                <NepaliDateTime />
                            </div>
                        </div>
                    </div>

                    <div className='prose prose-base max-w-none md:prose-lg prose-p:text-gray-700 prose-headings:text-gray-900 text-center md:text-start'>
                        <p className='text-base md:text-lg leading-relaxed text-gray-700'>
                            नेपालको राजनीति अहिले तरंगित अवस्थामा छ । नेपाली कांग्रेस र नेकपा एमालेको गठबन्धन सरकारको अहिले चौतर्फी आलोचना भैरहेको छ । देशले अहिले सम्म नयाँ गर्भर पाउन सकेको छैन । जसका कारण आर्थिक चलखेलका कुराहरु राम्ररी चलायमान हुन सकेको छैन । गठबन्धन सरकारको गृहमन्त्री रहेका रमेश लेखकले आफूले चाहेको जस्तो निर्णय गर्न सकेनन् । कांग्रेस सभापति शेरबहादुर देउवाको चाहनामा रहेको गर्भर पदले गर्दा अहिले कांग्रेसको मात्र नभई गृहमन्त्री लेखकको पनि आलोचना भैरहेको छ ।
                        </p>

                        <div className='my-8 grid md:grid-cols-2 gap-6 md:gap-16 items-left'>
                            <div>
                                <h2 className='text-2xl md:text-3xl font-bold mb-4 text-text-color'>कहाँ जाँदै छ राज्य ? : प्रमुख क्षेत्र अर्थ, चिकित्सा , शिक्षा देखी हरेक क्षेत्र तनावग्रस्त</h2>
                                <p className='mb-3 text-base md:text-lg leading-relaxed text-gray-700'>
                                    राज्य अहिले तहसनहस अवस्थामा पुगेको छ। प्रधानमन्त्री केपी शर्मा ओली नेतृत्वको गठबन्धन सरकार जनताको चाहनाको विपक्ष भन्दा पनि धेरै ध्यानकेन्द्रित गरिंदैछ। राजयमा अहिले प्रमुख विषय भनेको शिक्षक आन्दोलन भएको छ। आफ्नो माग पूरा नभएसम्म आन्दोलनलाई नरोक्ने घोषणा सडकमा उत्रिएका गुरु गुरुआमाहरुको मागलाई सम्बोधन गर्न भन्दा पनि आन्दोलनलाई कसरी तितरबितर पार्न दाउमा सरकार पक्ष लागेको देखिन थालेको छ।
                                </p>
                                <p className='mb-3 text-base md:text-lg leading-relaxed text-gray-700'>
                                    गुरु गुरुआमाहरुको मागलाई सरकारले त्यति धेरै वास्ता नगर्नुको प्रमुख कारण शैक्षिक क्षेत्रमा लादिएको राजनीति पनि हो। शिक्षा संग सम्बन्धित एक शिक्षा विज्ञ भन्छन्, प्राय शिक्षकहरु कुनै न कुनै राजनीतिक दल संग सरोकार राख्ने हुँदा सरकारले उनीहरुको मागलाई त्यति गंभीरताका साथ लिएको नहो।
                                </p>
                                <p className='text-base md:text-lg leading-relaxed text-gray-700'>
                                    हो उनको भनाईलाई मात्रै हो भने अहिले गठबन्धन सरकारका नेतृत्वकर्ता प्रधानमन्त्री ओली देखी सत्ता साझेदार दल नेपाल कांग्रेसका नेताहरु स्वयं पनि शिक्षक आन्दोलनमा लागेको गुरु गुरुआमाहरुलाई शिक्षक होइन कि आफ्नो दलका कार्यकर्ताहरुको रुपमा चित्रित गर्न हुँदा पनि यो अवस्था उब्जिएको हो।
                                </p>
                            </div>
                            <div className='w-full md:w-[400px] max-w-full relative mx-auto md:mx-0 h-auto'>
                                <div className='relative w-full h-[550px] max-h-[80vh] bg-[url(/images/kasinSinglepage/advertisement.png)] rounded-md bg-cover bg-no-repeat' />
                            </div>
                        </div>

                        <h2 className='text-2xl md:text-3xl font-bold my-6 text-text-color'>प्रधानमन्त्री ओली : न सत्ता नेतृत्वमा सफल न पार्टी नेतृत्वमा : बोल्यो कि पोल्यो को बाटोमा ओली नेतृत्व</h2>
                        <p className='text-base md:text-lg leading-relaxed text-gray-700'>
                            बुधवारप्रतिनिधिसभामा प्रतिपक्षी दलहरुले उनको राजीनामाको कुरा उठाए। भने अहिले आफ्नै दल नेकपा एमालेमा एउटा तानाशाही प्रवृत्तिको अध्यक्षको परिचय हुन थालेको छ। सत्ताको नेतृत्वकर्ता प्रधानमन्त्री ओलीले जसरी तानाशाही प्रवृत्ति लाद्दै छन्। त्यसरी पार्टीमा पनि उनको शैली त्यस्तै छ।
                        </p>

                        <blockquote className='border-l-4 border-gray-300 pl-4 my-6 italic text-base md:text-lg leading-relaxed text-gray-700'>
                            &quot;कार्यकारी प्रमुखको गहन भूमिकामा रहेका प्रधानमन्त्री केपी ओली चौतर्फी बिरोधका पात्र &quot;
                        </blockquote>

                        <p className='text-base md:text-lg leading-relaxed text-gray-700'>
                            यसरी शिक्षक आन्दोलनको पक्षमा बोलेकै भन्दै पूर्व शिक्षामन्त्री धनिराम पौडेललाई राजिनामा दिन बाध्य पारे। पूर्व मन्त्री भट्टराई शिक्षक बिधेयकलाई पास गर्नुपर्ने कुरा उठाउँछन्। अहिले एमालेमा अर्कोतिर तानाशाह बनिरहेका प्रधानमन्त्री ओली आफ्नो बिरोधको स्वर सुन्न नचाहने हठ्ठमाबादी सोचलाई अहिले पुनरवृत्ति गरिरहेका प्रधानमन्त्री ओलीले आफ्नो नेतृत्वको सत्ता र दलमा भरपूर पकड लिइरहेका छन्।
                        </p>

                        <h2 className='text-2xl md:text-3xl font-bold my-6 text-text-color'>निष्कर्ष</h2>
                        <p className='text-base md:text-lg leading-relaxed text-gray-700'>
                            देशका हरेक स्थान होटल, पसल देखी सार्वजनिक स्थलहरुमा प्रधानमन्त्री ओलीको क्रियाकलापलाई निकै निचो चर्चा चुलु रहेको छ। युवाहरुमाझ चर्चित रहेको टिकटक ह्यान्डिलमा ओलीको कार्य व्यवहारले गर्दा अहिले देशका विशेष गरि युवा युवतीहरुको जमात उनी विरुद्ध जुरुमुर्याउदै अनेक थरी अवस्था रहेको छ।
                        </p>
                    </div>

                    <div className='border-t border-b border-gray-200 py-4 my-8'>
                        <div className='flex flex-col md:flex-row items-center justify-between gap-3'>
                            <h3 className='text-base font-semibold text-gray-800'>सेयर गर्नुहोस्:</h3>
                            <div className="sharethis-inline-share-buttons"></div>
                        </div>
                    </div>
                </article>
            </div>

            {/* Related News */}
            <div className="mb-16 flex flex-col gap-4 max-w-5xl mx-auto px-4 sm:px-6">
                <p className="font-bold text-base sm:text-lg md:text-xl text-center">
                    सम्बन्धित खबर
                </p>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {relatedNews.map((items, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-2 group border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
                        >
                            <div className="w-full h-[25vh] sm:h-[20vh] md:h-[18vh] lg:h-[16vh] relative overflow-hidden rounded-t-lg">
                                <Image
                                    src={items.path}
                                    alt="image"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <p className="font-semibold text-xs sm:text-sm md:text-base leading-snug text-text-color cursor-pointer line-clamp-2">
                                    {items.title}
                                </p>
                                <p className="font-[400] text-xs text-zinc-500 line-clamp-3">
                                    {items.description}
                                </p>
                                <div>
                                    <Button className="font-[400] text-xs font-inter bg-white text-black border border-zinc-400 shadow-sm h-8">
                                        थप पढ्नुहोस्
                                    </Button>
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