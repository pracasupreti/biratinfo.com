import React from 'react'
import Image from 'next/image'
import { MailIcon, MapPinIcon, PhoneCallIcon } from 'lucide-react'

function Footer1() {
    return (
        <div className='w-full px-4 lg:px-20 md:px-6 flex flex-col gap-10 md:gap-20 py-10 bg-[#F9F8F8]'>
            <div className='flex flex-col gap-10 md:gap-14'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 text-center md:text-left'>
                    <p className='font-inter font-[700] text-[22px]'>BIRAT Informatics Pvt. Ltd.</p>
                    <div className='flex gap-4 justify-center md:justify-end'>
                        {['facebook', 'twitter', 'youtube', 'instagram'].map((icon) => (
                            <div key={icon} className='w-[42px] h-[42px] bg-[#d9d9d9] rounded-full flex items-center justify-center'>
                                <Image src={`/images/kasinHomepage/${icon}.svg`} alt={`${icon} icon`} width={25} height={25} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                    <div className='flex flex-col gap-2 text-center md:text-left'>
                        <p className='font-inter font-[700] text-[22px]'>Our Team</p>
                        <p className='font-inter font-[400] text-xs sm:text-sm md:text-base lg:text-lg'>Chairman & Director : Sudhir Nepal</p>
                        <p className='font-inter font-[400] text-xs sm:text-sm md:text-base lg:text-lg'>CTO : Prakash Sharma</p>
                        <p className='font-inter font-[400] text-xs sm:text-sm md:text-base lg:text-lg'>Account : Niranjan Thapa</p>
                        <p className='font-inter font-[400] text-xs sm:text-sm md:text-base lg:text-lg'>Executive Editor : Ram Prasad Poudel</p>
                        <p className='font-inter font-[400] text-xs sm:text-sm md:text-base lg:text-lg'>PRO : Srisha Sharma</p>
                    </div>

                    <div className='flex flex-col items-center md:text-start text-center'>
                        <div className='flex flex-col gap-2 items-center md:items-start'>
                            <p className='font-inter font-[700] text-[22px] text-center md:text-left'>Contact</p>

                            <div className='font-inter font-[400] text-xs sm:text-sm md:text-base lg:text-lg flex items-center gap-2'>
                                <div className='w-[30px] h-[30px] bg-[#F9F8F8] rounded-full' />
                                <p>Suchana Bibhag Darta # 123-081/82</p>
                            </div>

                            <div className='font-inter font-[400] text-xs sm:text-sm md:text-base lg:text-lg flex items-center gap-2'>
                                <div className='w-[30px] h-[30px] bg-[#d9d9d9] rounded-full flex items-center justify-center'>
                                    <MapPinIcon size={15} />
                                </div>
                                <p>Kamalpokhari, Kathmandu, Nepal</p>
                            </div>

                            <div className='font-inter font-[400] text-xs sm:text-sm md:text-base lg:text-lg flex items-center gap-2'>
                                <div className='w-[30px] h-[30px] bg-[#d9d9d9] rounded-full flex items-center justify-center'>
                                    <PhoneCallIcon size={15} />
                                </div>
                                <p>+977-1-12345678</p>
                            </div>

                            <div className='font-inter font-[400] text-xs sm:text-sm md:text-base lg:text-lg flex items-center gap-2'>
                                <div className='w-[30px] h-[30px] bg-[#d9d9d9] rounded-full flex items-center justify-center'>
                                    <MailIcon size={15} />
                                </div>
                                <p>info@biratinfo.com</p>
                            </div>
                        </div>
                    </div>

                    <div className='text-white text-center font-jost font-semibold text-lg flex flex-col gap-4'>
                        <Image
                            src='/images/homepage/GooglePlay.png'
                            alt='Google Play'
                            height={56}
                            width={200}
                            className='rounded-sm mx-auto'
                        />
                        <Image
                            src='/images/homepage/AppStore.png'
                            alt='App Store'
                            height={56}
                            width={205}
                            className='rounded-sm mx-auto'
                        />
                    </div>
                </div>
            </div>

            {/* COPYRIGHT */}
            <div className='flex flex-col gap-2'>
                <div className='w-full h-0.5 bg-black' />
                <div className='flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left font-inter font-[400] text-[16px]'>
                    <p>Copyright 2025 BIRAT Informatics Pvt. Ltd.&nbsp;&nbsp;|&nbsp;&nbsp;A Product of SRIYOG Consulting</p>
                    <p>Terms & Conditions&nbsp;&nbsp;|&nbsp;&nbsp;Privacy Policy&nbsp;&nbsp;|&nbsp;&nbsp;Advertise</p>
                </div>
            </div>
        </div>
    )
}

export default Footer1
