// types/types.ts
export type ContentCategory = 'Home' | 'News' | 'Sports' | 'Entertainment' | 'Politics' | 'Tourism' | 'Education' | 'Health' | 'Security' | 'Technology' | 'Economy' | 'Agriculture' | 'Culture' | 'Environment' | 'Opinion' | 'Crime' | 'Lifestyle' | 'Automobile' | 'Blog' | 'Art' | 'Editorial' | 'Startups' | 'Law' | 'Market' | 'Interview' | 'Food' | 'Employment' | 'Literature' | 'International' | 'Complain';

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