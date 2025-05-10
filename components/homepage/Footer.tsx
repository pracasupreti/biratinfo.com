import React from 'react'
import Image from 'next/image'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { Button } from '../ui/button'
import { UserRoundIcon } from 'lucide-react'

function Footer() {
    return (
        <div className='bg-[#008000] pb-10 w-full overflow-x-hidden'>
            <div className='flex flex-col md:flex-row justify-between items-center px-4 md:px-10 pt-10 gap-6'>
                <div className='w-[150px] h-[40px] md:w-[280px] md:h-[67px] relative'>
                    <Image
                        src={'/images/homepage/FooterLogo.png'}
                        alt=''
                        fill
                        objectFit='contain'
                    />
                </div>
                <div className='flex flex-wrap items-center justify-center gap-4'>
                    <FaFacebook size={40} color='white' />
                    <FaInstagram size={40} color='white' />
                    <Button className='bg-[#ca0900] font-jost font-[500] text-[15px]'>
                        Subscribe
                    </Button>
                    <Button className='flex items-center gap-1'>
                        <UserRoundIcon size={40} /> Sign In
                    </Button>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 px-4 md:px-0 text-center md:text-start'>
                <div className='text-white font-inter font-[400] text-[13px] flex flex-col gap-5 md:pl-28'>
                    <div className='flex flex-col'>
                        <span>Editor-in-Chief:</span>
                        <span>Maha Prasad Khatiwoda</span>
                    </div>
                    <div className='flex flex-col'>
                        <span>Chairman:</span>
                        <span>Prakash Thapa</span>
                    </div>
                </div>

                <div className='text-white font-inter font-[400] grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-x-30'>
                    <div className='flex flex-col gap-6'>
                        <p className='text-[20px]'>Contact Us</p>
                        <p className='text-[13px]'>Mahendrachowk</p>
                        <p className='text-[13px]'>Biratnagar-9</p>
                        <p className='text-[13px]'>Koshi Province,Nepal</p>
                        <p className='text-[13px]'>Hotline:+99-9852025735</p>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <p className='text-[20px]'>Useful Links</p>
                        <p className='text-[13px]'>Most mortgage</p>
                        <p className='text-[13px]'>Lenders would rather</p>
                        <p className='text-[13px]'>people didn’t pay off</p>
                        <p className='text-[13px]'>their mortages</p>
                        <p className='text-[13px]'>early.After all,that’s</p>
                    </div>
                    <div className='flex flex-col gap-6 md:mt-14'>
                        <p className='text-[13px]'>Most mortgage</p>
                        <p className='text-[13px]'>Lenders would rather</p>
                        <p className='text-[13px]'>people didn’t pay off</p>
                        <p className='text-[13px]'>their mortages</p>
                        <p className='text-[13px]'>early.After all,that’s</p>
                    </div>
                </div>

                <div className='md:pl-60 font-jost font-[600] text-[20px] text-white flex flex-col items-center md:items-start gap-3'>
                    <p>Download Apps</p>
                    <Image src={'/images/homepage/GooglePlay.png'} alt='' height={56} width={150} className='rounded-sm' />
                    <Image src={'/images/homepage/Appstore.png'} alt='' height={56} width={165} className='rounded-sm' />
                </div>
            </div>

            <div className='bg-[#239023] mt-10 flex items-center justify-center px-4 md:px-52 py-10 md:py-20 font-jost font-[500] text-white text-[15px] flex-col gap-1'>
                <p className='text-center max-w-6xl leading-relaxed'>
                    Most mortage lenders would rather people didn’t pay off their mortage early. After all, that’s how they make their money. Indeed, overpayment is positively discouraged and sometimes even penalized. What if there was a solution that solved the technology behind it, alongside the financing arrangements?
                </p>
                <div className='w-full h-0.5 bg-white' />
            </div>
        </div>
    )
}

export default Footer
