'use client'
import React, { useState } from 'react'
import { Button } from './ui/button';
import { CheckIcon, CopyIcon } from 'lucide-react';

function SocialShare() {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto border-t border-b border-gray-200 py-4 my-8">
            <div className=" mx-auto px-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        यो खबर सेयर गर्नुहोस्:
                    </h3>
                    <div className="flex items-center gap-2">
                        <ShareThis />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={copyToClipboard}
                            className="gap-2"
                        >
                            {isCopied ? (
                                <CheckIcon className="w-4 h-4 text-green-500" />
                            ) : (
                                <CopyIcon className="w-4 h-4" />
                            )}
                            {isCopied ? 'लिङ्क कपि भयो' : 'लिङ्क कपि गर्नुहोस'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SocialShare


// components/ShareThis.tsx
import { useEffect } from 'react';

const ShareThis = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://platform-api.sharethis.com/js/sharethis.js#property=${process.env.NEXT_PUBLIC_SHARETHIS_URL}&product=inline-share-buttons&source=platform`;
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div className="sharethis-inline-share-buttons"></div>
    );
};






