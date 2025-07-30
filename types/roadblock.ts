// types/roadblock.ts
export type RoadblockBanner = {
    _id: string;
    link: string;
    image: {
        url: string;
        publicId: string;
    };
    closeButtonDelay: number;
    bannerTimeDelay: number;
    repeat: 'never' | 'daily' | 'weekly' | 'monthly' | 'yearly';
    networks: 'all' | string[];
    location: 'homepage' | 'article' | 'both';
    devices: 'mobile' | 'tablet' | 'desktop' | 'all';
    hideForLoggedIn: boolean;
    startDate: string;
    endDate: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};

export type RoadblockFormData = {
    link: string;
    image: {
        url: string;
        publicId: string;
    } | null;
    closeButtonDelay: number;
    bannerTimeDelay: number;
    repeat: 'never' | 'daily' | 'weekly' | 'monthly' | 'yearly';
    networks: 'all' | string[];
    location: 'homepage' | 'article' | 'both';
    devices: 'mobile' | 'tablet' | 'desktop' | 'all';
    hideForLoggedIn: boolean;
    startDate: Date | undefined;
    endDate: Date | undefined;
};