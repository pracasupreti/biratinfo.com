'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

import { PostActions } from './PostActions'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { EditorPostAction } from '../editor/EditorPostAction'
import { usePostStore } from '@/store/PostStore'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { AuthorSelect } from './AuthorSelect'
import { MultiSelect } from '../MultiSelectComponent'
import { resizeAndCompressImage } from '../CompressFile'

interface PostSidebarProps {
    isEditing?: boolean,
    isEditor?: boolean,
    isWriting?: boolean
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

const tagOptions = [
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


export function PostSidebar({ isEditing, isEditor, isWriting }: PostSidebarProps) {
    const router = useRouter();
    const {
        category,
        tags = [],
        date,
        time,
        authors = [],
        language,
        readingTime,
        heroBanner,
        ogBanner,
        heroImageCredit,
        ogImageCredit,
        sponsoredAds,
        access,
        canonicalUrl,
        errors,
        setField
    } = usePostStore()

    const [isHeroUploading, setIsHeroUploading] = useState<boolean>(false);
    const [isOgUploading, setIsOgUploading] = useState<boolean>(false);
    const [isSponsoredAdsUploading, setIsSponsoredAdsUploading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [sidebarLanguage, setSidebarLanguage] = useState<'en' | 'np'>('en');

    const uploadToCloudinary = async (field: 'heroBanner' | 'ogBanner' | 'sponsoredAds', file: File): Promise<string> => {
        try {
            if (field === 'heroBanner') setIsHeroUploading(true);
            else if (field === 'ogBanner') setIsOgUploading(true);
            else setIsSponsoredAdsUploading(true);

            // Set target dimensions
            const { width, height } =
                field === 'sponsoredAds'
                    ? { width: 1000, height: 1400 }
                    : { width: 1400, height: 800 };

            // Resize and compress using canvas
            const compressedFile = await resizeAndCompressImage(file, width, height, 0.8);

            const formData = new FormData();
            formData.append('file', compressedFile);
            formData.append('folder', 'biratinfo/posts');
            formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
            formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);
            formData.append('public_id', `posts/${uuidv4()}`);


            if (field === 'heroBanner') {
                setIsHeroUploading(true);
            } else if (field === 'ogBanner') {
                setIsOgUploading(true)
            } else {
                setIsSponsoredAdsUploading(true)
            }

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            return data.secure_url;

        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        } finally {
            if (field === 'heroBanner') {
                setIsHeroUploading(false);
            } else if (field === 'ogBanner') {
                setIsOgUploading(false)
            } else {
                setIsSponsoredAdsUploading(false)
            }
        }
    };

    const handleFileUpload = (field: 'heroBanner' | 'ogBanner' | 'sponsoredAds') => async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            try {
                const imageUrl = await uploadToCloudinary(field, file);
                setField(field, imageUrl);
            } catch (error) {
                console.error(error)
                setField(field, null);
            }
        }
    };

