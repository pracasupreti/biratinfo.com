'use client'

import React from 'react'
import Image from 'next/image'

function Loader() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-2">
            <div className="relative h-10 w-[40px] animate-[pop_1.5s_ease-in-out_infinite]">
                <Image
                    src="/logo.svg"
                    alt="Birat Info Logo"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
            <div className="relative h-10 w-[120px] animate-[pop_1.5s_ease-in-out_infinite]">
                <Image
                    src="/BIRATINFO.svg"
                    alt="Birat Info Text Logo"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            <style jsx>{`
                @keyframes pop {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.1);
                        opacity: 0.8;
                    }
                }
            `}</style>
        </div>
    )
}

export default Loader
