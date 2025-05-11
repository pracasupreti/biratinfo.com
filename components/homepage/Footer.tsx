import React from 'react'
import Image from 'next/image'

function Footer1() {
    return (
        <div className='w-full px-20 flex flex-col gap-20 py-10'>
            <div className='flex flex-col gap-14'>
                <div className='flex items-center justify-between'>
                    <p className='font-inter font-[700] text-[22px]'>BIRAT Informaics Pvt.Ltd.</p>
                    <div className='flex gap-4 '>
                        <div className='w-[42px] h-[42px] bg-[#d9d9d9] rounded-full'></div>
                        <div className='w-[42px] h-[42px] bg-[#d9d9d9] rounded-full'></div>
                        <div className='w-[42px] h-[42px] bg-[#d9d9d9] rounded-full'></div>
                        <div className='w-[42px] h-[42px] bg-[#d9d9d9] rounded-full'></div>
                    </div>
                </div>
                <div className='grid grid-cols-3' >
                    <div className='flex flex-col gap-2'>
                        <p className='font-inter font-[700] text-[22px]'>Our Team</p>
                        <p className='font-inter font-[400] text-[20px]'>Chairman & Director : Sudhir Nepal</p>
                        <p className='font-inter font-[400] text-[20px]'>CTO : Prakash Sharma</p>
                        <p className='font-inter font-[400] text-[20px]'>Account : Niranjan Thapa </p>
                        <p className='font-inter font-[400] text-[20px]'>Executive Editor : Ram Prasad Poudel</p>
                        <p className='font-inter font-[400] text-[20px]'>PRO : Srisha Sharma</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-col gap-2'>
                            <p className='font-inter font-[700] text-[22px]'>Contact</p>
                            <div className='font-inter font-[400] text-[20px] flex items-center gap-2'>
                                <div className='w-[30px] h-[30px] bg-white rounded-full'></div>
                                <p>Suchana Bibhag Darta # 123-081/82</p>
                            </div>
                            <div className='font-inter font-[400] text-[20px] flex items-center gap-2'>
                                <div className='w-[30px] h-[30px] bg-[#d9d9d9] rounded-full'></div>
                                <p>Kamalpokhari, Kathmandu, Nepal </p>
                            </div>
                            <div className='font-inter font-[400] text-[20px] flex items-center gap-2'>
                                <div className='w-[30px] h-[30px] bg-[#d9d9d9] rounded-full'></div>
                                <p>+977-1-12345678</p>
                            </div>
                            <div className='font-inter font-[400] text-[20px] flex items-center gap-2'>
                                <div className='w-[30px] h-[30px] bg-[#d9d9d9] rounded-full'></div>
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
                            src='/images/homepage/Appstore.png'
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
                <div className='flex justify-between items-center font-inter font-[400] text-[18px]'>
                    <p>Copyright 2025 BIRAT Informatics Pvt. Ltd.&nbsp;&nbsp;|&nbsp;&nbsp;A Product of SRIYOG Consulting</p>
                    <p>Terms & Conditions&nbsp;&nbsp;|&nbsp;&nbsp;Privacy Policy&nbsp;&nbsp;|&nbsp;&nbsp;Advertise</p>

                </div>
            </div>


        </div>
    )
}

export default Footer1