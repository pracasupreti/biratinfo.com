'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateProfile } from '@/app/actions';
import { FacebookIcon, InstagramIcon, TiktokIcon, TwitterIcon, YoutubeIcon } from './SocialIcons';
import { useAuth } from '@clerk/nextjs';

interface ProfileFormProps {
    metadata: {
        bio?: string;
        socialLinks?: {
            facebook?: string;
            instagram?: string;
            twitter?: string;
            youtube?: string;
            tiktok?: string;
        };
    };
}

interface FormData {
    bio: string;
    socialLinks: {
        facebook: string;
        instagram: string;
        twitter: string;
        youtube: string;
        tiktok: string;
    };
}

function countWords(text: string): number {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
}

export function ProfileForm({ metadata }: ProfileFormProps) {
    const { getToken } = useAuth();
    const [formData, setFormData] = useState<FormData>({
        bio: metadata.bio || '',
        socialLinks: {
            facebook: metadata.socialLinks?.facebook || '',
            instagram: metadata.socialLinks?.instagram || '',
            twitter: metadata.socialLinks?.twitter || '',
            youtube: metadata.socialLinks?.youtube || '',
            tiktok: metadata.socialLinks?.tiktok || '',
        }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name in formData.socialLinks) {
            setFormData(prev => ({
                ...prev,
                socialLinks: {
                    ...prev.socialLinks,
                    [name]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = await getToken();
            if (!token) throw new Error("Authentication required");

            const wordCount = formData.bio?.split(/\s+/).length || 0;
            if (wordCount > 100) {
                toast.error('Bio must be 100 words or less');
                return;
            }

            const result = await updateProfile({ formData, token });

            if (result?.success) {
                toast.success('Profile updated successfully');
            } else {
                throw new Error(result?.error || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to update profile');
        }
    };

    const socialPlatforms = [
        { name: 'facebook', icon: <FacebookIcon className="h-5 w-5" /> },
        { name: 'instagram', icon: <InstagramIcon className="h-5 w-5" /> },
        { name: 'twitter', icon: <TwitterIcon className="h-5 w-5" /> },
        { name: 'youtube', icon: <YoutubeIcon className="h-5 w-5" /> },
        { name: 'tiktok', icon: <TiktokIcon className="h-5 w-5" /> }
    ];

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6">
                {/* Bio Section */}
                <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself..."
                        className="min-h-[100px]"
                    />
                    <p className="text-sm text-muted-foreground">
                        Word count: {countWords(formData.bio)}/100
                    </p>
                </div>

                {/* Social Links Section */}
                <div className="space-y-4">
                    <Label>Social Media Links</Label>
                    <div className="space-y-3">
                        {socialPlatforms.map((platform) => (
                            <div key={platform.name} className="flex items-center gap-3">
                                {platform.icon}
                                <Input
                                    name={platform.name}
                                    value={formData.socialLinks[platform.name as keyof typeof formData.socialLinks]}
                                    onChange={handleInputChange}
                                    placeholder={`https://${platform.name}.com/username`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <Button type="submit" className="w-full sm:w-auto">
                    Save Changes
                </Button>
            </div>
        </form>
    );
}