// components/BannerSection.tsx (Client Component)
'use client'
import { categoryOptions } from '@/types/Post';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BannerSection({ mobile = false }: { mobile?: boolean }) {
    const [sponsorBanner, setSponsorBanner] = useState<string | null>(null);
    const [link, setLink] = useState<string>("/");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const pathname = usePathname();


    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;
                const apiKey = process.env.NEXT_PUBLIC_API_SPECIAL_KEY;

                if (!backend_uri || !apiKey) {
                    throw new Error('Missing backend configuration');
                }

                // Determine category dynamically
                let category = 'home';
                const matchedCategory = categoryOptions.find((option) =>
                    pathname.includes(option.value)
                );

                if (matchedCategory) {
                    category = matchedCategory.value;
                }

                const headers = { 'x-special-key': apiKey };
                const response = await fetch(
                    `${backend_uri}/api/header-banners/active-banner?category=${category}`,
                    { headers, cache: 'no-store' }
                );

                if (!response.ok) throw new Error('Failed to fetch banner');

                const data = await response.json();
                setSponsorBanner(data?.url || null);
                setLink(data?.link || "#");
            } catch (err) {
                console.error('Banner fetch error:', err);
                setError('Failed to load sponsor banner');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBanner();
    }, [pathname]); // Re-run when pathname changes


    if (mobile) {
        return (
            <div className="relative w-full aspect-[10/1] bg-gray-50">
                {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <Loader2 className='animate-spin h-6 w-6 text-gray-400' />
                    </div>
                ) : error ? (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        {error}
                    </div>
                ) : sponsorBanner ? (
                    <Link href="#">
                        <Image
                            src={sponsorBanner}
                            alt='Sponsor Banner'
                            fill
                            className="object-cover bg-center"
                            priority
                            onError={() => {
                                setError('Failed to load banner image');
                                setSponsorBanner(null);
                            }}
                            unoptimized
                        />
                    </Link>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        Sponsor banner spot available
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-[628px] h-[120px] md:h-[60px] bg-gray-50 overflow-hidden">
            {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <Loader2 className='animate-spin h-6 w-6 text-gray-400' />
                </div>
            ) : error ? (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    {error}
                </div>
            ) : sponsorBanner ? (
                <Link href={link}>
                    <Image
                        src={sponsorBanner}
                        alt='Sponsor Banner'
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                        onError={() => {
                            setError('Failed to load banner image');
                            setSponsorBanner(null);
                        }}
                    />
                </Link>
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Sponsor banner spot available
                </div>
            )}
        </div>
    );
}