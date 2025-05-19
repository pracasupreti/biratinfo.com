import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MailIcon, MapPinIcon, PhoneCallIcon } from 'lucide-react'

function Footer() {
    return (
        <div className='w-full px-4 lg:px-20 md:px-6 py-12 bg-[#D9D9D9]'>
            <div className='max-w-7xl mx-auto flex flex-col gap-12'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left'>
                    <h2 className='text-2xl font-bold text-gray-900'>विराट इन्फर्म्याटिक्स प्रा. लि.</h2>
                    <div className='flex gap-4 justify-center'>
                        {['facebook', 'twitter', 'youtube', 'instagram'].map((icon) => (
                            <Link
                                key={icon}
                                href="#"
                                className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-300 transition-colors'
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
                        <h3 className='text-lg font-semibold text-gray-900'>हाम्रो टिम</h3>
                        <ul className='space-y-2 text-gray-600'>
                            {[
                                'अध्यक्ष तथा निर्देशक : सुधीर नेपाल',
                                'प्रमुख प्राविधिक अधिकृत : प्रकाश शर्मा',
                                'खाता : निरन्जन थापा',
                                'कार्यकारी सम्पादक : राम प्रसाद पौडेल',
                                'जनसम्पर्क अधिकृत : श्रीशा शर्मा'
                            ].map((item, index) => (
                                <li key={index} className='text-base'>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className='space-y-4'>
                        <h3 className='text-lg font-semibold text-gray-900 text-center md:text-left'>सम्पर्क</h3>
                        <ul className='space-y-3 text-gray-600 flex flex-col items-center md:items-start'>
                            <li className='flex items-start gap-3'>
                                <div className='w-6 h-6 bg-[#D9D9D9] rounded-full flex-shrink-0'></div>
                                <p className='text-base text-center md:text-left'>सूचना विभाग दर्ता नं. १२३-०८१/८२</p>
                            </li>
                            <li className='flex items-center gap-3'>
                                <div className='w-6 h-6 bg-[#d9d9d9] rounded-full flex items-center justify-center flex-shrink-0'>
                                    <MapPinIcon size={14} className='text-gray-600' />
                                </div>
                                <p className='text-base text-center md:text-left'>कमलपोखरी, काठमाडौं, नेपाल</p>
                            </li>
                            <li className='flex items-center gap-3'>
                                <div className='w-6 h-6 bg-[#d9d9d9] rounded-full flex items-center justify-center flex-shrink-0'>
                                    <PhoneCallIcon size={14} className='text-gray-600' />
                                </div>
                                <p className='text-base text-center md:text-left'>+९७७-१-१२३४५६७८</p>
                            </li>
                            <li className='flex items-center gap-3'>
                                <div className='w-6 h-6 bg-[#d9d9d9] rounded-full flex items-center justify-center flex-shrink-0'>
                                    <MailIcon size={14} className='text-gray-600' />
                                </div>
                                <p className='text-base text-center md:text-left'>info@biratinfo.com</p>
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
                                    width={200}
                                    height={56}
                                    className='rounded-sm'
                                />
                            </Link>
                            <Link href="#" className='hover:opacity-90 transition-opacity'>
                                <Image
                                    src='/images/homepage/AppStore.png'
                                    alt='Download on the App Store'
                                    width={205}
                                    height={56}
                                    className='rounded-sm'
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className='pt-6 border-t-[0.3px] border-[#444444]'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500 text-center md:text-left'>
                        <div className='flex gap-3 md:flex-row flex-col'>
                            <p className='text-[#444444]'>Copyright © 2025 BIRAT Informatics Pvt. Ltd. | </p>
                            <p className='text-[#444444]'> A Product of SRIYOG Consulting</p>
                        </div>
                        <div className='flex flex-wrap justify-center gap-3 md:gap-4 text-[#444444]'>
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

export default Footer