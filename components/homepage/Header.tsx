import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
    const nav = [
        { name: "Home", path: "/home" },
        { name: "Politics", path: "/politics" },
        { name: "Society", path: "/society" },
        { name: "Startups", path: "/startups" },
        { name: "Economy", path: "/economy" },
        { name: "Tourism", path: "/tourism" },
        { name: "Employment", path: "/employment" },
        { name: "Sports", path: "/sports" },
        { name: "World", path: "/world" },
        { name: "Health", path: "/health" },
        { name: "Agriculture", path: "/agriculture" },
        { name: "Entertainment", path: "/entertainment" },
        { name: "Market", path: "/market" }
    ];

    return (
        <header className='pt-3 md:pt-6'>
            {/* TOPBAR */}
            <div className='w-full py-1.5 bg-[#008000] flex flex-col sm:flex-row items-center justify-between px-3 md:px-6 text-white'>
                <p className='text-sm font-alata text-center sm:text-left'>
                    Read Today&apos;s Paper
                </p>
                <p className='text-sm font-alata text-center sm:text-right'>
                    28 Baishak 2082, Monday
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
            <nav className='w-full bg-[#008000] flex overflow-x-auto whitespace-nowrap gap-6 py-3.5 px-4 md:px-6 xl:px-24 font-alata text-[15px] sm:text-[17px] md:text-[19px] text-white scrollbar-hide md:justify-between items-center'>

                {nav.map((item, index) => (
                    <Link
                        key={index}
                        href={item.path}
                        className='shrink-0 hover:underline transition duration-200'
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </header>
    );
}

export default Header;
