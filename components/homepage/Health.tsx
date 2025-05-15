import React from 'react'
import Image from 'next/image'
import { MessageSquareIcon, TrendingUpIcon } from 'lucide-react'

const Health = () => {
    const employment = [
        {
            index: 1,
            miniTitle: 'Fitness',
            title: 'Walking faster may reduce your risk of abnormal heart rhythms, study finds',
            description:
                'That’s according to a large new study published Tuesday in the journal Heart, which found average or brisk walking paces were associated with 35% and 43% lower risks of all heart rhythm abnormalities.',
            imageUrl: '/images/homepage/HealthImage1.webp',
            comment: 6
        },
        {
            index: 2,
            miniTitle: 'Food',
            title: 'Rising food prices in US getting in way of healthy eating, survey of Americans finds',
            description:
                'Ninety percent of adults in the United States say the price of healthy food has risen over the past few years, and over two-thirds (69%) say higher food prices are making it difficult to eat a healthy diet.',
            imageUrl: '/images/homepage/HealthImage2.webp',
            comment: 6
        },
        {
            index: 3,
            miniTitle: 'Sleep',
            title: 'Falling asleep to your favorite show doesn’t have to ruin your sleep, experts say',
            description:
                'But many people find that it helps them fall asleep if they listen to something – audiobooks, music, podcasts or TV shows. A 2018 study found that more than half of people with sleep disturbances use music as a sleep aid.',
            imageUrl: '/images/homepage/HealthImage3.webp',
            comment: 303
        },
        {
            index: 4,
            miniTitle: 'Mindfulness',
            title: 'You can’t find this prescription in a pharmacy, but it might be just the treatment you need',
            description:
                'Whether this trend results from an epidemic of loneliness, which leaves people wanting for company, or a century of solitude, in which individuals prioritize solo time, the fact remains that more of us are on our own more often.',
            imageUrl: '/images/homepage/HealthImage4.webp',
            comment: 111
        }
    ]

    return (
        <section className='flex flex-col gap-12 md:gap-16 pb-20 px-4 sm:px-8 md:px-20'>
            <div className='flex flex-col gap-2'>
                <p className='text-[#939393] font-orienta text-[18px] md:text-[20px] font-[700]'>Health</p>
                <div className='w-full h-[2px] bg-[#ebebeb]' />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8'>
                {employment.map((item) => (
                    <div className='flex flex-col gap-3' key={item.index}>
                        {/* Image */}
                        <div className='w-full aspect-[16/9] relative'>
                            <Image
                                src={item.imageUrl}
                                alt='employment image'
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes='(max-width: 768px) 100vw, 322px'
                                className='rounded-md'
                            />
                        </div>

                        <div className='flex gap-2 ml-2 md:ml-0'>
                            {item.index === 3 && (
                                <span className='font-roboto font-semibold text-[13px] bg-black text-white px-2 rounded-lg'>
                                    EXCLUSIVE
                                </span>
                            )}
                            <p className='text-[#808080] font-roboto font-semibold text-[13px]'>{item.miniTitle}</p>
                        </div>

                        <h3 className='font-ibm_plex_serif font-medium text-[18px] leading-snug ml-2 md:ml-0 text-text-color'>
                            {item.title}
                        </h3>

                        <p className='text-[#808080] font-inter text-[13px] ml-2 md:ml-0'>{item.description}</p>

                        <div className='flex items-center gap-2 ml-2 md:ml-0' >
                            <MessageSquareIcon size={16} stroke='#808080' />
                            <p className='text-[#808080] font-inter text-[13px]'>{item.comment}</p>
                            {(item.index === 3 || item.index === 4) && <TrendingUpIcon size={16} stroke='#808080' />}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Health