    const handleActionClick = async (action: () => Promise<void>) => {
        setIsSubmitting(true);
        try {
            await action();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="shadow-sm rounded-md border border-gray-200 text-sm">
            <CardContent className="p-3 space-y-3">
                <div className='flex justify-between items-center gap'>
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">Post Settings</h2>
                    <Button onClick={() => setSidebarLanguage(prev => prev === 'en' ? 'np' : 'en')} variant={'outline'} className='cursor-pointer'>
                        {sidebarLanguage === 'en' ? 'Switch to Nepali' : 'Switch to English'}
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {/* Category */}
                    <div className="space-y-1">
                        <Label htmlFor="category" className='text-sm font-medium text-gray-800'>Category *</Label>
                        <Select value={category} onValueChange={(value) => setField('category', value)}>
                            <SelectTrigger className="w-full bg-gray-100 h-8">
                                <SelectValue placeholder={sidebarLanguage === 'np' ? 'वर्ग छान्नुहोस्' : 'Select category'} />
                            </SelectTrigger>
                            <SelectContent>
                                {categoryOptions.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {sidebarLanguage === 'np' ? `${opt.np} (${opt.en})` : `${opt.en} (${opt.np})`}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {errors.category && <p className="text-red-500 text-xs mt-0.5">{errors.category}</p>}
                    </div>

                    {/* Tags */}
                    <div className="space-y-1">
                        <Label className='text-sm font-medium text-gray-800'>Tags (max 5)</Label>
                        <MultiSelect
                            options={tagOptions.map(opt => ({
                                value: opt.value,
                                label: sidebarLanguage === 'np' ? `${opt.np} (${opt.en})` : `${opt.en} (${opt.np})`
                            }))}
                            value={tags}
                            onChange={(newTags) => setField('tags', newTags)}
                            placeholder={sidebarLanguage === 'np' ? 'ट्याग थप्नुहोस्' : 'Add tags'}
                            maxSelections={5}
                        />

                        {errors.tags && <p className="text-red-500 text-xs mt-0.5">{errors.tags}</p>}
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <Label htmlFor="date" className='text-sm font-medium text-gray-800'>Date *</Label>
                            <Input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setField('date', e.target.value)}
                                className="w-full bg-gray-100 h-8"
                            />
                            {errors.date && <p className="text-red-500 text-xs mt-0.5">{errors.date}</p>}
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="time" className='text-sm font-medium text-gray-800'>Time *</Label>
                            <Input
                                id="time"
                                type="time"
                                value={time}
                                onChange={(e) => setField('time', e.target.value)}
                                className="w-full bg-gray-100 h-8"
                            />
                            {errors.time && <p className="text-red-500 text-xs mt-0.5">{errors.time}</p>}
                        </div>
                    </div>

                    {/* Authors */}
                    <div className="space-y-1">
                        <div className="space-y-2">
                            <AuthorSelect
                                value={authors}
                                onChange={(newAuthors) => setField('authors', newAuthors)}
                                isEditor={isEditor}
                                error={errors.authors}
                                maxSelections={2}
                            />
                        </div>
                    </div>

                    {/* Language */}
                    <div className="space-y-1">
                        <Label htmlFor="language" className='text-sm font-medium text-gray-800'>Language</Label>
                        <Select
                            value={language}
                            onValueChange={(value) => setField('language', value)}
                        >
                            <SelectTrigger className="w-full bg-gray-100 h-8">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="nepali">Nepali</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Reading Time */}
                    {isEditor && (
                        <div className="space-y-1">
                            <Label htmlFor="readingTime" className='text-sm font-medium text-gray-800'>Reading Time</Label>
                            <Select
                                value={readingTime}
                                onValueChange={(value) => setField('readingTime', value)}
                            >
                                <SelectTrigger className="w-full bg-gray-100 h-8">
                                    <SelectValue placeholder="Select reading time" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[3, 4, 5, 6, 7, 8, 9, 10].map(min => (
                                        <SelectItem key={min} value={`${min} min`}>{min} min</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* Hero Banner */}
                    <div className='space-y-1'>
                        <FileUploadSection
                            label="Hero Banner"
                            field="heroBanner"
                            value={heroBanner}
                            isUploading={isHeroUploading}
                            handleFileUpload={handleFileUpload}
                            router={router}
                            isEditor={isEditor}
                            isOtherUploading={isOgUploading || isSponsoredAdsUploading || isSubmitting}
                        />
                        {errors.heroBanner && <p className="text-red-500 text-xs mt-0.5">{errors.heroBanner}</p>}
                    </div>

                    {/* OG Banner */}
                    <div className='space-y-1'>
                        <FileUploadSection
                            label="OG Banner"
                            field="ogBanner"
                            value={ogBanner}
                            isUploading={isOgUploading}
                            handleFileUpload={handleFileUpload}
                            router={router}
                            isEditor={isEditor}
                            isOtherUploading={isHeroUploading || isSponsoredAdsUploading || isSubmitting}
                        />
                        {errors.ogBanner && <p className="text-red-500 text-xs mt-0.5">{errors.ogBanner}</p>}
                    </div>

                    {/* Sponsored Ads */}
                    <FileUploadSection
                        label="Sponsored Ads"
                        field="sponsoredAds"
                        value={sponsoredAds}
                        isUploading={isSponsoredAdsUploading}
                        handleFileUpload={handleFileUpload}
                        router={router}
                        isEditor={isEditor}
                        isOtherUploading={isHeroUploading || isOgUploading || isSubmitting}
                    />

                    {/* Hero Image Credit */}
                    <div className="space-y-1">
                        <Label htmlFor="imageCredit" className='text-sm font-medium text-gray-800'>Hero Image Credit</Label>
                        <Input
                            id="heroImageCredit"
                            value={heroImageCredit}
                            onChange={(e) => setField('heroImageCredit', e.target.value)}
                            placeholder="Image credit"
                            className="w-full bg-gray-100 h-8"
                        />
                        {errors.heroImageCredit && <p className="text-red-500 text-xs mt-0.5">{errors.heroImageCredit}</p>}
                    </div>

                    {/* Og Image Credit */}
                    <div className="space-y-1">
                        <Label htmlFor="imageCredit" className='text-sm font-medium text-gray-800'>Og Image Credit</Label>
                        <Input
                            id="ogImageCredit"
                            value={ogImageCredit}
                            onChange={(e) => setField('ogImageCredit', e.target.value)}
                            placeholder="Image credit"
                            className="w-full bg-gray-100 h-8"
                        />
                        {errors.ogImageCredit && <p className="text-red-500 text-xs mt-0.5">{errors.ogImageCredit}</p>}
                    </div>

                    {/* Access */}
                    <div className="space-y-1">
                        <Label htmlFor="access" className='text-sm font-medium text-gray-800'>Access</Label>
                        <Select
                            value={access}
                            onValueChange={(value) => setField('access', value)}
                        >
                            <SelectTrigger className="w-full bg-gray-100 h-8">
                                <SelectValue placeholder="Select access level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="public">Public</SelectItem>
                                <SelectItem value="private">Private</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Canonical URL */}
                    <div className="space-y-1">
                        <Label htmlFor="canonicalUrl" className='text-sm font-medium text-gray-800'>Canonical URL</Label>
                        <Input
                            id="canonicalUrl"
                            value={canonicalUrl}
                            onChange={(e) => setField('canonicalUrl', e.target.value)}
                            placeholder="Canonical URL"
                            className="w-full bg-gray-100 h-8"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                {isEditor && isEditing ? (
                    <EditorPostAction
                        onActionClick={handleActionClick}
                        isSubmitting={isSubmitting}
                    />
                ) : (
                    <PostActions
                        isEditing={isEditing}
                        isSubmitting={isSubmitting}
                        isWriting={isWriting}
                        onActionClick={handleActionClick}
                    />
                )}
            </CardContent>
        </Card>
    );
}

interface FileUploadSectionProps {
    label: string;
    field: 'heroBanner' | 'ogBanner' | 'sponsoredAds';
    value: string | null;
    isUploading: boolean;
    handleFileUpload: (field: 'heroBanner' | 'ogBanner' | 'sponsoredAds') => (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    router: ReturnType<typeof useRouter>;
    isEditor?: boolean;
    isOtherUploading: boolean;
}

const FileUploadSection = ({
    label,
    field,
    value,
    isUploading,
    handleFileUpload,
    isOtherUploading
}: FileUploadSectionProps) => {
    return (
        <div className="space-y-1">
            <Label htmlFor={field} className='text-sm font-medium text-gray-700'>{label}</Label>
            {value ? (
                <Image
                    src={value}
                    alt={`${label} preview`}
                    className="w-full h-auto rounded-sm shadow-xs"
                    width={800}
                    height={600}
                    style={{ objectFit: 'contain' }}
                    quality={100}
                />
            ) : (
                <div className="border border-dashed border-gray-300 rounded-sm p-2 flex items-center justify-center text-gray-500 text-xs">
                    No image uploaded
                </div>
            )}
            <Input
                id={field}
                type="file"
                accept="image/*"
                onChange={handleFileUpload(field)}
                className="hidden"
            />
            <Button
                type="button"
                onClick={() => document.getElementById(field)?.click()}
                className="w-full h-8 text-sm"
                disabled={isUploading || isOtherUploading}
            >
                {isUploading ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : 'Upload'}
            </Button>
        </div>
    )
}