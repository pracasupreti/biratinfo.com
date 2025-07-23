import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Banner } from '@/types/types';
import { BannerLinkForm } from './BannerLinkForm';

interface ActiveBannersSectionProps {
    activeBanners: Record<string, Banner | null>;
    onUpdateLink: (bannerId: string, link: string) => Promise<void>;
}

export default function ActiveBannersSection({
    activeBanners,
    onUpdateLink
}: ActiveBannersSectionProps) {
    return (
        <Card className="bg-gray-50">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    Currently Active Banners
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(activeBanners).map(([category, banner]) => (
                    <div key={category} className="space-y-2">
                        <h3 className="text-sm font-bold capitalize text-muted-foreground">
                            {category}
                        </h3>
                        <div className={`rounded-md ${!banner ? 'border' : ''} overflow-hidden`}>
                            {banner ? (
                                <>
                                    <div className="aspect-[2/2.5] relative bg-muted/50">
                                        <Image
                                            src={banner.url}
                                            alt={`Active ${category} banner`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="p-4 border-t">
                                        <BannerLinkForm
                                            initialLink={banner.link || ''}
                                            onSave={(link) => onUpdateLink(banner._id, link)}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="aspect-[2/2.5] flex items-center justify-center bg-muted/25">
                                    <p className="text-xs text-muted-foreground">
                                        No active banner
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}