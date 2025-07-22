export interface ImageData {
    url: string
    public_id: string
}

export interface CTA {
    name: string
    url: string
}

export interface AudioData {
    url: string
    public_id: string
    duration?: number
}


export default interface Post {
    _id: string;
    userId: { $oid: string };
    status: 'draft' | 'pending' | 'scheduled' | 'approved' | 'rejected';
    title: string,
    isNepali: boolean,
    content: string;
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
    heroBanner: ImageData | null;
    ogBanner: ImageData | null;
    heroImageCredit: string;
    ogImageCredit: string;
    sponsoredAds: string;
    access: string;
    audio?: AudioData | null;
    audioCredit?: string;
    sponsorLink?: string
    ctas?: CTA[];
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
    username?: string
    bio?: string;
    socialLinks?: {
        facebook?: string
        instagram?: string
        twitter?: string
        youtube?: string
        tiktok?: string
    }
}

export interface IPost {
    _id: string;
    title: string;
    excerpt: string;
    category: string;
    categoryId: string;
    featuredIn: [string]
    authors: Author[];
    heroBanner?: ImageData | null;
    tags?: string[];
    creadtedAt?: string;
    updatedAt?: string;
}

export interface PostsResponse {
    success: boolean;
    post: IPost[];
}

export type LatestSummariesByCategory = PostsResponse[] | null;

export interface SinglePost {
    _id: string;
    userId: { $oid: string };
    status: 'draft' | 'pending' | 'scheduled' | 'approved' | 'rejected';
    title: string,
    isNepali: boolean,
    content: string;
    excerpt: string;
    featuredIn: string[];
    postInNetwork: string[];
    category: string;
    categoryId: number;
    tags: string[];
    date: string | Date;
    time: string;
    authors: Author[];
    language: string;
    readingTime: string;
    heroBanner: ImageData | null;
    ogBanner: ImageData | null;
    heroImageCredit: string;
    ogImageCredit: string;
    sponsoredAds: string;
    access: string;
    audio?: AudioData | null;
    audioCredit?: string
    sponsorLink?: string
    ctas?: CTA[];
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
    { value: 'security', en: 'Security', np: 'सुरक्षा' },
    { value: 'technology', en: 'Technology', np: 'प्रविधि' },
    { value: 'economy', en: 'Economy', np: 'अर्थतन्त्र' },
    { value: 'agriculture', en: 'Agriculture', np: 'कृषि' },
    { value: 'culture', en: 'Culture', np: 'संस्कृति' },
    { value: 'environment', en: 'Environment', np: 'पर्यावरण' },
    { value: 'opinion', en: 'Opinion', np: 'विचार' },
    { value: 'crime', en: 'Crime', np: 'अपराध' },
    { value: 'lifestyle', en: 'Lifestyle', np: 'जीवनशैली' },
    { value: 'automobile', en: 'Automobile', np: 'सवारीसाधन' },
    { value: 'blog', en: 'Blog', np: 'ब्लग' },
    { value: 'art', en: 'Art', np: 'कला' },
    { value: 'editorial', en: 'Editorial', np: 'सम्पादकीय' },
    { value: 'startups', en: 'Startups', np: 'स्टार्टअप' },
    { value: 'law', en: 'Law', np: 'कानून' },
    { value: 'market', en: 'Market', np: 'बजार' },
    { value: 'interview', en: 'Interview', np: 'अन्तर्वार्ता' },
    { value: 'food', en: 'Food', np: 'खानपान' },
    { value: 'employment', en: 'Employment', np: 'रोजगारी' },
    { value: 'literature', en: 'Literature', np: 'साहित्य' },
    { value: 'complain', en: 'Complain', np: 'गुनासो' },
];

export const tagOptions = [
    { value: 'breaking-news', en: 'Breaking News', np: 'ताजा खबर' },
    { value: 'covid19', en: 'COVID-19', np: 'कोभिड-१९' },
    { value: 'election', en: 'Election', np: 'निर्वाचन' },
    { value: 'visit-nepal-2025', en: 'Visit Nepal 2025', np: 'भ्रमण वर्ष २०२५' },
    { value: 'budget-2025', en: 'Budget 2025', np: 'बजेट २०२५' },
    { value: 'startup-ecosystem', en: 'Startup Ecosystem', np: 'स्टार्टअप वातावरण' },
    { value: 'weather-alert', en: 'Weather Alert', np: 'मौसम जानकारी' },
    { value: 'earthquake', en: 'Earthquake', np: 'भूकम्प' },
    { value: 'kathmandu', en: 'Kathmandu', np: 'काठमाडौं' },
    { value: 'loadshedding', en: 'Loadshedding', np: 'लोडसेडिङ' },
    { value: 'floods', en: 'Floods', np: 'बाढी' },
    { value: 'gold-price', en: 'Gold Price', np: 'सुनको मूल्य' },
    { value: 'business', en: 'Business', np: 'व्यापार' },
    { value: 'stock-market', en: 'Stock Market', np: 'सेयर बजार' },
    { value: 'nepal-cricket', en: 'Nepal Cricket', np: 'नेपाल क्रिकेट' },
    { value: 'tech-news', en: 'Tech News', np: 'प्रविधि समाचार' },
    { value: 'ncell', en: 'Ncell', np: 'एनसेल' },
    { value: 'movie', en: 'Movie', np: 'चलचित्र' },
    { value: 'festival', en: 'Festival', np: 'चाडपर्व' },
    { value: 'himalayas', en: 'Himalayas', np: 'हिमालय' },
    { value: 'traffic-update', en: 'Traffic Update', np: 'यातायात जानकारी' }
];

export const Language = [
    { value: 'english', language: 'English' },
    { value: 'nepali', language: 'Nepali' },
    { value: 'hindi', language: 'Hindi' },
    { value: 'maithali', language: 'Maithali' },
    { value: 'bhojpuri', language: 'Bhojpuri' },
    { value: 'tharu', language: 'Tharu' },
    { value: 'nepal bhasha', language: 'Nepal bhasha' },
    { value: 'sanskrit', language: 'Sanskrit' },
    { value: 'urdu', language: 'Urdu' },
    { value: 'arabic', language: 'Arabic' },
    { value: 'korean', language: 'Korean' },
]