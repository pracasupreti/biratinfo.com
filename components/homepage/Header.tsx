'use client'
import { CalendarDaysIcon, HomeIcon } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import MobileNav from '../MobileNav';

function Header() {
    const nav = [
        { name: <HomeIcon />, path: "/" },
        { name: "राजनीति", path: "/politics" },
        { name: "प्रबिधि", path: "/technology" },
        { name: "साहित्य", path: "/literature" },
        { name: "अर्थ", path: "/economy" },
        { name: "सम्पादकीय ", path: "/a" },
        { name: "बिचार", path: "/a" },
        { name: "प्रदेश", path: "/a" },
        { name: "खेलकुद", path: "/a" },
        { name: "रोजगार", path: "/a" },
        { name: "मनोरंजन", path: "/a" },
        { name: "सुरक्षा", path: "/a" },
        { name: "अन्य", path: "/a" }
    ];

    const pathname = usePathname();

    return (
        <header className='md:pt-6'>
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
                    <div className='relative w-full max-w-[180px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[380px] aspect-[4/1] flex items-center'>
                        <div className='relative h-full w-[80%]'>
                            <Image
                                src='/logo.svg'
                                alt='Birat Info Logo'
                                fill
                                className='object-contain'
                                priority
                            />
                        </div>
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

                <nav className='w-full bg-text-color hidden md:flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide px-2 lg:px-10 xl:px-24 font-alata text-white'>
                    <div className='mx-auto flex md:gap-0 lg:gap-4 min-w-fit'>
                        {nav.map((item, index) => {
                            const isActive = pathname === item.path;
                            return (
                                <div
                                    key={index}
                                    className={`px-3 py-2 h-10 flex items-center ${isActive ? 'bg-green-950 text-white' : ''} hover:bg-green-950 text-white transition duration-200`}
                                >
                                    <Link
                                        href={item.path}
                                        className='shrink-0 transition duration-200 text-sm md:text-[14px] lg:text-[20px] xl:text-[22px]'
                                        aria-label={`Navigate to ${typeof item.name === 'string' ? item.name : 'section'}`}
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
                <div className='flex items-center justify-between px-4 py-2'>
                    <div className='relative h-8 w-36'>
                        <Image
                            src='/logo.svg'
                            alt='Birat Info Logo'
                            fill
                            className='object-cover'
                            priority
                        />
                    </div>

                    <div className='h-7'>
                        <MobileNav />
                    </div>
                </div>

                <div className='relative w-full aspect-[4/1]'>
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
