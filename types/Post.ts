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
    featuredIn: string[];
    postInNetwork: string[];
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
    heroImageCredit: string;
    ogImageCredit: string;
    sponsoredAds: string;
    access: string;
    audioFile: string | null;
    canonicalUrl: string;
    createdAt: string | Date | null;
    updatedAt: string | Date | null;
}


// homepage post props
export interface Author {
    _id: string;
    clerkId: string;
    firstName: string;
    lastName: string;
    avatar: string;
}

export interface IPost {
    _id: string;
    nepaliTitle: string;
    excerpt: string;
    category: string;
    categoryId: string;
    authors: Author[];
    heroBanner?: string;
    tags?: string[];
    creadtedAt?: string;
    updatedAt?: string;
}

export interface PostsResponse {
    success: boolean;
    post: IPost;
}

export type LatestSummariesByCategory = PostsResponse[] | null;

export interface SinglePost {
    _id: string;
    userId: { $oid: string };
    status: 'draft' | 'pending' | 'scheduled' | 'approved' | 'rejected';
    englishTitle: string;
    nepaliTitle: string;
    blocks: Block[];
    excerpt: string;
    authors: Author[]
    featuredIn: string[];
    postInNetwork: string[];
    category: string;
    categoryId: number;
    tags: string[];
    date: string | Date;
    time: string;
    language: string;
    readingTime: string;
    heroBanner: string | null;
    ogBanner: string | null;
    heroImageCredit: string;
    ogImageCredit: string;
    sponsoredAds: string;
    access: string;
    audioFile: string | null;
    canonicalUrl: string;
    createdAt: string | Date | null;
    updatedAt: string | Date | null;
}

export const categoryOptions = [
    { value: 'news', en: 'News', np: 'समाचार' },
    { value: 'sports', en: 'Sports', np: 'खेलकुद' },
    { value: 'entertainment', en: 'Entertainment', np: 'मनोरञ्जन' },
    { value: 'politics', en: 'Politics', np: 'राजनीति' },
    { value: 'tourism', en: 'Tourism', np: 'पर्यटन' },
    { value: 'education', en: 'Education', np: 'शिक्षा' },
    { value: 'health', en: 'Health', np: 'स्वास्थ्य' },
    { value: 'technology', en: 'Technology', np: 'विज्ञान र प्रविधि' },
    { value: 'economy', en: 'Economy', np: 'अर्थ / कारोबार' },
    { value: 'agriculture', en: 'Agriculture', np: 'कृषि' },
    { value: 'culture', en: 'Culture', np: 'संस्कृति' },
    { value: 'environment', en: 'Environment', np: 'पर्यावरण' },
    { value: 'opinion', en: 'Opinion', np: 'विचार' },
    { value: 'crime', en: 'Crime', np: 'अपराध' },
    { value: 'lifestyle', en: 'Lifestyle', np: 'जीवनशैली' },
    { value: 'international', en: 'International', np: 'अन्तर्राष्ट्रिय' },
];