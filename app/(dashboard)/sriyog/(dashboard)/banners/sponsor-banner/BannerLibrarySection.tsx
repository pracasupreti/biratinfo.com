import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Banner } from '@/types/types';

interface BannerLibrarySectionProps {
    banners: Banner[];
    activeBannerId: string | null;
    onSetActive: (bannerId: string) => void;
    onDelete: (bannerId: string) => void;
}

export function BannerLibrarySection({
    banners,
    activeBannerId,
    onSetActive,
    onDelete
}: BannerLibrarySectionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Banner Library</CardTitle>
            </CardHeader>
            <CardContent>
                {banners.length === 0 ? (
                    <p className="text-muted-foreground">No banners available for this category</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {banners.map((banner) => (
                            <div
                                key={banner._id}
                                className={`relative rounded-md overflow-hidden border ${activeBannerId === banner._id ? 'border-green-400 border-2' : ''}`}
                            >
                                <div className="aspect-[1/1.5] relative bg-gray-100">
                                    <Image
                                        src={banner.url}
                                        alt="Sponsor banner"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="p-2 flex gap-2">
                                    <Button
                                        size="sm"
                                        onClick={() => onSetActive(banner._id)}
                                        disabled={activeBannerId === banner._id}
                                        variant={activeBannerId === banner._id ? 'default' : 'outline'}
                                        className="flex-1 gap-1"
                                    >
                                        {activeBannerId === banner._id ? (
                                            <>
                                                <CheckCircle className="h-4 w-4" />
                                                Active
                                            </>
                                        ) : (
                                            'Set Active'
                                        )}
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => onDelete(banner._id)}
                                        variant="destructive"
                                        className="gap-1"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}