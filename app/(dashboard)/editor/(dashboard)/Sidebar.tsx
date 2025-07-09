'use client'
import { SignOutButton } from '@clerk/nextjs'
import { LogOut, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function EditorSidebar() {
    const pathname = usePathname()
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        allposts: pathname.includes('/editor/all-posts'),
        myposts: pathname.includes('/editor/my-posts') || pathname.includes('/editor/post')
    })

    // Auto-expand sections based on current path
    useEffect(() => {
        setExpandedSections({
            allposts: pathname.includes('/editor/all-posts'),
            myposts: pathname.includes('/editor/my-posts') || pathname.includes('/editor/post')
        })
    }, [pathname])

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    const isActive = (href: string) => {
        return pathname === href ||
            (href !== '/manager' && pathname.startsWith(href))
    }

    return (
        <div className="h-full bg-white border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Editor Dashboard</h2>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {/* Dashboard */}
                <div className="mb-2">
                    <Link
                        href="/manager/dashboard"
                        className={`w-full flex items-center p-2 rounded-md font-medium ${isActive('/editor')
                            ? 'bg-gray-100 text-gray-900 font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        Dashboard
                    </Link>
                </div>

                {/* All Posts Section */}
                <div className="mb-2">
                    <button
                        onClick={() => toggleSection('allposts')}
                        className="w-full flex justify-between items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium"
                    >
                        <span>All Posts</span>
                        <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${expandedSections.allposts ? 'rotate-0' : '-rotate-90'}`}
                        />
                    </button>
                    <div className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ${expandedSections.allposts ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'
                        }`}>
                        <Link
                            href="/editor/all-posts/published-posts"
                            className={`block p-2 rounded-md text-sm ${isActive('/editor/all-posts/published-posts')
                                ? 'bg-gray-100 text-gray-900 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Published Posts
                        </Link>
                        <Link
                            href="/editor/all-posts/pending-posts"
                            className={`block p-2 rounded-md text-sm ${isActive('/editor/all-posts/pending-posts')
                                ? 'bg-gray-100 text-gray-900 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Pending Approval
                        </Link>
                        <Link
                            href="/editor/all-posts/rejected-posts"
                            className={`block p-2 rounded-md text-sm ${isActive('/editor/all-posts/rejected-posts')
                                ? 'bg-gray-100 text-gray-900 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Rejected Posts
                        </Link>
                    </div>
                </div>

                {/* My Posts Section */}
                <div className="mb-2">
                    <button
                        onClick={() => toggleSection('myposts')}
                        className="w-full flex justify-between items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium"
                    >
                        <span>My Posts</span>
                        <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${expandedSections.myposts ? 'rotate-0' : '-rotate-90'}`}
                        />
                    </button>
                    <div className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ${expandedSections.myposts ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'
                        }`}>
                        <Link
                            href="/editor/post"
                            className={`block p-2 rounded-md text-sm ${isActive('/editor/post')
                                ? 'bg-gray-100 text-gray-900 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Write a Post
                        </Link>
                        <Link
                            href="/editor/my-posts/published-posts"
                            className={`block p-2 rounded-md text-sm ${isActive('/editor/my-posts/published-posts')
                                ? 'bg-gray-100 text-gray-900 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Published Posts
                        </Link>
                        <Link
                            href="/editor/my-posts/scheduled-posts"
                            className={`block p-2 rounded-md text-sm ${isActive('/editor/my-posts/scheduled-posts')
                                ? 'bg-gray-100 text-gray-900 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Scheduled Posts
                        </Link>
                        <Link
                            href="/editor/my-posts/draft-posts"
                            className={`block p-2 rounded-md text-sm ${isActive('/editor/my-posts/draft-posts')
                                ? 'bg-gray-100 text-gray-900 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Draft Posts
                        </Link>
                    </div>
                </div>

                {/* Account Management */}
                <div className="mb-2">
                    <Link
                        href="/editor/manage-profile"
                        className={`w-full flex items-center p-2 rounded-md font-medium ${isActive('/editor/manage-profile')
                            ? 'bg-gray-100 text-gray-900 font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        Manage Profile
                    </Link>
                </div>
            </nav>

            {/* Footer */}
            <div className="bg-text-color">
                <SignOutButton>
                    <div className="flex items-center p-3 text-white hover:bg-green-950 font-medium cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                    </div>
                </SignOutButton>
            </div>
        </div>
    )
}