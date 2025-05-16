import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MailIcon, MapPinIcon, PhoneCallIcon } from 'lucide-react'

function Footer1() {
    return (
        <div className='w-full px-4 lg:px-20 md:px-6 py-12 bg-[#F9F8F8]'>
            <div className='max-w-7xl mx-auto flex flex-col gap-12'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left'>
                    <h2 className='text-2xl font-bold text-gray-900'>BIRAT Informatics Pvt. Ltd.</h2>
                    <div className='flex gap-4 justify-center'>
                        {['facebook', 'twitter', 'youtube', 'instagram'].map((icon) => (
                            <Link
                                key={icon}
                                href="#"
                                className='w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-100 transition-colors'
                                aria-label={`Follow us on ${icon}`}
                            >
                                <Image
                                    src={`/images/kasinHomepage/${icon}.svg`}
                                    alt={`${icon} icon`}
                                    width={20}
                                    height={20}
                                    className='hover:opacity-80 transition-opacity'
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12'>
                    {/* Our Team */}
                    <div className='space-y-4 text-center md:text-left'>
                        <h3 className='text-lg font-semibold text-gray-900'>Our Team</h3>
                        <ul className='space-y-2 text-gray-600'>
                            {[
                                'Chairman & Director : Sudhir Nepal',
                                'CTO : Prakash Sharma',
                                'Account : Niranjan Thapa',
                                'Executive Editor : Ram Prasad Poudel',
                                'PRO : Srisha Sharma'
                            ].map((item, index) => (
                                <li key={index} className='text-sm md:text-base'>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className='space-y-4'>
                        <h3 className='text-lg font-semibold text-gray-900 text-center md:text-left'>Contact</h3>
                        <ul className='space-y-3 text-gray-600 flex flex-col items-center md:items-start'>
                            <li className='flex items-start gap-3'>
                                <div className='w-6 h-6 bg-[#F9F8F8] rounded-full flex-shrink-0'></div>
                                <p className='text-sm md:text-base text-center md:text-left'>Suchana Bibhag Darta # 123-081/82</p>
                            </li>
                            <li className='flex items-center gap-3'>
                                <div className='w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0'>
                                    <MapPinIcon size={14} className='text-gray-600' />
                                </div>
                                <p className='text-sm md:text-base text-center md:text-left'>Kamalpokhari, Kathmandu, Nepal</p>
                            </li>
                            <li className='flex items-center gap-3'>
                                <div className='w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0'>
                                    <PhoneCallIcon size={14} className='text-gray-600' />
                                </div>
                                <p className='text-sm md:text-base text-center md:text-left'>+977-1-12345678</p>
                            </li>
                            <li className='flex items-center gap-3'>
                                <div className='w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0'>
                                    <MailIcon size={14} className='text-gray-600' />
                                </div>
                                <p className='text-sm md:text-base text-center md:text-left'>info@biratinfo.com</p>
                            </li>
                        </ul>
                    </div>

                    {/* App Downloads */}
                    <div className='space-y-4 flex flex-col items-center md:items-start'>
                        <h3 className='text-lg font-semibold text-gray-900'>Download Our App</h3>
                        <div className='flex flex-col gap-3'>
                            <Link href="#" className='hover:opacity-90 transition-opacity'>
                                <Image
                                    src='/images/homepage/GooglePlay.png'
                                    alt='Get it on Google Play'
                                    width={180}
                                    height={54}
                                    className='rounded-md'
                                />
                            </Link>
                            <Link href="#" className='hover:opacity-90 transition-opacity'>
                                <Image
                                    src='/images/homepage/AppStore.png'
                                    alt='Download on the App Store'
                                    width={180}
                                    height={54}
                                    className='rounded-md'
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className='pt-6 border-t border-gray-300'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500 text-center md:text-left'>
                        <p>Copyright © 2025 BIRAT Informatics Pvt. Ltd. | A Product of SRIYOG Consulting</p>
                        <div className='flex flex-wrap justify-center gap-3 md:gap-4'>
                            <Link href="#" className='hover:text-gray-700 transition-colors'>Terms & Conditions</Link>
                            <Link href="#" className='hover:text-gray-700 transition-colors'>Privacy Policy</Link>
                            <Link href="#" className='hover:text-gray-700 transition-colors'>Advertise</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer1