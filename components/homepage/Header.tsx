'use client'
import { ChevronDown, HomeIcon } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import MobileNav from '../MobileNav';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

function Header() {
    const nav = [
        { name: <HomeIcon size={16} />, path: "/" },
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


    const othersDropdown = [
        { name: 'पर्यटन', path: '/tourism' },
        { name: 'स्वास्थ्य', path: '/health' },
        { name: 'शिक्षा', path: '/education' },
        { name: 'अन्तराष्ट्रिय', path: '/international' }
    ];

    const pathname = usePathname();

    return (
        <header >
            {/* TOPBAR */}
            <div className='md:flex md:flex-col hidden'>
                <div className='w-full py-1 h-5 bg-text-color flex flex-col sm:flex-row items-center justify-between px-2 md:px-4 lg:px-8 xl:px-16 text-white'>
                    {/* <p className='text-xs font-alata text-center sm:text-left'>
                        आज को ताजा खबर
                    </p>
                    <p className='text-xs font-alata text-center sm:text-right flex gap-1 items-center'>
                        <CalendarDaysIcon size={16} />
                        २८ बैशाख २०८२, आईतवार
                    </p> */}
                </div>

                <div className='flex flex-col md:flex-row items-center justify-between w-full pt-1 gap-2 md:gap-6 max-w-5xl mx-auto px-4'>
                    <div className='relative w-full max-w-[140px] md:max-w-[200px] lg:max-w-[240px] aspect-[4/1] flex items-center gap-1'>
                        <div className='relative h-full flex-[1]'>
                            <Image
                                src='/logo.svg'
                                alt='Birat Info Logo'
                                fill
                                className='object-contain'
                                priority
                            />
                        </div>
                        <div className='relative h-full' style={{ width: '70%' }}>
                            <Image
                                src='/BIRATINFO.svg'
                                alt='Birat Info Text Logo'
                                fill
                                className='object-contain'
                                priority
                            />
                        </div>
                    </div>

                    <div className='relative w-full max-w-[200px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] aspect-[6/1]'>
                        <Image
                            src='/images/homepage/NMB.png'
                            alt='Sponsor Logo'
                            fill
                            className='object-contain'
                            priority
                        />
                    </div>
                </div>

                <nav className='w-full bg-text-color hidden md:flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide px-1 lg:px-6 xl:px-16 font-alata text-white'>
                    <div className='mx-auto flex md:gap-0 lg:gap-2 min-w-fit'>
                        {nav.map((item, index) => {
                            const isActive = pathname === item.path;
                            if (item.name === 'अन्य') {
                                return (
                                    <DropdownMenu key={index}>
                                        <DropdownMenuTrigger asChild>
                                            <div
                                                className={`px-2 py-1 h-8 flex items-center relative cursor-pointer ${isActive ? 'bg-green-950 text-white' : ''} hover:bg-green-950 text-white transition duration-200`}
                                            >
                                                <span className='text-xs md:text-[12px] lg:text-[16px] xl:text-[18px] flex items-center justify-center gap-1'>
                                                    {item.name}
                                                    <div className='mt-0.5'>
                                                        <ChevronDown size={15} />
                                                    </div>

                                                </span>
                                            </div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className='absolute mt-1 z-50 bg-text-color text-white shadow-lg'
                                            align='start'
                                        >
                                            {othersDropdown.map((dropItem, dropIndex) => (
                                                <DropdownMenuItem
                                                    key={dropIndex}
                                                    asChild
                                                    className='cursor-pointer hover:bg-green-950 px-4 py-2 text-sm'
                                                >
                                                    <Link href={dropItem.path}>
                                                        {dropItem.name}
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                );
                            }

                            return (
                                <div
                                    key={index}
                                    className={`px-2 py-1 h-8 flex items-center ${isActive ? 'bg-green-950 text-white' : ''} hover:bg-green-950 text-white transition duration-200`}
                                >
                                    <Link
                                        href={item.path}
                                        className='shrink-0 transition duration-200 text-xs md:text-[12px] lg:text-[16px] xl:text-[18px]'
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
                <div className='flex items-center justify-between px-3 py-2'>
                    <div className='relative flex items-center gap-1 h-6 w-auto'>
                        <div className='relative h-6 w-[24px]'>
                            <Image
                                src='/logo.svg'
                                alt='Birat Info Logo'
                                fill
                                className='object-contain'
                                priority
                            />
                        </div>
                        <div className='relative h-6 w-[70px]'>
                            <Image
                                src='/BIRATINFO.svg'
                                alt='Birat Info Text Logo'
                                fill
                                className='object-contain'
                                priority
                            />
                        </div>
                    </div>

                    <div className='h-4 flex items-center'>
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