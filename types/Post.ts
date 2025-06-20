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
    featuredIn: boolean[];
    postInNetwork: boolean[];
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
