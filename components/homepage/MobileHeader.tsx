// components/MobileHeader.tsx (Client Component)
'use client'
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import BannerSection from './BannerSection';
import MobileNav from '../MobileNav';

export default function MobileHeader({
    navConfig,
    othersDropdownConfig
}: {
    navConfig: typeof import('./NavConfig').navConfig;
    othersDropdownConfig: typeof import('./NavConfig').othersDropdownConfig;
}) {
    const { getToken } = useAuth();
    const [mobileNavItems, setMobileNavItems] = useState(navConfig);
    const [mobileDropdownItems, setMobileDropdownItems] = useState(othersDropdownConfig);

    useEffect(() => {
        const updateAuthPaths = async () => {
            const token = await getToken();
            setMobileNavItems(prev => {
                const updated = [...prev];
                updated[13] = {
                    ...updated[13],
                    name: token ? 'लेख्नुहोस' : 'समाचार लेख्नुहोस',
                    path: token ? '/manager' : '/sign-up'
                };
                return updated;
            });

            setMobileDropdownItems(prev => {
                const updated = [...prev];
                updated[4] = {
                    ...updated[4],
                    path: token ? '/manager' : '/sign-in'
                };
                return updated;
            });
        };

        updateAuthPaths();
    }, [getToken]);

    return (
        <div className='md:hidden'>
            <div className='flex items-center justify-between px-3 py-2'>
                <Link href="/" className='relative flex items-center gap-1 h-10 w-auto'>
                    <div className='relative h-10 w-[40px]'>
                        <Image
                            src='/logo.svg'
                            alt='Birat Info Logo'
                            fill
                            className='object-contain'
                            priority
                        />
                    </div>
                    <div className='relative h-10 w-[120px]'>
                        <Image
                            src='/BIRATINFO.svg'
                            alt='Birat Info Text Logo'
                            fill
                            className='object-contain'
                            priority
                        />
                    </div>
                </Link>

                <div className='h-4 flex items-center'>
                    <MobileNav
                        navItems={mobileNavItems}
                        othersDropdown={mobileDropdownItems}
                    />
                </div>
            </div>

            <BannerSection mobile />
        </div>
    );
}