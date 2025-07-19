// lib/role.ts
import { Roles } from '@/types/globals'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';


export const checkRole = async (role: Roles) => {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const userRole = sessionClaims?.metadata.role

    const roleRedirects: Record<Roles, string> = {
        admin: '/admin',
        editor: '/editor',
        manager: '/writer',
    };

    if (!userRole || !Object.keys(roleRedirects).includes(userRole)) {
        redirect('/'); // fallback for unknown roles
    }

    if (userRole !== role) {
        // Redirect to the correct page for the user's role
        redirect(roleRedirects[userRole]);
    }

    // If role matches, allow access
    return true;
}

export const getCurrentRole = async (): Promise<Roles | null> => {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
        return null;
    }

    const userRole = sessionClaims?.metadata?.role as Roles | undefined;

    if (!userRole) {
        return null;
    }

    return userRole;
}

