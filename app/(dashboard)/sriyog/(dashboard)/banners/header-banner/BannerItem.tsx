// components/BannerItem.tsx
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Trash2, Link2, ExternalLink } from 'lucide-react';
import { BannerLinkForm } from './BannerLinkForm';
import { Banner } from '@/types/types';
import { Badge } from '@/components/ui/badge';

interface BannerItemProps {
    banner: Banner;
    isActive: boolean;
    onSetActive: () => void;
    onDelete: () => void;
    onUpdateLink: (link: string, title: string) => Promise<void>;
}

export function BannerItem({
    banner,
    isActive,
    onSetActive,
    onDelete,
    onUpdateLink
}: BannerItemProps) {
    return (
        <Card className={`relative overflow-hidden ${isActive ? 'border-2 border-primary' : 'border'} bg-gray-50`}>
            {isActive && (
                <div className="absolute top-2 left-2">
                    <Badge variant="default" className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>Active</span>
                    </Badge>
                </div>
            )}

            <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Banner Image */}
                    <div className="relative flex-1 min-h-[120px] bg-gray-200 rounded-md overflow-hidden">
                        {banner.url ? (
                            <Image
                                src={banner.url}
                                alt={`${banner.category} banner`}
                                width={800}
                                height={200}
                                className="object-contain w-full h-full"
                                sizes="(max-width: 768px) 100vw, 800px"
                                priority={isActive}
                                unoptimized
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                No image available
                            </div>
                        )}

                        {banner.link && (
                            <div className="absolute bottom-2 left-2">
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    <Link2 className="h-3 w-3" />
                                    <span>Has Link</span>
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Actions Panel */}
                    <div className="w-full md:w-[240px] flex flex-col gap-3">
                        <div className="flex gap-2">
                            <Button
                                onClick={onSetActive}
                                disabled={isActive}
                                variant={isActive ? 'default' : 'outline'}
                                size="sm"
                                className="flex-1 gap-2"
                            >
                                {isActive ? (
                                    <>
                                        <CheckCircle className="h-4 w-4" />
                                        Active
                                    </>
                                ) : 'Set Active'}
                            </Button>

                            <Button
                                onClick={onDelete}
                                variant="destructive"
                                size="sm"
                                className="gap-2"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Link Section */}
                        <div className="space-y-2">
                            {banner.link && (
                                <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                                    <ExternalLink className="h-4 w-4 flex-shrink-0" />
                                    <a
                                        href={banner.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="truncate hover:underline text-primary"
                                    >
                                        {banner.link}
                                    </a>
                                </div>
                            )}

                            <BannerLinkForm
                                initialLink={banner.link || ''}
                                initialTitle={''}
                                onSave={onUpdateLink}
                                className="border-t pt-3"
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}