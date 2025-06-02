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


interface PostSidebarProps {
    isEditing?: boolean,
    isEditor?: boolean
}

export function PostSidebar({ isEditing = false, isEditor }: PostSidebarProps) {
    const router = useRouter();
    const {
        category,
        tags,
        date,
        time,
        author,
        language,
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



    // CLOUDINARY UPLOAD
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
                setField(field, imageUrl); // Replace with Cloudinary URL
            } catch (error) {
                console.error(error)
                setField(field, null);
                // Handle error (e.g., show toast notification)
            }
        }
    };

    return (
        <Card className="space-y-6 shadow-xl">
            <CardContent className="space-y-4">
                <h2 className="text-xl font-semibold">Post Settings</h2>

                {/* Category */}
                <div>
                    <Label htmlFor="category" className='text-2xl'>Category *</Label>
                    <Select
                        value={category}
                        onValueChange={(value) => setField('category', value)}
                    >
                        <SelectTrigger className="mt-2 text-lg">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectItem value="news" className="text-lg">News</SelectItem>
                            <SelectItem value="sports" className="text-lg">Sports</SelectItem>
                            <SelectItem value="entertainment" className="text-lg">Entertainment</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                {/* Tags */}
                <div>
                    <Label htmlFor="tags" className='text-2xl'>Tags (comma separated) *</Label>
                    <Input
                        id="tags"
                        value={tags}
                        onChange={(e) => setField('tags', e.target.value)}
                        className="mt-2 bg-zinc-100"
                    />
                    {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="date" className='text-2xl'>Date *</Label>
                        <Input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setField('date', e.target.value)}
                            className="mt-2 text-lg"
                        />
                        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                    </div>
                    <div>
                        <Label htmlFor="time" className='text-2xl'>Time *</Label>
                        <Input
                            id="time"
                            type="time"
                            value={time}
                            onChange={(e) => setField('time', e.target.value)}
                            className="mt-2"
                        />
                        {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                    </div>
                </div>

                {/* Author */}
                <div>
                    <Label htmlFor="author" className='text-2xl'>Author *</Label>
                    <Input
                        id="author"
                        value={author}
                        onChange={(e) => setField('author', e.target.value)}
                        className="mt-2 bg-zinc-100"
                    />
                    {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
                </div>

                {/* Language */}
                <div>
                    <Label htmlFor="language" className='text-2xl'>Language</Label>
                    <Select
                        value={language}
                        onValueChange={(value) => setField('language', value)}
                    >
                        <SelectTrigger className="mt-2 text-lg">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="english" className="text-lg">English</SelectItem>
                            <SelectItem value="nepali" className="text-lg">Nepali</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Hero Banner */}
                <div>
                    <Label htmlFor="heroBanner" className='text-2xl'>Hero Banner</Label>
                    <div className="flex items-center gap-2 mt-2 flex-col">
                        <Input
                            id="heroBanner"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                            onChange={handleFileUpload('heroBanner')}
                            className="hidden"
                        />
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => document.getElementById('heroBanner')?.click()}
                        >
                            {isHeroUploading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : heroBanner ? (
                                typeof heroBanner === 'string' ? 'Uploaded' : heroBanner
                            ) : (
                                'Browse...'
                            )}
                        </Button>
                        {isEditor && heroBanner && <Button variant={'secondary'} className='w-full cursor-pointer' onClick={() => router.push(heroBanner)}>View Image</Button>}
                    </div>
                    {errors.heroBanner && <p className="text-red-500 text-sm mt-1">{errors.heroBanner}</p>}
                </div>

                {/* OG Banner */}
                <div>
                    <Label htmlFor="ogBanner" className='text-2xl'>OG Banner</Label>
                    <div className="flex items-center gap-2 mt-2 flex-col">
                        <Input
                            id="ogBanner"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                            onChange={handleFileUpload('ogBanner')}
                            className="hidden"
                        />
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => document.getElementById('ogBanner')?.click()}
                        >
                            {isOgUploading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : ogBanner ? (
                                typeof ogBanner === 'string' ? 'Uploaded' : ogBanner
                            ) : (
                                'Browse...'
                            )}
                        </Button>
                        {isEditor && ogBanner && <Button variant={'secondary'} className='w-full cursor-pointer' onClick={() => router.push(ogBanner)}>View Image</Button>}
                    </div>
                    {errors.ogBanner && <p className="text-red-500 text-sm mt-1">{errors.ogBanner}</p>}
                </div>

                {/* Image Credit */}
                <div>
                    <Label htmlFor="imageCredit" className='text-2xl'>Image Credit *</Label>
                    <Input
                        id="imageCredit"
                        value={imageCredit}
                        onChange={(e) => setField('imageCredit', e.target.value)}
                        className="mt-2"
                    />
                    {errors.imageCredit && <p className="text-red-500 text-sm mt-1">{errors.imageCredit}</p>}
                </div>

                {/* Sponsored Ads */}
                <div>
                    <Label htmlFor="ogBanner" className='text-2xl'>Sponsored Ads</Label>
                    <div className="flex items-center gap-2 mt-2 flex-col">
                        <Input
                            id="sponsoredAds"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                            onChange={handleFileUpload('sponsoredAds')}
                            className="hidden"
                        />
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => document.getElementById('sponsoredAds')?.click()}
                        >
                            {isSponsoredAdsUploading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : sponsoredAds ? (
                                typeof sponsoredAds === 'string' ? 'Uploaded' : sponsoredAds
                            ) : (
                                'Browse...'
                            )}
                        </Button>
                        {isEditor && sponsoredAds && <Button variant={'secondary'} className='w-full cursor-pointer' onClick={() => router.push(sponsoredAds)}>View Image</Button>}
                    </div>
                    {errors.sponsoredAds && <p className="text-red-500 text-sm mt-1">{errors.sponsoredAds}</p>}
                </div>

                {/* Access */}
                <div>
                    <Label htmlFor="access" className='text-2xl'>Access</Label>
                    <Select
                        value={access}
                        onValueChange={(value) => setField('access', value)}
                    >
                        <SelectTrigger className="mt-2 text-lg">
                            <SelectValue placeholder="Select access" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="public" className="text-lg">Public</SelectItem>
                            <SelectItem value="private" className="text-lg">Private</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Canonical URL */}
                <div>
                    <Label htmlFor="canonicalUrl" className='text-2xl'>Canonical URL</Label>
                    <Input
                        id="canonicalUrl"
                        value={canonicalUrl}
                        onChange={(e) => setField('canonicalUrl', e.target.value)}
                        className="mt-2 bg-zinc-100"
                    />
                </div>

                {/* Action Buttons */}
                {isEditor ?
                    <EditorPostAction /> : <PostActions isEditing={isEditing} />}
            </CardContent>
        </Card>
    )
}