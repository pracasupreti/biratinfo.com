'use client'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs';
import { Plus, PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation';

export const DashboardHeader = () => {
    const router = useRouter();
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Editor Dashboard</h1>
            <div className='flex gap-6'>
                <UserButton />
                <Button onClick={() => router.push('/editor/post-form')}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Write New Post
                </Button>

            </div>
        </div>
    )
}