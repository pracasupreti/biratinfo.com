/* eslint-disable @typescript-eslint/no-explicit-any */
import { clerkClient } from '@clerk/nextjs/server'
import { SearchUsers } from './SearchUsers'
import UserTable from './UserTable'



interface UsersPageProps {
    searchParams?: Promise<any> | undefined
}

export default async function UsersPage({
    searchParams,
}: UsersPageProps) {
    const query = await searchParams

    const user = await clerkClient();
    const userResponse = await user.users.getUserList({
        limit: 100,
        query,
    });

    const getPostsCount = async () => {
        // Replace with actual fetch to your backend
        return Math.floor(Math.random() * 10) // Mock data
    }

    // Transform users data
    const userData = await Promise.all(
        userResponse.data.map(async (user) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`.trim() || 'Anonymous',
            email: user.emailAddresses[0]?.emailAddress || '',
            role: (user.publicMetadata.role as string) || 'user',
            posts: await getPostsCount(),
            imageUrl: user.imageUrl,
        }))
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">User Management</h1>
            </div>

            <SearchUsers />

            <UserTable users={userData} />
        </div>
    )
}