import React from 'react'
import Image from 'next/image'
import { MessageSquareIcon, TrendingUpIcon } from 'lucide-react'
import { FaDribbble, FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa'
import BottomBar from '@/components/author/BottomBar'
import Header from '@/components/enHomepage/Header'
import Footer from '@/components/enHomepage/Footer'


function page() {
    const Politics = [
        {
            description: 'Canva choose its generative AI tools by letting its employee try the all. It’s argument for consumption-based pricing ',
            imageUrl: '/images/homepage/PoliticsImage2.png'
        },
        {
            description: 'Should I tell the braless friend of a friend that her breasts wobble?',
            imageUrl: '/images/homepage/PoliticsImage3.png'
        },
        {
            description: 'The shies Rebecca Harding  has worn to death-and what she’ll buy next',
            imageUrl: '/images/homepage/PoliticsImage4.png'
        },
    ]
    const Economy = [
        {
            description: 'Pinecone’s new serverless architecture hopes to make the vector database more versatile',
            imageUrl: '/images/homepage/Economy2.png'
        },
        {
            description: 'Ready or not, here come the AI agents',
            imageUrl: '/images/homepage/Economy3.png'
        },
        {
            description: 'Hudi’s backers could have the missing piece in the push for data format unity',
            imageUrl: '/images/homepage/Economy1.png'
        },
        {
            description: 'Why using generative AI server to replace junior employee could backfire ',
            imageUrl: '/images/homepage/Economy4.png'
        },
    ]

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
        <div>
            <Header />
            <div className='flex flex-col gap-16 mb-10'>
                <div className='bg-[#eff5f5] h-[550px] flex justify-center items-center gap-80 relative'>
                    <div className='w-[319px] h-[319px] bg-[#d9d9d9] rounded-full '></div>
                    <div className='font-jost font-[400] w-[629px] flex flex-col gap-3'>
                        <p className='text-[96px] text-[#9e9e9e]'>Sandeep Thapa</p>
                        <p className='text-[#545657] text-[16px]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English.</p>
                        <div className='flex gap-6 absolute mt-60 ml-96'>
                            <div className='p-2 bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center border-2 border-black'><FaFacebookF size={20} /></div>
                            <div className='p-2 bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center border-2 border-black'><FaTwitter /></div>
                            <div className='p-2 bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center border-2 border-black'> <FaYoutube /></div>
                            <div className='p-2 bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center border-2 border-black'> <FaDribbble /></div>
                        </div>
                        <p className='text-[#545657] text-[16px]'>Total Post :12,394  |   Category : Politics </p>
                        <p className='text-[#545657] text-[16px]'>Writing Since : 13 April 2025,Monday</p>
                    </div>
                </div>
                <div>
                    {/* GRID1 */}
                    <div className='flex flex-col gap-16 pb-10'>
                        <div>
                            <div className='w-[90%] mx-auto h-[3px] bg-[#ebebeb]' />
                        </div>
                        <div className='md:flex-row flex flex-col px-20 md:px-60 gap-20'>
                            <div className='flex flex-col items-start gap-5 md:w-[673px] w-[373px]'>
                                <div className='md:w-[673px] md:h-[448px] w-[373px] h-[248px] bg-[url(/images/homepage/PoliticsImage1.png)] bg-cover bg-no-repeat bg-center' />
                                <p className='text-black font-ibm_plex_serif font-[700] text-[30px] '>How Liberty Mutual was able to jump into
                                    generative AI thanks to a clear data strategy
                                    and FinOps</p>
                                <p className='text-[#808080] font-roboto font-[500] text-[13px] flex items-center gap-x-2'>
                                    <span>TOM KRAZIT</span>
                                    <span>.</span>
                                    <span>FEB 18, 2025</span>
                                </p>
                            </div>
                            <div>
                                <div className='flex flex-col gap-y-12'>
                                    {Politics.map((items, index) =>
                                        <div key={index} className='flex gap-4 '>
                                            <div className='min-w-[309px] h-[174px] relative'>
                                                <Image
                                                    src={items.imageUrl}
                                                    alt=''
                                                    fill
                                                    objectFit='contain'
                                                />
                                            </div>
                                            <div className='flex flex-col gap-4'>
                                                <p className='text-black font-ibm_plex_serif font-[700] text-[20px] '>{items.description}</p>
                                                <p className='text-[#808080] font-roboto font-[500] text-[13px] flex items-center gap-x-2'>
                                                    <span>TOM KRAZIT</span>
                                                    <span>.</span>
                                                    <span>FEB 18, 2025</span>
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GRID2 */}
                    <div className='flex flex-col gap-16 pb-10'>
                        <div className=''>
                            <div className='w-[90%] mx-auto h-[3px] bg-[#ebebeb]' />
                        </div>
                        <div className='flex flex-col gap-20'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-24 mx-auto'>
                                {Economy.map((items, index) =>
                                    <div key={index} className='flex gap-4'>
                                        <div className='min-w-[318px] h-[165px] relative'>
                                            <Image
                                                src={items.imageUrl}
                                                alt=''
                                                fill
                                                objectFit='contain'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-4'>
                                            <p className='text-black font-ibm_plex_serif font-[700] text-[20px] max-w-[309px] max-h-[105px] '>{items.description}</p>
                                            <p className='text-[#808080] font-roboto font-[500] text-[13px] flex items-center gap-x-2'>
                                                <span>TOM KRAZIT</span>
                                                <span>.</span>
                                                <span>FEB 18, 2025</span>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* GRID3 */}
                    <div className='flex flex-col gap-16 pb-10 pt-10'>
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
                                        {items.index === 1 ? '' : <MessageSquareIcon size={16} stroke='#808080' />}
                                        {items.index === 1 ? '' : <p className='text-[#808080] font-inter font-[500] text-[13px]'>{items.comment}</p>}

                                        {items.index === 3 || items.index === 4 ? <TrendingUpIcon size={16} stroke='#808080' /> : ''}

                                    </div>
                                </div>
                            )}

                        </div>
                        <div>
                            <div className='w-[90%] mx-auto h-[3px] bg-[#ebebeb]' />
                        </div>
                    </div>
                </div>
                <div >
                    <BottomBar />

                </div>
            </div>
            <Footer />
        </div>

    )
}

export default page