'use client'
import { SignOutButton } from '@clerk/nextjs'
import { LogOut, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function ManagerSidebar() {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        allposts: true,
        myposts: false,
    })

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    return (
        <div className="h-full bg-white border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Editor Dashboard</h2>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                <div className="mb-2">
                    <Link
                        href="/manager/dashboard"
                        className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium"
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
                    <div className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ${expandedSections.allposts ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                        <Link href="/editor/all-posts/published-posts" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm">
                            Published Posts
                        </Link>
                        <Link href="/editor/all-posts/pending-posts" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm">
                            Pending Approval
                        </Link>
                        <Link href="/editor/all-posts/rejected-posts" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm">
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
                    <div className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ${expandedSections.myposts ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                        <Link href="/editor/post-form" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm">
                            Create Post
                        </Link>
                        <Link href="/editor/my-posts/published-posts" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm">
                            Published Posts
                        </Link>
                        <Link href="/editor/my-posts/scheduled-posts" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm">
                            Scheduled Posts
                        </Link>
                        <Link href="/editor/my-posts/draft-posts" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm">
                            Draft Posts
                        </Link>
                    </div>
                </div>



                {/* Account Management */}
                <div className="mb-2">
                    <Link href="/editor/manage-profile"
                        className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium"
                    >
                        Manage Profile
                    </Link>
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
                <SignOutButton>
                    <div className="flex items-center p-2 text-red-600 hover:bg-red-50 rounded-md font-medium">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                    </div>
                </SignOutButton>
            </div>
        </div>
    )
}