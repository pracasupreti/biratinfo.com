'use client';

import { PiHandsClappingThin, PiHandsClappingFill } from "react-icons/pi";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

interface ClapButtonProps {
    postId: string;
    initialClaps: number;
    initialHasClapped: boolean;
}

export default function ClapButton({
    postId,
    initialClaps,
    initialHasClapped,
}: ClapButtonProps) {
    const [claps, setClaps] = useState(initialClaps);
    const [hasClapped, setHasClapped] = useState(initialHasClapped);
    const [isAnimating, setIsAnimating] = useState(false);

    const { getToken, isSignedIn } = useAuth();
    const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Sync with server on mount
    useEffect(() => {
        const fetchClapStatus = async () => {
            if (!isSignedIn || !backend_uri) return;

            try {
                const token = await getToken();
                const res = await fetch(`${backend_uri}/api/posts/${postId}/clap`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    setClaps(data.claps);
                    setHasClapped(data.hasClapped);
                }
            } catch (error) {
                console.error('Failed to fetch clap status:', error);
            }
        };

        fetchClapStatus();
    }, [postId, isSignedIn, backend_uri, getToken]);

    const handleClap = async () => {
        if (!isSignedIn || !backend_uri) return;

        // Optimistic UI update
        const newClaps = hasClapped ? claps - 1 : claps + 1;
        const newHasClapped = !hasClapped;

        setHasClapped(newHasClapped);
        setClaps(newClaps);
        setIsAnimating(true);

        try {
            const token = await getToken();

            const res = await fetch(`${backend_uri}/api/posts/${postId}/clap`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                // Revert if API call fails
                setHasClapped(hasClapped);
                setClaps(claps);
                throw new Error('Failed to update clap');
            }

            const data = await res.json();
            // Sync with server response
            setClaps(data.claps);
            setHasClapped(data.hasClapped);
        } catch (error) {
            console.error('Clap action failed:', error);
        } finally {
            setTimeout(() => setIsAnimating(false), 300);
        }
    };

    return (
        <div className="flex items-center gap-3 mt-6">
            <Button
                variant="outline"
                size="sm"
                onClick={handleClap}
                disabled={!isSignedIn}
                className={cn(
                    "flex items-center gap-2 transition-all duration-300 cursor-pointer",
                    hasClapped ? 'bg-yellow-50 border-yellow-200 hover:bg-yellow-50' : '',
                    isAnimating ? 'scale-110' : 'scale-100'
                )}
            >
                {hasClapped ? (
                    <PiHandsClappingFill className="text-yellow-500 w-5 h-5" />
                ) : (
                    <PiHandsClappingThin className="text-gray-600 w-5 h-5 hover:text-yellow-500" />
                )}
                <span className={hasClapped ? 'text-yellow-600 font-medium' : 'text-gray-700'}>
                    {claps}
                </span>
            </Button>
            {/* <span className="text-sm text-gray-600">
                {hasClapped ? 'धन्यवाद!' : 'मन पर्यो?'}
            </span> */}
        </div>
    );
}