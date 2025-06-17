'use client'
import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function Header() {
    return (
        <header className="sticky top-0 z-40 flex items-center justify-between h-15 px-6 bg-white border-b border-gray-200">
            {/* Search Bar */}
            <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search posts, authors..."
                    className="pl-10 bg-gray-50 border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300"
                />
            </div>

            {/* User Controls */}
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "h-8 w-8",
                                userButtonPopoverCard: "shadow-md border border-gray-200"
                            }
                        }}
                    />
                </div>
            </div>
        </header>
    )
}