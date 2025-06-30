'use client';

import dynamic from 'next/dynamic';

const SocialShare = dynamic(() => import('@/components/SocialShare'), {
    ssr: false,
});

export default function SocialShareClientWrapper() {
    return <SocialShare />;
}
