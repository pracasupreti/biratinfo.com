'use server';
import { auth } from '@clerk/nextjs/server';

interface UserMetadataProps {
    formData: {
        bio?: string;
        socialLinks?: {
            facebook?: string;
            instagram?: string;
            twitter?: string;
            youtube?: string;
            tiktok?: string;
        };
    }
    token: string
}

export async function updateProfile({ formData, token }: UserMetadataProps) {
    const { userId } = await auth();

    if (!userId) {
        return { success: false, error: 'Not authenticated' };
    }

    try {
        const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backend_uri) throw new Error("Missing API endpoint");

        const response = await fetch(`${backend_uri}/api/users/${userId}/metadata`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        return { success: true };
    } catch (error) {
        console.error('Error updating profile:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update profile'
        };
    }
}