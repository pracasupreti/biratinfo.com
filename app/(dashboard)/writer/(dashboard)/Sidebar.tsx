'use client'
import { SignOutButton } from '@clerk/nextjs'
import { LogOut, ChevronDown, Menu } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export default function Sidebar() {
    const pathname = usePathname()
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        posts: pathname.includes('/writer/post') || pathname.includes('/writer/posts'),
        categories: false,
        banners: false,
        administration: false,
    })
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    // Auto-expand sections based on current path
    useEffect(() => {
        setExpandedSections(prev => ({
            ...prev,
            posts: pathname.includes('/writer/post') || pathname.includes('/writer/posts'),
        }))
    }, [pathname])

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    const isActive = (href: string) => {
        return pathname === href
    }

    // Close mobile sidebar when navigating
    useEffect(() => {
        setIsMobileOpen(false)
    }, [pathname])

    const sidebarContent = (
        <div className="h-full bg-white border-r border-gray-200 flex flex-col animate-fade-in-right">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 hidden md:flex">
                <h2 className="text-xl font-bold text-gray-800">Writer Dashboard</h2>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {/* Dashboard */}
                <div className="mb-2">
                    <Link
                        href={'/writer'}
                        className={`w-full flex justify-between items-center p-2 rounded-md transition-colors duration-200 ${isActive('/writer')
                            ? 'bg-gray-100 text-gray-900 font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <span>Dashboard</span>
                    </Link>
                </div>

                {/* Posts Section */}
                <div className="mb-2">
                    <button
                        onClick={() => toggleSection('posts')}
                        className="w-full flex justify-between items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors duration-200"
                    >
                        <span>Posts</span>
                        <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${expandedSections.posts ? 'rotate-0' : '-rotate-90'}`}
                        />
                    </button>
                    <div className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${expandedSections.posts ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'
                        }`}>
                        <Link
                            href={'/writer/post'}
                            className={`block p-2 rounded-md text-sm transition-colors duration-200 ${isActive('/writer/post')
                                ? 'bg-gray-100 text-gray-900 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Write a Post
                        </Link>
                        <Link
                            href={'/writer/published-posts'}
                            className={`block p-2 rounded-md text-sm transition-colors duration-200 ${isActive('/writer/published-posts')
                                ? 'bg-gray-100 text-gray-900 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Published Posts
                        </Link>
                        <Link
                            href={'/writer/pending-posts'}
                            className={`block p-2 rounded-md text-sm transition-colors duration-200 ${isActive('/writer/pending-posts')
                                ? 'bg-gray-100 text-gray-900 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Pending Approval
                        </Link>
                        <Link
                            href={'/writer/scheduled-posts'}
                            className={`block p-2 rounded-md text-sm transition-colors duration-200 ${isActive('/writer/scheduled-posts')
                                ? 'bg-gray-100 text-gray-900 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Scheduled Posts
                        </Link>
                        <Link
                            href={'/writer/rejected-posts'}
                            className={`block p-2 rounded-md text-sm transition-colors duration-200 ${isActive('/writer/rejected-posts')
                                ? 'bg-gray-100 text-gray-900 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Rejected Posts
                        </Link>
                        <Link
                            href={'/writer/draft-posts'}
                            className={`block p-2 rounded-md text-sm transition-colors duration-200 ${isActive('/writer/draft-posts')
                                ? 'bg-gray-100 text-gray-900 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Draft Posts
                        </Link>
                    </div>
                </div>

                {/* Account Section */}
                <div className="mb-2">
                    <Link
                        href={'/writer/manage-profile'}
                        className={`w-full flex justify-between items-center p-2 rounded-md transition-colors duration-200 ${isActive('/writer/manage-profile')
                            ? 'bg-gray-100 text-gray-900 font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <span>Manage Account</span>
                    </Link>
                </div>
            </nav>

            {/* Footer */}
            <div className="bg-text-color">
                <SignOutButton>
                    <div className="flex items-center p-3 text-white hover:bg-green-950 font-medium cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4 transition-transform duration-200 hover:scale-110" />
                        Log Out
                    </div>
                </SignOutButton>
            </div>
        </div>
    )

    return (
        <>
            {/* Mobile sidebar trigger */}
            <div className="lg:hidden fixed top-4 right-4 z-50">
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[280px] p-0">
                        <SheetHeader className="p-4 border-b border-gray-200">
                            <SheetTitle className="text-xl font-bold text-gray-800">Writer Dashboard</SheetTitle>
                            <SheetDescription></SheetDescription>
                        </SheetHeader>
                        {sidebarContent}
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:block lg:w-64 flex-shrink-0">
                {sidebarContent}
            </div>
        </>
    )
}