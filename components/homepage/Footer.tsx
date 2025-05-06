import React from 'react'
import Image from 'next/image'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { Button } from '../ui/button'
import { UserRoundIcon } from 'lucide-react'

function Footer() {
    return (
        <div className=' bg-[#008000] pb-10'>
            <div className='flex justify-between items-center px-10 pt-10'>
                <div className='md:w-[280px] md:h-[67px] w-[150px] h-[40px] relative'>
                    <Image
                        src={'/images/homepage/FooterLogo.png'}
                        alt=''
                        fill
                        objectFit='contain'
                    />
                </div>
                <div className='flex items-center gap-4'>
                    <FaFacebook size={40} color='white' />
                    <FaInstagram size={40} color='white' />
                    <Button className='bg-[#ca0900] font-jost font-[500] text-[15px]'>Subscribe</Button>
                    <Button><UserRoundIcon size={40} /> Sign In</Button>
                </div>
            </div>
            {/* GRID VIEW */}
            <div className='grid grid-cols-3 items-center justify-center pt-10'>
                <div className='text-white font-inter font-[400] text-[13px] flex flex-col gap-5 pl-28'>
                    <div className='flex flex-col'>
                        <span>Editor-in-Chief:</span>
                        <span>Maha Prasad Khatiwoda</span>
                    </div>
                    <div className='flex flex-col'>
                        <span>Chairman:</span>
                        <span>Prakash Thapa</span>
                    </div>
                </div>
                <div className='text-white font-inter font-[400] grid grid-cols-3 gap-x-30'>
                    <div className='flex flex-col gap-6'>
                        <p className='text-[20px]'>Contact Us</p>
                        <p className='text-[13px]'>Mahendrachowk</p>
                        <p className='text-[13px]'>Biratnagar-9</p>
                        <p className='text-[13px]'>Koshi Province,Nepal</p>
                        <p className='text-[13px]'>Hotline:+99-
                            9852025735</p>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <p className='text-[20px]'>Useful Links</p>
                        <p className='text-[13px]'>Most mortgage</p>
                        <p className='text-[13px]'>Lenders would rather</p>
                        <p className='text-[13px]'>people didn’t pay off</p>
                        <p className='text-[13px]'>their mortages</p>
                        <p className='text-[13px]'>early.After all,that’s</p>
                    </div>
                    <div className='flex flex-col gap-6 pt-13'>
                        <p className='text-[13px]'>Most mortgage</p>
                        <p className='text-[13px]'>Lenders would rather</p>
                        <p className='text-[13px]'>people didn’t pay off</p>
                        <p className='text-[13px]'>their mortages</p>
                        <p className='text-[13px]'>early.After all,that’s</p>
                    </div>
                </div>
                <div className='pl-60 font-jost font-[600] text-[20px] text-white flex flex-col gap-3'>
                    <p>Download Apps</p>
                    <Image src={'/images/homepage/AppStore.png'} alt='' height={56} width={150} />
                    <Image src={'/images/homepage/AppStore.png'} alt='' height={56} width={165} />
                </div>
            </div>
            <div className='h-[164px] bg-[#239023] mt-10 flex items-center font-jost font-[500] text-white text-[15px]'>
                <p className='px-52 text-center border-b-2 mx-4'>
                    Most mortage lenders would rather people didn’t pay off their mortage early.After all,that’s how they make their money.Indeed,overpayment is positively discouraged and sometimes even penalizes. What if there was a solution that solved the technology behind it, alongside the financing asrrangements?
                </p>

            </div>

        </div>
    )
}

export default Footer