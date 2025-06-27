// components/ActiveBannersSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Banner, ContentCategory } from '@/types/types';
import { ExternalLink, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ActiveBannersSectionProps {
    activeBanners: Record<ContentCategory, Banner | null>;
    onEditLink?: (bannerId: string) => void;
}

export default function ActiveBannersSection({
    activeBanners,
    onEditLink
}: ActiveBannersSectionProps) {
    return (
        <Card className="bg-gray-50">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">
                    Active Banners
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {Object.entries(activeBanners).map(([category, banner]) => (
                    <div key={category} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold capitalize text-muted-foreground">
                                {category}
                            </h3>
                            {banner?.link && onEditLink && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onEditLink(banner._id)}
                                    className="h-6 px-2 text-xs text-primary"
                                >
                                    Edit Link
                                </Button>
                            )}
                        </div>

                        <div className={`rounded-md ${!banner ? 'border' : ''} overflow-hidden`}>
                            {banner ? (
                                <>
                                    <div className="w-full h-[100px] flex items-center justify-center bg-muted/50">
                                        <Image
                                            src={banner.url}
                                            alt={`Active ${category} banner`}
                                            width={600}
                                            height={100}
                                            className="object-contain w-full h-full"
                                            sizes="(max-width: 768px) 100vw, 600px"
                                            unoptimized
                                        />
                                    </div>

                                    {banner.link && (
                                        <div className="p-2 bg-muted/25 border-t">
                                            <a
                                                href={banner.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-xs text-primary hover:underline"
                                            >
                                                <Link2 className="h-3 w-3" />
                                                <span className="truncate">
                                                    {banner.link}
                                                </span>
                                                <ExternalLink className="h-3 w-3 ml-1" />
                                            </a>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="h-[100px] flex items-center justify-center bg-muted/25">
                                    <p className="text-xs text-muted-foreground">
                                        No banner selected
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