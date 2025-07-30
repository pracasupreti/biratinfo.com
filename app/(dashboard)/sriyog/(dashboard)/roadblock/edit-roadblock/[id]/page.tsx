// app/sriyog/roadblocks/edit-roadblock/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@clerk/nextjs';
import Loader from '@/components/Loader';
import { RoadblockBanner } from '@/types/roadblock';
import RoadblockForm from '../../RoadBlockForm';

export default function EditRoadblockPage() {
    const params = useParams();
    const { id } = params;
    const [bannerData, setBannerData] = useState<RoadblockBanner | null>(null);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                setLoading(true);
                const token = await getToken();
                const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;

                const response = await fetch(`${backend_uri}/api/roadblocks/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch banner data');
                }
                const data = await response.json();
                setBannerData(data?.data?.roadblock);
            } catch (error) {
                console.error('Error fetching banner:', error);
                toast.error('Failed to load banner data');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBanner();
        }
    }, [id, getToken]);

    if (loading) {
        return (
            <div className="container mx-auto py-8 flex justify-center">
                <Loader />
            </div>
        );
    }

    if (!bannerData) {
        return (
            <div className="container mx-auto py-8 text-center">
                <p>Banner not found</p>
            </div>
        );
    }

    // Transform dates from strings to Date objects
    const initialData = {
        ...bannerData,
        startDate: bannerData.startDate ? new Date(bannerData.startDate) : undefined,
        endDate: bannerData.endDate ? new Date(bannerData.endDate) : undefined,
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Edit Roadblock Banner</h1>
            <RoadblockForm mode="edit" initialData={initialData} bannerId={id as string} />
        </div>
    );
}