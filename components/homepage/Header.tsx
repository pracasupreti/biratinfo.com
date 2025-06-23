// components/Header.tsx (Server Component)
import BannerSection from './BannerSection';
import HeaderClient from './HeaderClient';

import Logo from './Logo';
import MobileHeader from './MobileHeader';
import { navConfig, othersDropdownConfig } from './NavConfig';



export default function Header() {
    return (
        <header>
            {/* Desktop Header */}
            <div className='md:flex md:flex-col hidden'>
                <div className='w-full py-1 h-5 bg-text-color flex flex-col sm:flex-row items-center justify-between px-2 md:px-4 lg:px-8 xl:px-16 text-white'>
                    {/* Breaking news ticker can go here */}
                </div>

                <div className='flex flex-col md:flex-row items-center justify-between w-full gap-2 md:gap-6 max-w-5xl mx-auto px-4 py-2'>
                    <Logo />
                    <BannerSection />
                </div>

                <HeaderClient navConfig={navConfig} othersDropdownConfig={othersDropdownConfig} />
            </div>

            {/* Mobile Header */}
            <MobileHeader navConfig={navConfig} othersDropdownConfig={othersDropdownConfig} />
        </header>
    );
}