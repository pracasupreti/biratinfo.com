export interface Block {
    content: string
    link?: string // Optional link for each block
}
export default interface Post {
    _id: string;
    userId: { $oid: string };
    status: 'draft' | 'pending' | 'scheduled' | 'approved' | 'rejected';
    englishTitle: string;
    nepaliTitle: string;
    blocks: Block[];
    excerpt: string;
    featuredIn: boolean[];
    postInNetwork: boolean[];
    category: string;
    categoryId: number;
    tags: string[];
    date: string | Date;
    time: string;
    authors: string[];
    language: string;
    readingTime: string;
    heroBanner: string | null;
    ogBanner: string | null;
    imageCredit: string;
    sponsoredAds: boolean;
    access: string;
    audioFile: string | null;
    canonicalUrl: string;
    createdAt: string | Date | null;
    updatedAt: string | Date | null;
}