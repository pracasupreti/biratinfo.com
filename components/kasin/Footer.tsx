import React from 'react'
import Image from 'next/image'
import { MailIcon, MapPinIcon, PhoneCallIcon } from 'lucide-react'

function Footer1() {
    return (
        <div className='w-full px-20 flex flex-col gap-20 py-10 '>
            <div className='flex flex-col gap-14'>
                <div className='flex items-center justify-between'>
                    <p className='font-inter font-[700] text-[22px]'>विराट सूचना प्रविधि प्रा. लि.</p>
                    <div className='flex gap-4 '>
                        <div className='w-[42px] h-[42px] bg-[#d9d9d9] rounded-full flex items-center justify-center'><Image src={'/images/kasinHomepage/facebook.svg'} alt='facebook icon' width={25} height={25} /></div>
                        <div className='w-[42px] h-[42px] bg-[#d9d9d9] rounded-full flex items-center justify-center'><Image src={'/images/kasinHomepage/twitter.svg'} alt='facebook icon' width={25} height={25} /></div>
                        <div className='w-[42px] h-[42px] bg-[#d9d9d9] rounded-full flex items-center justify-center'><Image src={'/images/kasinHomepage/youtube.svg'} alt='facebook icon' width={25} height={25} /></div>
                        <div className='w-[42px] h-[42px] bg-[#d9d9d9] rounded-full flex items-center justify-center'><Image src={'/images/kasinHomepage/instagram.svg'} alt='facebook icon' width={25} height={25} /></div>
                    </div>
                </div>
                <div className='grid grid-cols-3' >
                    <div className='flex flex-col gap-2'>
                        <p className='font-inter font-[700] text-[22px]'>हाम्रो टिम</p>
                        <p className='font-inter font-[400] text-[20px]'>अध्यक्ष तथा निर्देशक : सुधीर नेपाल</p>
                        <p className='font-inter font-[400] text-[20px]'>प्रमुख प्राविधिक अधिकृत : प्रकाश शर्मा</p>
                        <p className='font-inter font-[400] text-[20px]'>खाता : निरन्जन थापा </p>
                        <p className='font-inter font-[400] text-[20px]'>कार्यकारी सम्पादक : राम प्रसाद पौडेल</p>
                        <p className='font-inter font-[400] text-[20px]'>जनसम्पर्क अधिकृत : श्रीशा शर्मा</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-col gap-2'>
                            <p className='font-inter font-[700] text-[22px]'>सम्पर्क</p>
                            <div className='font-inter font-[400] text-[20px] flex items-center gap-2'>
                                <div className='w-[30px] h-[30px] bg-white rounded-full'></div>
                                <p>सूचना विभाग दर्ता नं. १२३-०८१/८२</p>
                            </div>
                            <div className='font-inter font-[400] text-[20px] flex items-center gap-2'>
                                <div className='w-[30px] h-[30px] bg-[#d9d9d9] rounded-full flex items-center justify-center'><MapPinIcon size={15} /></div>
                                <p>कमलपोखरी, काठमाडौं, नेपाल</p>
                            </div>
                            <div className='font-inter font-[400] text-[20px] flex items-center gap-2'>
                                <div className='w-[30px] h-[30px] bg-[#d9d9d9] rounded-full flex items-center justify-center'><PhoneCallIcon size={15} /></div>
                                <p>+९७७-१-१२३४५६७८</p>
                            </div>
                            <div className='font-inter font-[400] text-[20px] flex items-center gap-2'>
                                <div className='w-[30px] h-[30px] bg-[#d9d9d9] rounded-full flex items-center justify-center'><MailIcon size={15} /></div>
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