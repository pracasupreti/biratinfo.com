import React from 'react'
import Image from 'next/image'
import { MessageSquareIcon, TrendingUpIcon } from 'lucide-react'

const Employment = () => {
    const employment = [
        {
            index: 1,
            miniTitle: 'National',
            title: 'Cheapest destinations Aussies are escaping to this winter',
            description:
                'As purse string tighten, Aussies looking a for a summer escape in the cooler months are opting to travel to these destinations where they can get the best bang for buck',
            imageUrl: '/images/homepage/Employment1.png',
            comment: 6
        },
        {
            index: 2,
            miniTitle: 'Careers',
            title: 'Revealed: The best months to look for a new job is revealed',
            description:
                'As purse string tighten, Aussies looking a for a summer escape in the cooler months are opting to travel to these destinations where they can get the best bang for buck',
            imageUrl: '/images/homepage/Employment2.png',
            comment: 6
        },
        {
            index: 3,
            miniTitle: 'Federal Election',
            title: '‘Breaking point’: 1m Aussies take extra steps to make fast cash',
            description:
                'As purse string tighten, Aussies looking a for a summer escape in the cooler months are opting to travel to these destinations where they can get the best bang for buck',
            imageUrl: '/images/homepage/Employment3.png',
            comment: 303
        },
        {
            index: 4,
            miniTitle: 'Federal Election',
            title: 'Dutton backflips on popular tax break promise for EV drivers',
            description:
                'As purse string tighten, Aussies looking a for a summer escape in the cooler months are opting to travel to these destinations where they can get the best bang for buck',
            imageUrl: '/images/homepage/Employment4.png',
            comment: 111
        }
    ]

    return (
        <section className='flex flex-col gap-12 md:gap-16 pb-10 px-4 sm:px-8 md:px-20'>
            {/* Header */}
            <div className='flex flex-col gap-2'>
                <p className='text-[#939393] font-orienta text-[18px] md:text-[20px]'>Employment</p>
                <div className='w-full h-[2px] bg-[#ebebeb]' />
            </div>

            {/* Grid of Articles */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8'>
                {employment.map((item) => (
                    <div className='flex flex-col gap-3' key={item.index}>
                        {/* Image */}
                        <div className='w-full aspect-[16/9] relative'>
                            <Image
                                src={item.imageUrl}
                                alt='employment image'
                                fill
                                style={{ objectFit: 'contain' }}
                                sizes='(max-width: 768px) 100vw, 322px'
                                className='rounded-md'
                            />
                        </div>

                        {/* Label and Category */}
                        <div className='flex gap-2 ml-2 md:ml-0'>
                            {item.index === 3 && (
                                <span className='font-roboto font-semibold text-[13px] bg-black text-white px-2 rounded-lg'>
                                    EXCLUSIVE
                                </span>
                            )}
                            <p className='text-[#808080] font-roboto font-semibold text-[13px]'>{item.miniTitle}</p>
                        </div>

                        {/* Title */}
                        <h3 className='font-ibm_plex_serif font-medium text-[18px] leading-snug ml-2 md:ml-0'>
                            {item.title}
                        </h3>

                        {/* Description */}
                        <p className='text-[#808080] font-inter text-[13px] ml-2 md:ml-0'>{item.description}</p>

                        {/* Footer */}
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

export default Employment
