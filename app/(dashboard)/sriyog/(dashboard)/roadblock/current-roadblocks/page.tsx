// app/sriyog/roadblocks/current-roadblocks/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Edit, Trash2, Plus } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RoadblockBanner } from '@/types/roadblock';

export default function CurrentRoadblocks() {
    const [banners, setBanners] = useState<RoadblockBanner[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { getToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                setLoading(true);
                const token = await getToken();
                const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;

                const response = await fetch(`${backend_uri}/api/roadblocks`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch banners');
                }

                const data = await response.json();
                setBanners(data?.data?.data || []);

            } catch (error) {
                console.error('Error fetching banners:', error);
                toast.error('Failed to load banners');
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, [getToken]);

    const handleDelete = async (id: string) => {
        const confirmation = confirm('Are you sure you want to delete this banner?');
        if (!confirmation) return;

        try {
            const toastId = toast.loading('Deleting banner...');
            const token = await getToken();
            const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;

            const response = await fetch(`${backend_uri}/api/roadblocks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete banner');
            }

            toast.dismiss(toastId);
            toast.success('Banner deleted successfully');

            // Update the banners list
            setBanners(banners.filter(banner => banner._id !== id));
        } catch (error) {
            console.error('Error deleting banner:', error);
            toast.error('Failed to delete banner');
        }
    };

    const filteredBanners = banners.filter(banner =>
        banner.link.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusBadge = (startDate: string, endDate?: string) => {
        const now = new Date();
        const start = new Date(startDate);

        if (now < start) {
            return <Badge variant="secondary">Scheduled</Badge>;
        }

        if (!endDate) {
            return <Badge>Active</Badge>; // No endDate means indefinitely active
        }

        const end = new Date(endDate);
        if (now >= start && now <= end) {
            return <Badge>Active</Badge>;
        }

        return <Badge variant="destructive">Expired</Badge>;
    };


    const getNetworksDisplay = (networks: string[] | 'all') => {
        if (networks === 'all') return 'All Networks';
        if (networks.length <= 2) return networks.join(', ');
        return `${networks.length} Networks`;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Current Roadblock Banners</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Manage all active and scheduled roadblock banners
                    </p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Input
                        placeholder="Search banners..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-64"
                    />
                    <Button onClick={() => router.push('/sriyog/roadblock/add-roadblock')}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Banner
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                </div>
            ) : filteredBanners.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 border rounded-lg bg-gray-50 dark:bg-gray-900">
                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                        {searchTerm ? 'No matching banners found' : 'No banners created yet'}
                    </p>
                    {!searchTerm && (
                        <Button onClick={() => router.push('/sriyog/roadblock/add-roadblock')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create First Banner
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBanners.map((banner) => (
                        <Card key={banner._id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardDescription className="mt-1">
                                            {getStatusBadge(banner.startDate, banner.endDate)}
                                        </CardDescription>
                                    </div>
                                    <Badge variant="outline" className="ml-2">
                                        {banner.devices}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="relative w-full aspect-[4/5] rounded-md overflow-hidden border">
                                        <Image
                                            src={banner.image.url}
                                            alt="Roadblock banner"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center">
                                            <span className="text-gray-500 dark:text-gray-400 w-24">Link:</span>
                                            <a
                                                href={banner.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline dark:text-blue-400 line-clamp-1"
                                            >
                                                {banner.link.replace(/^https?:\/\//, '')}
                                            </a>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-gray-500 dark:text-gray-400 w-24">Starts:</span>
                                            <span>{formatDate(banner.startDate)}</span>
                                        </div>
                                        {banner.endDate && (
                                            <div className="flex items-center">
                                                <span className="text-gray-500 dark:text-gray-400 w-24">Ends:</span>
                                                <span>{formatDate(banner.endDate)}</span>
                                            </div>
                                        )}

                                        <div className="flex items-center">
                                            <span className="text-gray-500 dark:text-gray-400 w-24">Networks:</span>
                                            <span className="line-clamp-1">{getNetworksDisplay(banner.networks)}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-gray-500 dark:text-gray-400 w-24">Location:</span>
                                            <span className="capitalize">{banner.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => router.push(`/sriyog/roadblock/edit-roadblock/${banner._id}`)}
                                                className='cursor-pointer'
                                            >
                                                <Edit className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Edit banner</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(banner._id)}
                                                className='cursor-pointer'
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Delete</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Delete banner</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}