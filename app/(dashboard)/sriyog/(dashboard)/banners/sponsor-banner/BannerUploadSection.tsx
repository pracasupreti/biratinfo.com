/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import { ContentCategory } from './page';
import { resizeAndCompressImage } from '@/components/CompressFile';

interface BannerUploadSectionProps {
    onUploadSuccess: (result: any, category: ContentCategory) => void;
    selectedCategory: ContentCategory;
}

export function BannerUploadSection({ onUploadSuccess, selectedCategory }: BannerUploadSectionProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        setIsUploading(true);
        const toastId = toast.loading('Uploading banner...');

        try {
            // Resize and compress the image using your existing function
            const compressedFile = await resizeAndCompressImage(
                e.target.files[0],
                1000,
                1250,  // 1000*1250 = 2/2.5
                0.8
            );

            // Upload to Cloudinary
            const formData = new FormData();
            formData.append('file', compressedFile);
            formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_ADVERTISEMENT_UPLOAD_PRESET || '');
            formData.append('folder', 'biratinfo/advertisement');
            formData.append('tags', 'sponsor_banner');

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!response.ok) throw new Error('Upload failed');

            const result = await response.json();
            onUploadSuccess(result, selectedCategory);
        } catch (error) {
            console.error('Upload error:', error);
            toast.error(error instanceof Error ? error.message : 'Upload failed', { id: toastId });
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload New Banner</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={isUploading}
                    />
                    <Button
                        variant="default"
                        onClick={() => fileInputRef.current?.click()}
                        className="capitalize"
                        disabled={isUploading}
                    >
                        {isUploading ? 'Uploading...' : `Upload ${selectedCategory} Banner`}
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                        Images will be automatically resized to 1000×1250 pixels
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}