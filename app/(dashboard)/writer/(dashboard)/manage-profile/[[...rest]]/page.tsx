import { UserProfile } from '@clerk/nextjs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ProfileForm } from '@/components/ProfileForm.client';

interface UserMetadata {
    bio?: string;
    socialLinks?: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        youtube?: string;
        tiktok?: string;
    };
}

const API_CONFIG = {
    backend_uri: process.env.NEXT_PUBLIC_BACKEND_URL,
    apiKey: process.env.NEXT_PUBLIC_API_SPECIAL_KEY,
};


export default async function ProfilePage() {
    const { userId } = await auth();
    const { backend_uri, apiKey } = API_CONFIG;

    if (!backend_uri || !apiKey) {
        return (
            <div className="p-4 text-center text-red-600">
                Something went wrong!!!. Please try again after certain time
            </div>
        );
    }

    if (!userId) {
        redirect('/sign-in');
    }

    // Fetch metadata from your backend
    let metadata: UserMetadata = {};

    try {
        const headers = new Headers({
            'x-special-key': apiKey,
            'Content-Type': 'application/json'
        });

        const response = await fetch(`${backend_uri}/api/users/${userId}/metadata`, {
            method: 'GET',
            headers,
            cache: 'no-store',
            next: { tags: ['userMetadata'] },
        });

        if (response.ok) {
            metadata = await response.json();
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Failed to fetch metadata:', error);
        // Consider adding error state handling here
    }

    return (
        <div className="flex flex-col items-center gap-8 p-4 sm:p-8 max-w-4xl mx-auto">
            <div className="w-full">
                <UserProfile routing="hash" />
            </div>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        Profile Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ProfileForm metadata={metadata} />
                </CardContent>
            </Card>
        </div>
    );
}