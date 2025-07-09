/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import { useRef } from 'react';
import { ContentCategory } from './page';

interface BannerUploadSectionProps {
    onUploadSuccess: (result: any, category: ContentCategory) => void;
    selectedCategory: ContentCategory;
}

export function BannerUploadSection({ onUploadSuccess, selectedCategory }: BannerUploadSectionProps) {
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
                        tags: ['sponsor_banner'],
                        resourceType: 'image',
                        multiple: false,
                        maxFiles: 1,
                        clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'avif'],
                        maxImageFileSize: 5000000,
                    }}
                    onSuccess={(result) => {
                        if (currentCategoryRef.current) {
                            onUploadSuccess(result, currentCategoryRef.current);
                        } else {
                            toast.error("No category selected");
                        }
                    }}
                    onError={(error) => {
                        console.error('Upload error:', error);
                        toast.error('Upload failed');
                    }}
                >
                    {({ open }) => {
                        const handleOpen = () => {
                            currentCategoryRef.current = selectedCategory;
                            open();
                        };

                        return (
                            <div className="space-y-4">
                                <Button
                                    variant="default"
                                    onClick={handleOpen}
                                    className="capitalize"
                                >
                                    Upload {selectedCategory} Banner
                                </Button>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Recommended ratio: 9/13 (width/height)
                                </p>
                            </div>
                        );
                    }}
                </CldUploadWidget>
            </CardContent>
        </Card>
    );
}
