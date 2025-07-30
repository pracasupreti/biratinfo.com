/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { BannerCategorySection } from './BannerCategorySection';
import { BannerUploadSection } from './BannerUploadSection';
import { Banner, ContentCategory } from '@/types/types';
import ActiveBannersSection from './ActiveBannersSection';

const CONTENT_CATEGORIES: ContentCategory[] = [
    'Home', 'News', 'Sports', 'Entertainment', 'Politics', 'Tourism', 'Education', 'Health', 'Security', 'Technology', 'Economy', 'Agriculture', 'Culture', 'Environment', 'Opinion', 'Crime', 'Lifestyle', 'Automobile', 'Blog', 'Art', 'Editorial', 'Startups', 'Law', 'Market', 'Interview', 'Food', 'Employment', 'Literature', 'International', 'Complain'
];

export default function SponsorBannerManager() {
    const [banners, setBanners] = useState<Record<ContentCategory, Banner[]>>(
        () =>
            CONTENT_CATEGORIES.reduce((acc, cat) => {
                acc[cat] = [];
                return acc;
            }, {} as Record<ContentCategory, Banner[]>)
    );

    const [activeBanners, setActiveBanners] = useState<Record<ContentCategory, Banner | null>>(
        () =>
            CONTENT_CATEGORIES.reduce((acc, cat) => {
                acc[cat] = null;
                return acc;
            }, {} as Record<ContentCategory, Banner | null>)
    );

    const [isLoading, setIsLoading] = useState(true);
    const { getToken } = useAuth();

    const fetchBanners = async () => {
        try {
            const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;
            const apiKey = process.env.NEXT_PUBLIC_API_SPECIAL_KEY;
            if (!backend_uri || !apiKey) throw new Error('Missing backend configuration');

            const res = await fetch(`${backend_uri}/api/header-banners`, {
                headers: { 'x-special-key': apiKey },
                cache: 'no-store',
            });

            if (!res.ok) throw new Error('Failed to fetch banners');
            const data: Banner[] = await res.json();
            return Array.isArray(data) ? data : [data];
        } catch (err) {
            console.error('Error fetching banners:', err);
            toast.error('Failed to load banners');
            return [];
        }
    };

    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            const loadingToast = toast.loading('Loading banners...');
            try {
                const data = await fetchBanners();

                const newBanners: Record<ContentCategory, Banner[]> = {} as Record<ContentCategory, Banner[]>;
                const newActive: Record<ContentCategory, Banner | null> = {} as Record<ContentCategory, Banner | null>;

                CONTENT_CATEGORIES.forEach(cat => {
                    newBanners[cat] = data.filter(b => b.category === cat.toLowerCase());
                    newActive[cat] = data.find(b => b.category === cat.toLowerCase() && b.status === 'active') || null;
                });

                setBanners(newBanners);
                setActiveBanners(newActive);
                toast.success('Banners loaded successfully', { id: loadingToast });
            } catch (error: any) {
                console.error(error.message);
                toast.error('Failed to load banners', { id: loadingToast });
            } finally {
                setIsLoading(false);
            }
        };

        load();
    }, []);

    const handleSetActive = async (bannerId: string, category: ContentCategory) => {
        const loadingToast = toast.loading(`Activating ${category} banner...`);
        try {
            const token = await getToken();
            const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;
            if (!backend_uri) throw new Error("Missing API endpoint");

            const response = await fetch(`${backend_uri}/api/header-banners/active-banner/${bannerId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: 'active',
                    category: category.toLowerCase(),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to set active banner');
            }

            const bannersData = await fetchBanners();

            const categorized: Record<ContentCategory, Banner[]> = {} as any;
            const active: Record<ContentCategory, Banner | null> = {} as any;

            CONTENT_CATEGORIES.forEach(cat => {
                categorized[cat] = bannersData.filter(b => b.category === cat.toLowerCase());
                active[cat] = bannersData.find(b => b.category === cat.toLowerCase() && b.status === 'active') || null;
            });

            setBanners(categorized);
            setActiveBanners(active);

            toast.success(`${category} banner activated successfully`, { id: loadingToast });
        } catch (error) {
            console.error('Error setting active banner:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to update banner', { id: loadingToast });
        }
    };

    const handleDelete = async (bannerId: string) => {
        if (!confirm('Are you sure you want to delete this banner?')) return;

        const loadingToast = toast.loading('Deleting banner...');
        try {
            const token = await getToken();
            const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;
            if (!backend_uri) throw new Error('Missing backend configuration');

            const deleteRes = await fetch(`${backend_uri}/api/header-banners?id=${bannerId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!deleteRes.ok) throw new Error('Failed to delete banner');

            const bannersData = await fetchBanners();

            const categorized: Record<ContentCategory, Banner[]> = {} as any;
            const active: Record<ContentCategory, Banner | null> = {} as any;

            CONTENT_CATEGORIES.forEach(cat => {
                categorized[cat] = bannersData.filter(b => b.category === cat.toLowerCase());
                active[cat] = bannersData.find(b => b.category === cat.toLowerCase() && b.status === 'active') || null;
            });

            setBanners(categorized);
            setActiveBanners(active);

            toast.success('Banner deleted successfully', { id: loadingToast });
        } catch (err: any) {
            console.error('Delete error:', err);
            toast.error(err.message || 'Failed to delete banner', { id: loadingToast });
        }
    };

    const handleUpdateLink = async (bannerId: string, link: string) => {
        const loadingToast = toast.loading('Updating banner link...');
        try {
            const token = await getToken();
            const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;
            if (!backend_uri) throw new Error('Missing API endpoint');

            const res = await fetch(`${backend_uri}/api/header-banners/set-link/${bannerId}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ link }),
            });

            if (!res.ok) throw new Error('Failed to update banner link');

            const bannersData = await fetchBanners();

            const categorized: Record<ContentCategory, Banner[]> = {} as any;
            const active: Record<ContentCategory, Banner | null> = {} as any;

            CONTENT_CATEGORIES.forEach(cat => {
                categorized[cat] = bannersData.filter(b => b.category === cat.toLowerCase());
                active[cat] = bannersData.find(b => b.category === cat.toLowerCase() && b.status === 'active') || null;
            });

            setBanners(categorized);
            setActiveBanners(active);

            toast.success('Link updated successfully', { id: loadingToast });
        } catch (err: any) {
            console.error('Link update error:', err);
            toast.error(err.message || 'Failed to update banner link', { id: loadingToast });
        }
    };

    const handleUploadSuccess = async (result: any, category: ContentCategory) => {
        const loadingToast = toast.loading('Uploading banner...');
        const url = result?.info?.secure_url;
        if (!url) {
            toast.error('Upload failed: no URL found', { id: loadingToast });
            return;
        }

        try {
            const token = await getToken();
            const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;
            if (!backend_uri) throw new Error("Missing API endpoint");

            const response = await fetch(`${backend_uri}/api/header-banners`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url,
                    category: category.toLowerCase(),
                    name: 'header_banner',
                    status: 'inactive'
                })
            });

            if (!response.ok) throw new Error('Failed to save banner to backend');

            const bannersData = await fetchBanners();

            const categorized: Record<ContentCategory, Banner[]> = {} as any;
            const activeData: Record<ContentCategory, Banner | null> = {} as any;

            CONTENT_CATEGORIES.forEach(cat => {
                categorized[cat] = bannersData.filter(b => b.category === cat.toLowerCase());
                activeData[cat] = bannersData.find(b => b.category === cat.toLowerCase() && b.status === 'active') || null;
            });

            setBanners(categorized);
            setActiveBanners(activeData);

            toast.success('Banner uploaded successfully', { id: loadingToast });
        } catch (error) {
            console.error('Error handling upload:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to process upload', { id: loadingToast });
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-4 p-6">
                <Skeleton className="h-10 w-1/3" />
                <div className="grid grid-cols-1 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i}>
                            <CardContent className="p-4 space-y-4">
                                <Skeleton className="h-40 w-full" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-10 flex-1" />
                                    <Skeleton className="h-10 w-10" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            <ActiveBannersSection activeBanners={activeBanners} />

            {CONTENT_CATEGORIES.map(category => (
                <BannerCategorySection
                    key={category}
                    category={category}
                    banners={banners[category]}
                    activeBannerId={activeBanners[category]?._id || null}
                    onSetActive={handleSetActive}
                    onDelete={handleDelete}
                    onUpdateLink={handleUpdateLink}
                />
            ))}

            <BannerUploadSection
                onUploadSuccess={handleUploadSuccess}
                categories={CONTENT_CATEGORIES}
            />
        </div>
    );
}
