'use client'
import { CalendarDaysIcon, HomeIcon, X } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import MobileNav from '../MobileNav';

function Header() {
    const nav = [
        { name: <HomeIcon />, path: "/kasin" },
        // { name: "ताजा समाचार", path: "/politics" },
        // { name: "समाचार", path: "/society" },
        { name: "राजनीति", path: "/startups" },
        { name: "प्रबिधि", path: "/economy" },
        { name: "साहित्य", path: "/tourism" },
        { name: "अर्थ", path: "/employment" },
        { name: "सम्पादकीय ", path: "/sports" },
        { name: "बिचार", path: "/world" },
        { name: "प्रदेश", path: "/health" },
        { name: "खेलकुद", path: "/agriculture" },
        { name: "रोजगार", path: "/entertainment" },
        { name: "मनोरंजन", path: "/markeWorldt" },
        { name: "सुरक्षा", path: "/markeWorldt" },
        { name: "अन्य", path: "/markeWorldt" }
    ];

    const pathname = usePathname();

    return (
        <header className='pt-3 md:pt-6'>
            {/* TOPBAR */}
            <div className='md:flex md:flex-col hidden'>
                <div className='w-full py-1.5 bg-text-color flex flex-col sm:flex-row items-center justify-between px-3 md:px-6 lg:px-12 xl:px-24 text-white'>
                    <p className='text-sm font-alata text-center sm:text-left'>
                        आज को ताजा खबर
                    </p>
                    <p className='text-sm font-alata text-center sm:text-right flex gap-2 items-center'>
                        <CalendarDaysIcon size={20} />
                        २८ बैशाख २०८२, आईतवार
                    </p>
                </div>

                <div className='flex flex-col md:flex-row items-center justify-between w-full px-3 md:px-9 lg:px-12 xl:px-24 pt-2 gap-4 md:gap-10'>
                    <div className='relative w-full max-w-[180px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[380px] aspect-[4/1]'>
                        <Image
                            src='/images/homepage/Logo.png'
                            alt='Site Logo'
                            fill
                            className='object-contain'
                            priority
                        />
                    </div>
                    <div className='relative w-full max-w-[280px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] aspect-[6/1]'>
                        <Image
                            src='/images/homepage/NMB.png'
                            alt='Sponsor Logo'
                            fill
                            className='object-contain'
                            priority
                        />
                    </div>
                </div>

                <nav className='w-full bg-text-color hidden md:flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide px-4 lg:px-12 xl:px-24 font-alata text-white'>
                    <div className='mx-auto flex md:gap-0 lg:gap-4'>
                        {nav.map((item, index) => {
                            const isActive = pathname === item.path;
                            return (
                                <div
                                    key={index}
                                    className={`px-3 py-2 h-10 flex items-center ${isActive ? 'bg-green-950 text-white' : ''} hover:bg-green-950 text-white transition duration-200`}
                                >
                                    <Link
                                        href={item.path}
                                        className='shrink-0 transition duration-200 text-[15px] sm:text-[14px] md:text-[14px] lg:text-[20px] xl:text-[22px]'
                                    >
                                        {item.name}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </nav>


            </div>


            {/* MOBILE NAV */}
            <div className='md:hidden'>
                <div className='flex items-center justify-between px-4 py-1'>
                    <div className='h-9 w-9 border-1 border-gray-400 rounded-full flex items-center justify-center'>
                        <X />
                    </div>
                    <p className='text-2xl font-inter font-[700]'>Birat Info</p>
                    <div className=' h-10'>
                        <MobileNav />
                    </div>
                </div>
                <div className='relative w-full aspect-[4/1] bg-amber-200'>
                    <Image
                        src='/images/homepage/MobileNavAdvertisement.png'
                        alt='Sponsor Logo'
                        fill
                        className='object-cover'
                        priority
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;
