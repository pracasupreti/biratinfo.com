/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import { useRef } from 'react';
import { ContentCategory } from '@/types/types';

interface BannerUploadSectionProps {
    onUploadSuccess: (result: any, category: ContentCategory) => void;
    categories: ContentCategory[];
}

export function BannerUploadSection({ onUploadSuccess, categories }: BannerUploadSectionProps) {
    const currentCategoryRef = useRef<ContentCategory | null>(null);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload New Banner</CardTitle>
            </CardHeader>
            <CardContent>
                <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_ADVERTISEMENT_UPLOAD_PRESET || ''}
                    options={{
                        folder: 'biratinfo/advertisement',
                        tags: ['header_banner'],
                        resourceType: 'image',
                        multiple: false,
                        maxFiles: 1,
                        clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'avif'],
                        maxImageFileSize: 5000000,
                    }}
                    onSuccess={(result: any) => {
                        console.log('Widget upload success:', result);
                        if (currentCategoryRef.current) {
                            onUploadSuccess(result, currentCategoryRef.current);
                        } else {
                            console.warn('No category selected during upload.');
                        }
                    }}
                    onError={(error) => {
                        console.error('Upload error:', error);
                        toast.error('Upload failed');
                    }}
                >
                    {({ open }) => {
                        const handleOpen = (category: ContentCategory) => {
                            currentCategoryRef.current = category;
                            open();
                        };

                        return (
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2 cursor-pointer">
                                    {categories.map((category) => (
                                        <Button
                                            key={category}
                                            variant="outline"
                                            onClick={() => handleOpen(category)}
                                            className="capitalize"
                                        >
                                            Upload {category} Banner
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        );
                    }}
                </CldUploadWidget>
            </CardContent>
        </Card>
    );
}
