import React from 'react'
import Image from 'next/image'
import { MessageSquareIcon, TrendingUpIcon } from 'lucide-react'

function Employment() {
    const employment = [
        {
            index: 1,
            miniTitle: 'National',
            title: 'Cheapest destinations Aussies are escaping to this winter',
            description: 'As purse string tighten, Aussies looking a for a summer escape in the cooler months are opting to travel to these destinations where they can get the best bang for buck',
            imageUrl: '/images/homepage/Employment1.png',
            comment: 6
        },
        {
            index: 2,
            miniTitle: 'Careers',
            title: 'Revealed: The best months to look for a new job ',
            description: 'As purse string tighten, Aussies looking a for a summer escape in the cooler months are opting to travel to these destinations where they can get the best bang for buck',
            imageUrl: '/images/homepage/Employment2.png',
            comment: 6
        },
        {
            index: 3,
            miniTitle: 'Federal Election',
            title: "‘Breaking point’:1m Aussies take extra steps to make fast cash'",
            description: 'As purse string tighten, Aussies looking a for a summer escape in the cooler months are opting to travel to these destinations where they can get the best bang for buck',
            imageUrl: '/images/homepage/Employment3.png',
            comment: 303
        },
        {
            index: 4,
            miniTitle: 'Federal Electoin',
            title: 'Dutton backflips on popular tax break promise for EV  drivers ',
            description: 'As purse string tighten, Aussies looking a for a summer escape in the cooler months are opting to travel to these destinations where they can get the best bang for buck',
            imageUrl: '/images/homepage/Employment4.png',
            comment: 111
        }
    ]
    return (
        <div className='flex flex-col gap-16 pb-10'>
            <div className='flex flex-col gap-2'>
                <p className='text-[#939393] font-orienta text-[20px] pl-20'>Employment</p>
                <div className='w-full h-[3px] bg-[#ebebeb]' />
            </div>
            <div className='flex items-center justify-between px-60'>
                {employment.map((items, index) =>
                    <div className='flex flex-col gap-3' key={index}>
                        <div className='w-[322px] h-[183px] relative '>
                            <Image
                                src={items.imageUrl}
                                alt=''
                                fill
                                objectFit='contain'
                            />
                        </div>
                        <div className='flex gap-2'>
                            {items.index === 3 ? <span className='font-roboto font-[600] text-[13px] bg-black text-white px-2 rounded-lg'>EXCLUSIVE</span> : ''}
                            <p className='text-[#808080] font-roboto font-[600] text-[13px]'>{items.miniTitle}</p>
                        </div>
                        <p className='font-ibm_plex_serif font-[500] text-[19px] max-w-[314px] max-h-[54px]'>{items.title}</p>
                        <p className='text-[#808080] font-inter font-[500] text-[13px] max-w-[308px] max-h-[96px]'>{items.description}</p>
                        <div className='flex items-center gap-2'>
                            <MessageSquareIcon size={16} stroke='#808080' />
                            <p className='text-[#808080] font-inter font-[500] text-[13px]'>6</p>
                            {items.index === 3 || items.index === 4 ? <TrendingUpIcon size={16} stroke='#808080' /> : ''}

                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Employment