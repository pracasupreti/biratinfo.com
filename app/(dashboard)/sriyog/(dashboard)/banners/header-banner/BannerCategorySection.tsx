// components/BannerCategorySection.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BannerItem } from './BannerItem';
import { Banner, ContentCategory } from '@/types/types';

interface BannerCategorySectionProps {
    category: ContentCategory;
    banners: Banner[];
    activeBannerId: string | null;
    onSetActive: (bannerId: string, category: ContentCategory) => void;
    onDelete: (bannerId: string) => void;
    onUpdateLink: (bannerId: string, link: string, title: string) => Promise<void>;
}

export function BannerCategorySection({
    category,
    banners,
    activeBannerId,
    onSetActive,
    onDelete,
    onUpdateLink
}: BannerCategorySectionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="capitalize">{category} Banners</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {banners.length === 0 ? (
                    <p className="text-muted-foreground">No banners available</p>
                ) : (
                    <div className="space-y-4">
                        {banners.map((banner) => (
                            <BannerItem
                                key={banner._id}
                                banner={banner}
                                isActive={activeBannerId === banner._id}
                                onSetActive={() => onSetActive(banner._id, category)}
                                onDelete={() => onDelete(banner._id)}
                                onUpdateLink={(link, title) => onUpdateLink(banner._id, link, title)}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}