'use client'
import { CalendarDaysIcon, HomeIcon } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import MobileNav from '../MobileNav';

function Header() {
    const nav = [
        { name: <HomeIcon />, path: "/en" },
        { name: "Politics", path: "/politics" },
        { name: "Society", path: "/society" },
        { name: "Startups", path: "/startups" },
        { name: "Economy", path: "/economy" },
        { name: "Tourism", path: "/tourism" },
        { name: "Employment", path: "/employment" },
        { name: "Sports", path: "/sports" },
        { name: "World", path: "/world" },
        { name: "Health", path: "/health" },
        { name: "Market", path: "/market" }
    ];

    const pathname = usePathname();

    return (
        <header className='pt-3 md:pt-6'>
            {/* TOPBAR */}
            <div className='md:flex md:flex-col hidden'>
                <div className='w-full py-1.5 bg-text-color flex flex-col sm:flex-row items-center justify-between px-3 md:px-6 lg:px-12 xl:px-24 text-white'>
                    <p className='text-sm font-alata text-center sm:text-left'>
                        Read Today's Paper
                    </p>
                    <p className='text-sm font-alata text-center sm:text-right flex gap-2 items-center'>
                        <CalendarDaysIcon size={20} />
                        28 Baishak 2082, Monday
                    </p>
                </div>

                <div className='flex flex-col md:flex-row items-center justify-between w-full px-3 md:px-9 lg:px-12 xl:px-24 pt-2 gap-4 md:gap-10'>
                    <div className='relative w-full max-w-[180px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[380px] aspect-[4/1] flex items-center'>
                        <div className='relative h-full w-[30%]'>
                            <Image
                                src='/images/homepage/biratinfo-logo.svg'
                                alt='Birat Info Logo'
                                fill
                                className='object-contain'
                                priority
                            />
                        </div>

                        <div className='w-[60%] pl-2'>
                            <p className='text-lg md:text-xl lg:text-2xl font-bold text-text-color font-inter'>
                                Birat Info
                            </p>
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
                                        aria-label={`Navigate to ${typeof item.name === 'string' ? item.name : 'Home'}`}
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
                    <div className='h-9 w-9 border border-gray-400 rounded-full flex items-center justify-center relative'>
                        <Image
                            src='/images/homepage/biratinfo-logo.svg'
                            alt='Birat Info Logo'
                            fill
                            className='object-contain'
                            priority
                        />
                    </div>
                    <p className='text-2xl font-inter font-[700]'>Birat Info</p>
                    <div className='h-10'>
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