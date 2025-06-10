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

interface PostSidebarProps {
    isEditing?: boolean,
    isEditor?: boolean,
    isWriting?: boolean
}

export function PostSidebar({ isEditing, isEditor, isWriting }: PostSidebarProps) {
    const router = useRouter();
    const {
        category,
        tags,
        date,
        time,
        author,
        language,
        readingTime,
        heroBanner,
        ogBanner,
        imageCredit,
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

    const uploadToCloudinary = async (field: 'heroBanner' | 'ogBanner' | 'sponsoredAds', file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
        formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);
        formData.append('public_id', `posts/${uuidv4()}`);

        try {
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
                <h2 className="text-lg font-semibold text-gray-800 mb-1">Post Settings</h2>

                <div className="grid grid-cols-1 gap-3">
                    {/* Category */}
                    <div className="space-y-1">
                        <Label htmlFor="category" className='text-sm font-medium text-gray-800'>Category *</Label>
                        <Select
                            value={category}
                            onValueChange={(value) => setField('category', value)}
                        >
                            <SelectTrigger className="w-full bg-gray-100 h-8">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="news">News</SelectItem>
                                <SelectItem value="sports">Sports</SelectItem>
                                <SelectItem value="entertainment">Entertainment</SelectItem>
                                <SelectItem value="politics">Politics</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.category && <p className="text-red-500 text-xs mt-0.5">{errors.category}</p>}
                    </div>

                    {/* Tags */}
                    <div className="space-y-1">
                        <Label htmlFor="tags" className='text-sm font-medium text-gray-800'>Tags (comma separated) *</Label>
                        <Input
                            id="tags"
                            value={tags}
                            onChange={(e) => setField('tags', e.target.value)}
                            placeholder="tag1, tag2, tag3"
                            className="w-full bg-gray-100 h-8"
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

                    {/* Author */}
                    <AuthorSelect
                        value={author}
                        onChange={(value) => setField('author', value)}
                        error={errors.author}
                        isEditor={isEditor}
                    />

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

                    {/* OG Banner */}
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

                    {/* Image Credit */}
                    <div className="space-y-1">
                        <Label htmlFor="imageCredit" className='text-sm font-medium text-gray-800'>Image Credit</Label>
                        <Input
                            id="imageCredit"
                            value={imageCredit}
                            onChange={(e) => setField('imageCredit', e.target.value)}
                            placeholder="Image credit"
                            className="w-full bg-gray-100 h-8"
                        />
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
                {isEditor ? (
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