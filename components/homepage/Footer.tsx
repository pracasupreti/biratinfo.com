'use client'
import React from 'react'
import Image from 'next/image'
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa'

function Footer() {
    return (
        <div className='w-full bg-[#008000] flex flex-col gap-8 pt-4 md:pt-6 lg:pt-10'>
            <div className='max-w-screen-xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4'>
                {/* FIRST GRID */}
                <div className='flex flex-col sm:flex-row gap-4 lg:gap-8'>
                    <div className='w-[150px] h-[40px] md:w-[280px] md:h-[67px] relative mx-auto sm:mx-0'>
                        <Image
                            src='/images/homepage/FooterLogo.png'
                            alt='Footer Logo'
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div className='flex flex-col gap-4 text-white font-inter text-sm items-center text-center md:items-start md:text-start'>
                        <div className='flex flex-col gap-1'>
                            <p>Editor-in-Chief: Maha Prasad Khatiwoda</p>
                            <p>Chairman: Prakash Thapa</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p>Mahendrachowk</p>
                            <p>Biratnagar-9</p>
                            <p>Koshi Province, Nepal</p>
                            <p>Hotline: +99-9852025735</p>
                        </div>
                    </div>
                </div>

                {/* SECOND GRID */}
                <div className='flex justify-center md:ml-24'>
                    <div className='flex flex-col gap-2 text-center md:text-left'>
                        <p className='text-white font-semibold text-lg'>Quick Links</p>
                        <p className='text-white text-sm'>Terms and Conditions</p>
                        <p className='text-white text-sm'>Privacy Policy</p>
                    </div>
                </div>

                {/* THIRD GRID */}
                <div className='flex flex-col items-center gap-6 md:col-span-3 lg:col-span-1'>
                    <div className='flex flex-col items-center gap-2'>
                        <p className='text-white font-semibold text-lg'>Connect With Us</p>
                        <div className='flex gap-4'>
                            {[FaFacebookF, FaTwitter, FaYoutube].map((Icon, i) => (
                                <div
                                    key={i}
                                    className='h-10 w-10 bg-white rounded-full flex items-center justify-center hover:bg-black transition duration-300 ease-in group cursor-pointer'
                                >
                                    <Icon size={20} className='group-hover:text-white text-black' />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='text-white text-center font-jost font-semibold text-lg flex flex-col gap-2'>
                        <p>Download Apps</p>
                        <Image
                            src='/images/homepage/GooglePlay.png'
                            alt='Google Play'
                            height={56}
                            width={150}
                            className='rounded-sm mx-auto'
                        />
                        <Image
                            src='/images/homepage/Appstore.png'
                            alt='App Store'
                            height={56}
                            width={165}
                            className='rounded-sm mx-auto'
                        />
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className='w-full bg-[#239023]'>
                <div className='max-w-xl mx-auto flex flex-col justify-center items-center text-center py-6 text-white font-inter text-sm font-semibold px-4'>
                    <p>© 2025 Copyright BiratInfo News Network. All rights reserved.</p>
                    <p>Design & Developed by:</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
