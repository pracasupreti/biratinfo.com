import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { Roles } from '@/types/globals';
import { categoryOptions } from './types/Post';

// Define protected routes and their required roles
const protectedRoutes = [
    { path: '/sriyog', role: 'admin' },
    { path: '/editor', role: 'editor' },
    { path: '/writer', role: 'manager' },
];

// Dynamically generate public category route matchers
const categoryMatchers = categoryOptions.map((c) => `/${c.value}/:path*`);

// Public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
    '/',
    ...categoryMatchers,
    '/author(.*)',
    '/privacy',
    '/terms',
    '/advertise',
    '/sign-in',
    '/sign-up',
    '/en(.*)',
    '/api/webhooks(.*)',
    '/api/posts(.*)',
    '/api/public-posts(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId, sessionClaims } = await auth();
    const { pathname } = req.nextUrl;
    const userRole = sessionClaims?.metadata.role as Roles | undefined;

    // Allow CORS preflight to pass without redirection
    if (req.method === 'OPTIONS') {
        return NextResponse.next();
    }

    // 1. Handle public routes
    if (isPublicRoute(req)) {
        return NextResponse.next();
    }

    // 2. Redirect unauthenticated users
    if (!userId) {
        const signInUrl = new URL('/sign-in', req.url);
        signInUrl.searchParams.set('redirect_url', req.url);
        return NextResponse.redirect(signInUrl);
    }

    // 3. Role-based access control
    const roleRedirects: Record<Roles, string> = {
        admin: '/sriyog',
        editor: '/editor',
        manager: '/writer',
    };

    // Handle users with no role or invalid role
    if (!userRole || !roleRedirects[userRole]) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Check if current route requires specific role
    const requiredRole = protectedRoutes.find(route =>
        pathname.startsWith(route.path)
    )?.role;

    if (requiredRole && userRole !== requiredRole) {
        // Redirect to their role-specific dashboard
        return NextResponse.redirect(new URL(roleRedirects[userRole], req.url));
    }

    // Allow access for all other cases
    return NextResponse.next();
});



// Middleware configuration - runs on all routes except static files
export const config = {
    matcher: [
        '/((?!_next|.*\\.(?:ico|png|jpg|jpeg|svg|webp|css|js|json|ttf|woff2?|map)).*)',
    ],
};