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
        <div className='pt-3 md:pt-[26px]'>
            {/* TOPBAR */}
            <div className='w-full py-1.5 bg-[#008000] flex items-center justify-between px-3 md:px-[26px]'>
                <p className='text-[13px] font-alata'>Read Today's Paper</p>
                <p className='text-[13px] font-alata'>28 Baishak 2082, Monday</p>
            </div>

            {/* LOGO */}
            <div className='flex w-full justify-between items-center px-3 md:px-9'>
                <div className='md:w-[436px] md:h-[94px] w-[150px] h-[40px] relative'>
                    <Image
                        src={'/images/homepage/Logo.png'}
                        alt=''
                        fill
                        objectFit='contain'
                    />
                </div>
                <div className='md:w-[817px] md:h-[124px] w-[200px] h-[60px] relative'>
                    <Image
                        src={'/images/homepage/NMB.png'}
                        alt=''
                        fill
                        objectFit='contain'
                    />
                </div>
            </div>

            {/* NAVBAR */}
            <div className=' w-full bg-[#008000] flex overflow-x-auto whitespace-nowrap md:justify-between gap-6 py-3.5 px-4 md:px-24 font-alata text-[19px]'>
                {
                    nav.map((items, index) =>
                        <Link key={index} href={items.path}>{items.name}</Link>
                    )}

            </div>
        </div>
    )
}

export default Header