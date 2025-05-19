import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Footer from '@/components/homepage/Footer';
import { Clock2Icon, TagIcon } from 'lucide-react';
import Header from '@/components/homepage/Header';

function Page() {

    const relatedNews = [
        {
            title: 'Trump gets the royal-purple-carpet treatment in the Middle East, belying thorny geopolitical challenges',
            path: '/images/homepage/RelatedImage2.webp',
            description: 'President Donald Trump arrived in Riyadh on Tuesday to a royal-purple-carpet ......'
        },
        {
            title: 'Trump is Middle East-bound for his first major international trip of his second term. Here’s what to watch',
            path: '/images/homepage/RelatedImage3.webp',
            description: 'President Donald Trump embarks Monday on the first major international trip of ......'
        },
        {
            title: 'Trump’s Middle East trip leaves Netanyahu watching from the sidelines again',
            path: '/images/homepage/RelatedImage4.webp',
            description: 'Just a few months into his new administration, the president of the United States ......'
        },
        {
            title: 'Trump’s embrace of Syria and its jihadist-turned-president could shake up the Middle East',
            path: '/images/homepage/RelatedImage5.webp',
            description: 'Interim Syrian President Ahmed al-Sharaa, once known by his militant nom de guerre ......'
        },
    ]

    return (
        <div>
            <Header />
            <div className="flex flex-col gap-12 max-w-7xl mx-auto">
                <div className='relative w-full h-[60vh] md:h-[80vh] overflow-hidden'>
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10' />
                    <Image
                        src="/images/homepage/SinglePageImage1.webp"
                        alt="News headline image"
                        fill
                        className='object-cover'
                    />
                </div>

                <article className='px-6 md:px-12 lg:px-24'>
                    <div className='relative -mt-10 md:-mt-55 lg:-mt-50 mb-10 z-30'>
                        <div className='bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-4xl mx-auto'>
                            <p className='text-2xl md:text-4xl font-bold leading-tight text-text-color mb-2 text-center '>
                                Trump&apos;s Middle East tour has more substance than the White House let on
                            </p>
                            <p className='text-lg md:text-lg leading-relaxed text-gray-700 mb-2 text-center md:text-start'>
                                There’s more to Donald Trump’s Middle East trip than billion-dollar contracts, parades of camels and a storm back home over Qatar’s offer to give the president a new Air Force One.
                            </p>
                            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 md:gap-6 xl:gap-16 xl:text-lg text-xs sm:text-sm md:text-base font-normal text-text-color mb-2">
                                <p className="flex items-center gap-2">
                                    <Avatar>
                                        <AvatarImage src="/images/homepage/author.webp" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>

                                    Ismaeel Naar
                                </p>
                                <p className="flex items-center gap-2">
                                    <Clock2Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                    6 Minutes Read
                                </p>
                                <p className="flex items-center gap-2">
                                    <TagIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                    Politics
                                </p>
                            </div>
                            <div className='flex justify-end'>
                                <p className='text-gray-700 md:text-[12px] text-[10px]'>Updated 5:01 AM EDT, Thu May 15, 2025</p>

                            </div>
                            {/* <div className='flex flex-wrap gap-4 justify-center'>
                                {['#Global', '#News', '#Politics', '#USA'].map((tag, i) => (
                                    <span key={i} className='px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm'>
                                        {tag}
                                    </span>
                                ))}
                            </div> */}
                        </div>
                    </div>

                    <div className='prose prose-lg max-w-none md:prose-xl prose-p:text-gray-700 prose-headings:text-gray-900 text-center md:text-start'>
                        <p className='text-lg md:text-xl leading-relaxed text-gray-700'>
                            A tour narrowly billed by the White House as a chance for Trump to show he’s a master dealmaker is jumbling the region’s geopolitical jigsaw puzzle. Wherever he goes, Trump brings disruption that can forge possibilities. And he takes risks – for instance, his decision on this trip to lift sanctions on Syria to give a war-ravaged nation a second chance.
                        </p>

                        <div className='my-12 grid md:grid-cols-2 gap-8 items-center'>
                            <div>
                                <h2 className='text-3xl md:text-4xl font-bold mb-6 text-text-color'>Trump’s regional diplomatic ambitions are expanding</h2>
                                <p className='mb-4 text-lg md:text-xl leading-relaxed text-gray-700'>
                                    Trump’s geopolitical shake-up doesn’t end in Syria. He’s used the trip to build new pressure on Iran to agree to restrictions on its nuclear program – warning of military action if it refuses but clearly trying to head off the dire prospect of a new Middle East war.
                                </p>
                                <p className='mb-4 text-lg md:text-xl leading-relaxed text-gray-700'>
                                    His journey has also highlighted growing daylight with Israeli Prime Minister Benjamin Netanyahu – who was seen as an ideological soulmate of the 47th president but who is increasingly an object of Trump’s frustration.
                                </p>
                                <p className='text-lg md:text-xl leading-relaxed text-gray-700'>
                                    Behind the scenes, Trump’s team has been talking with Qatari and Saudi officials about how to alleviate a humanitarian crisis in Gaza caused by Israel’s blockade and an onslaught that has killed tens of thousands of civilians.
                                </p>
                                <p className='text-lg md:text-xl leading-relaxed text-gray-700'>
                                    There’s no sense that the US alliance with Israel is at risk. But gaps between Trump and Netanyahu have also opened over a US pact to halt rocket attacks by Houthi rebels in Yemen that did not include Israel; Trump’s bypassing of the Israelis in a deal this week to free the last living American hostage in Gaza; and on the Syria sanctions decision.
                                </p>
                            </div>
                            <div className='w-full md:w-[502px] max-w-full relative mx-auto md:mx-0 h-auto' >
                                {/* SIDE IMAGE */}
                                <div className='relative w-full h-[700px] max-h-[100vh] bg-[url(/images/homepage/SinglePageImage2.webp)] rounded-md bg-cover bg-no-repeat' />
                            </div>
                        </div>

                        <h2 className='text-3xl md:text-4xl font-bold my-8 text-text-color'>Trump’s big Syria gamble</h2>
                        <p className='text-lg md:text-xl leading-relaxed text-gray-700'>
                            Details of the intricate diplomacy that must have led up to this decision have not yet been revealed. But the move reflects an understanding that Syria, devastated by years of civil war, is at a turning point, occupies a vital place on the map of the region and has the potential to tip into greater chaos if it deteriorates further.
                        </p>

                        <blockquote className='border-l-4 border-gray-300 pl-6 my-8 italic text-lg md:text-xl leading-relaxed text-gray-700'>
                            &quot;It’s their time to shine,” he said. “Good luck, Syria. Show something very special.&quot;
                        </blockquote>

                        <p className='text-lg md:text-xl leading-relaxed text-gray-700'>
                            The president told reporters that he believed that al-Sharaa has “got a real shot at holding it together.” Officials said later that Trump wants Syria to eventually recognize Israel. This would represent an extraordinary transformation in a region wracked by hate.
                        </p>

                        <h2 className='text-3xl md:text-4xl font-bold my-8 text-text-color'>Conclusion</h2>
                        <p className='text-lg md:text-xl leading-relaxed text-gray-700'>
                            History is full of examples in which Washington put its trust in Middle East tough-guy leaders to keep countries torn by religious and tribal divides in one piece. In Iraq, such a bet ended up costing thousands of US lives. But Trump is more optimistic.
                        </p>
                    </div>

                    <div className='border-t border-b border-gray-200 py-6 my-12'>
                        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                            <h3 className='text-lg font-semibold text-gray-800'>Share this article:</h3>
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

                    {/* <div className='flex items-center gap-4 p-6 bg-gray-50 rounded-lg mb-12'>
                        <div className='w-16 h-16 rounded-full overflow-hidden flex items-center'>
                            <Avatar >
                                <AvatarImage src="/images/homepage/author.webp" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <h4 className='font-bold text-gray-900'>Stephen Collinson</h4>
                            <p className='text-gray-600 text-sm'> 7 minute read</p>
                            <p className='text-gray-700 mt-1 text-sm'>Updated 5:01 AM EDT, Thu May 15, 2025</p>
                        </div>
                    </div> */}
                </article>
            </div>

            {/* Related News */}
            <div className='mb-20 flex flex-col gap-6'>
                <p className='font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-center'>
                    Related News
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
                                    <Button className='font-[400] font-inter bg-white text-black border border-zinc-400 shadow-lg'>Read More</Button>
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

export default Page;



