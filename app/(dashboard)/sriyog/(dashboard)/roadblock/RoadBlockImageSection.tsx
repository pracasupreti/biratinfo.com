// components/roadblock/RoadblockImageSection.tsx
'use client';

import { useState, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Trash2, UploadCloud } from 'lucide-react';
import { resizeAndCompressImage } from '@/components/CompressFile';
import { toast } from 'react-hot-toast';
import { deleteImage } from '@/lib/cloudinary';

interface RoadblockImageSectionProps {
    image: {
        url: string;
        publicId: string;
    } | null;
    onUploadSuccess: (result: { secure_url: string; public_id: string }) => void;
    onRemove: () => void;
}

export default function RoadblockImageSection({
    image,
    onUploadSuccess,
    onRemove
}: RoadblockImageSectionProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        setIsUploading(true);
        const toastId = toast.loading('Uploading banner image...');

        try {
            const file = e.target.files[0];

            // Compress and resize the image
            const compressedFile = await resizeAndCompressImage(
                file,
                1000, // width
                1250, // height (4:5 aspect ratio)
                0.8 // quality
            );

            // Upload to Cloudinary
            const formData = new FormData();
            formData.append('file', compressedFile);
            formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_ADVERTISEMENT_UPLOAD_PRESET || '');
            formData.append('folder', 'biratinfo/advertisement');
            formData.append('tags', 'roadblock_ads');

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!response.ok) throw new Error('Upload failed');

            const result = await response.json();
            onUploadSuccess({
                secure_url: result.secure_url,
                public_id: result.public_id
            });

            toast.success('Image uploaded successfully', { id: toastId });
        } catch (error) {
            console.error('Upload error:', error);
            toast.error(error instanceof Error ? error.message : 'Upload failed', { id: toastId });
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleRemove = async () => {
        if (!image?.publicId) return;

        if (confirm('Are you sure you want to remove this image?')) {
            const toastId = toast.loading('Deleting image...');

            try {
                await deleteImage(image.publicId);
                onRemove();
                toast.success('Image deleted successfully!', { id: toastId });
            } catch (error) {
                console.error('Failed to delete image:', error);
                toast.error('Failed to delete image', { id: toastId });
            }
        }
    };

    return (
        <div className="space-y-4 p-6 bg-gray-100 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800">Banner Image*</h3>

            <div className="space-y-4">
                <Label htmlFor="banner-image">Upload Image</Label>
                <div className="flex items-center gap-4">
                    <Input
                        id="banner-image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full max-w-md cursor-pointer"
                        disabled={isUploading}
                        ref={fileInputRef}
                    />
                    {isUploading && (
                        <div className="flex items-center text-sm text-muted-foreground">
                            <UploadCloud className="h-4 w-4 mr-2 animate-pulse" />
                            Uploading...
                        </div>
                    )}
                </div>
                <p className="text-sm text-muted-foreground">
                    Recommended size: 1000×1250 pixels (4:5 aspect ratio)
                </p>
            </div>

            {image?.url && (
                <div className="space-y-2">
                    <Label>Preview</Label>
                    <div className="relative w-full max-w-md aspect-[4/5] border rounded-md overflow-hidden">
                        <Image
                            src={image.url}
                            alt="Banner preview"
                            fill
                            className="object-cover"
                            priority
                        />
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="absolute top-2 right-2 bg-white/80 hover:bg-red-200 cursor-pointer"
                            onClick={handleRemove}
                            disabled={isUploading}
                        >
                            <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}