'use client'
import { CalendarDaysIcon, HomeIcon } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

function Header() {
    const nav = [
        { name: <HomeIcon />, path: "/kasin" },
        { name: "ताजा समाचार", path: "/politics" },
        { name: "समाचार", path: "/society" },
        { name: "राजनीति", path: "/startups" },
        { name: "विज्ञान र प्रबिधि", path: "/economy" },
        { name: "साहित्य", path: "/tourism" },
        { name: "अर्थ/कारोवार", path: "/employment" },
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
            <div className='w-full py-1.5 bg-[#008000] flex flex-col sm:flex-row items-center justify-between px-3 md:px-6 text-white'>
                <p className='text-sm font-alata text-center sm:text-left'>
                    आज को ताजा खबर
                </p>
                <p className='text-sm font-alata text-center sm:text-right flex gap-2 items-center'>
                    <CalendarDaysIcon size={20} />
                    २८ बैशाख २०८२, आईतवार
                </p>
            </div>

            {/* LOGOS */}
            <div className='flex flex-col md:flex-row items-center justify-between w-full px-3 md:px-9 pt-4 gap-4 md:gap-10 lg:gap-4'>
                <div className='relative w-full max-w-[180px] md:max-w-[280px] aspect-[4/1]'>
                    <Image
                        src='/images/homepage/Logo.png'
                        alt='Site Logo'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className='relative w-full max-w-[280px] md:max-w-[500px] aspect-[6/1]'>
                    <Image
                        src='/images/homepage/NMB.png'
                        alt='Sponsor Logo'
                        fill
                        className='object-contain'
                    />
                </div>
            </div>

            {/* NAVBAR */}
            <nav className='w-full bg-[#008000] md:py-1  hidden sm:flex md:gap-3 lg:py-0 lg:gap-6 min-h-10 items-center px-6 justify-center font-alata text-[15px] sm:text-[17px] md:text-[19px] xl:text-[13px] text-white flex-wrap'>
                {nav.map((item, index) => {
                    const isActive = pathname.startsWith(item.path);
                    return (
                        <div
                            key={index}
                            className={`px-3 py-1 h-full flex items-center rounded ${isActive ? 'bg-green-900 text-white' : ''}`}
                        >
                            <Link
                                href={item.path}
                                className='shrink-0 hover:underline transition duration-200'
                            >
                                {item.name}
                            </Link>
                        </div>
                    );
                })}
            </nav>

            <div className='w-full sm:hidden bg-[#008000] h-10'>
                {/* MOBILE NAV */}
            </div>

        </header>
    );
}

export default Header;
