'use client'

import { Menu, Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSidebar } from '@/hooks/use-sidebar'
import { UserButton } from '@clerk/nextjs'


export default function Header() {
    const { onOpen } = useSidebar()

    return (
        <header className="sticky top-0 z-10 border-b bg-white shadow-sm">
            <div className="flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={onOpen}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search..."
                            className="w-full pl-9 md:w-[300px] lg:w-[400px]"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-2">
                        <UserButton />
                        <span className="hidden text-sm font-medium md:block">Admin</span>
                    </div>
                </div>
            </div>
        </header>
    )
}