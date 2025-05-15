'use client'
import { CalendarDaysIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileNav from '../MobileNav';

function Header() {
    const nav = [
        { name: "Home", path: "/" },
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

    const pathname = usePathname();

    return (
        <header className='pt-3 md:pt-6'>
            {/* TOPBAR */}
            <div className='w-full py-1.5 bg-text-color flex flex-col sm:flex-row items-center justify-between px-3 md:px-6 lg:px-12 xl:px-24 text-white'>
                <p className='text-sm font-alata text-center sm:text-left'>
                    Read Today&apos;s Paper
                </p>
                <p className='text-sm font-alata text-center sm:text-right flex gap-2 items-center'>
                    <CalendarDaysIcon size={20} />
                    28 Baishak 2082, Monday
                </p>
            </div>

            <div className='flex flex-col md:flex-row items-center justify-between w-full px-3 md:px-9 lg:px-12 xl:px-24 pt-2 md:gap-10'>
                <div className='relative w-full max-w-[180px]  lg:max-w-[320px] xl:max-w-[380px] aspect-[4/1]'>
                    <Image
                        src='/images/homepage/Logo.png'
                        alt='Site Logo'
                        fill
                        className='object-contain'
                        priority
                    />
                </div>
                <div className='relative w-full max-w-[280px]  lg:max-w-[600px] xl:max-w-[700px] aspect-[6/1]'>
                    <Image
                        src='/images/homepage/NMB.png'
                        alt='Sponsor Logo'
                        fill
                        className='object-contain'
                        priority
                    />
                </div>
            </div>

            <nav className='w-full bg-text-color hidden lg:flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide px-4 md:px-6 lg:px-12 xl:px-24 font-alata text-white'>
                <div className='mx-auto flex gap-4 md:gap-6 xl:gap-14'>
                    {nav.map((item, index) => {
                        const isActive = pathname.startsWith(item.path);
                        return (
                            <div
                                key={index}
                                className={`px-3 py-2 h-10 flex items-center ${isActive ? 'bg-green-950 text-white' : ''} hover:bg-green-950 text-white transition duration-200`}
                            >
                                <Link
                                    href={item.path}
                                    className='shrink-0 transition duration-200 text-[15px] sm:text-[17px] md:text-[19px] lg:text-[20px] xl:text-[22px]'
                                >
                                    {item.name}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </nav>

            <div className='w-full lg:hidden bg-[#008000] h-10 flex items-center justify-end px-5'>
                <MobileNav />
            </div>

        </header>
    );
}

export default Header;