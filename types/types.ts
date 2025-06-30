// types/types.ts
export type ContentCategory = 'Home' | 'Sports' | 'Economy' | 'Politics' | 'Entertainment' | 'Technology' | 'Health' | 'Tourism' | 'Agriculture' | 'Education' | 'Lifestyle';

export interface Banner {
    _id: string;
    url: string;
    category: ContentCategory;
    status: 'active' | 'inactive';
    name: string;
    createdAt?: string;
    updatedAt?: string;
    link?: string;
}