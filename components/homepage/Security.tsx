import React from 'react'
import Image from 'next/image'
import { MessageSquareIcon, TrendingUpIcon } from 'lucide-react'

const Security = () => {
    const employment = [
        {
            index: 1,
            miniTitle: 'गौशलामा जे देखीयो',
            title: 'महाराज कि ठग ? : पहेँलो बस्त्रको नाममा महाराजहरुले मच्चाउन थाले ताण्डव – सम्वन्धित निकाय बेखबर',
            description:
                'झापाका रमेश मगर काठमाडौं छिरेको ५ दिन मात्र भयो । ३२ वर्षीय थापा वैदेशिक रोजगारीको लागि काठमाडौं छिरेका हुन् । गौशाला देखी एयरपोर्ट जाने रोडको पल्लो छेउमा रहेको एक होटेलमा बसेका छन उनी । ',
            imageUrl: '/images/kasinHomepage/SecurityImage1.png',
            comment: '६'
        },
        {
            index: 2,
            miniTitle: 'भारत /पाकिस्तान तनाव',
            title: 'नागरिकता र आधार कार्ड अनिवार्य : परिस्थितिलाई मध्यनजर गर्दै सुरक्षाकर्मी परिचालन',
            description:
                'भारत-पाकिस्तानबीच भएको युद्धको प्रभाव नेपालको सिमावर्ती क्षेत्रहरुमा समेत देखिन थालेको छ । भारतसँग जोडिएको कैलालीको गौरीफन्टा नाकाको चेकजाँचमा कडाइ गरिएको छ ।',
            imageUrl: '/images/kasinHomepage/SecurityImage2.png',
            comment: '६'
        },
        {
            index: 3,
            miniTitle: 'समाचार',
            title: 'जमिन भासिएर गाडी बेपत्ता : अधिकारीको नेतृत्वमा विभागको चार सदस्यीय टोलीले अध्ययन गर्दै',
            description:
                'जमिन भासिएर गाडी बेपत्ता भएको पाँचौ दिनमा नारायण अधिकारीको नेतृत्वमा खानी तथा भूगर्भ विभागको चार सदस्यीय टोलीले अध्ययन थालेको छ । उक्त गाडी हेटौंडा उपमहानगरपालिका-१८ नम्बर वडाको सिमानामा पर्ने मेरोगाउँमा जमिन भासिएको हो ।',
            imageUrl: '/images/kasinHomepage/SecurityImage3.jpeg',
            comment: '३०३'
        },
        {
            index: 4,
            miniTitle: 'गौशला - एअरपोर्ट सडक खण्ड',
            title: 'मोटरसाइकल चालकलाई जोगाउन खोज्दा बस पल्टियो :  सवार सबै सकुशल',
            description:
                'नयाँ बसपार्कबाट गौशाला हुँदै एयरपोर्टतर्फ जाँदै गरेको बस तिलगंगा स्थित सूचना विभागको कार्यालय अगाडि अनियन्त्रित भई पल्टिएको छ । हाइ स्पिडमा रहेको उक्त बसका चालकले मोटरसाइकललाई जोगाउन खोज्दा ब्रेक नलागेर अनियन्त्रित भई सडक पल्टिएको हो ।',
            imageUrl: '/images/kasinHomepage/SecurityImage4.png',
            comment: '१११'
        }
    ]

    return (
        <section className='w-full px-4 lg:px-20 md:px-6 py-12'>
            <div className='max-w-8xl mx-auto md:mx-16 lg:mx-24 flex flex-col gap-12 md:gap-16'>
                <div className='flex flex-col gap-2'>
                    <p className='text-text-color font-orienta text-[18px] md:text-[20px] font-[700]'>सुरक्षा</p>
                    <div className='w-full h-[2px] bg-[#ebebeb]' />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8'>
                    {employment.map((item) => (
                        <div className='flex flex-col gap-3 group' key={item.index}>
                            <div className='w-full aspect-[16/9] relative md:group-hover:translate-y-[-10px] md:transition md:duration-400 rounded-md overflow-hidden'>
                                <Image
                                    src={item.imageUrl}
                                    alt='security image'
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes='(max-width: 768px) 100vw, 322px'
                                />
                            </div>

                            <div className='flex gap-2'>
                                {item.index === 3 && (
                                    <span className='font-roboto font-semibold text-lg bg-black text-white px-2 rounded-lg'>
                                        EXCLUSIVE
                                    </span>
                                )}
                                <p className='text-[#808080] font-roboto font-semibold text-lg'>{item.miniTitle}</p>
                            </div>

                            <h3 className='font-ibm_plex_serif font-bold text-xl leading-snug text-text-color line-clamp-2 hover:underline cursor-pointer'>
                                {item.title}
                            </h3>

                            <p className='text-[#808080] font-inter text-lg line-clamp-2'>{item.description}</p>

                            <div className='flex items-center gap-2'>
                                <MessageSquareIcon size={16} stroke='#808080' />
                                <p className='text-[#808080] font-inter text-[13px]'>{item.comment}</p>
                                {(item.index === 3 || item.index === 4) && <TrendingUpIcon size={16} stroke='#808080' />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Security