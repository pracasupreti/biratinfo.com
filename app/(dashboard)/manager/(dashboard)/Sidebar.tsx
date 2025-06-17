'use client'
import { SignOutButton } from '@clerk/nextjs'
import { LogOut, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'


export default function Sidebar() {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        posts: true,
        categories: false,
        banners: false,
        administration: false,
    })

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    return (
        <div className=" h-full bg-white border-r border-gray-200 flex flex-col animate-fade-in-right">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Manager Dashboard</h2>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                <div className="mb-2">
                    <Link
                        href={'/manager'}
                        className="w-full flex justify-between items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors duration-200"
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
                    <div className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${expandedSections.posts ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                        <Link href={'/manager/post-form'} className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition-colors duration-200">
                            Write a Post
                        </Link>
                        <Link href={'/manager/published-posts'} className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition-colors duration-200">
                            Published Posts
                        </Link>
                        <Link href={'/manager/pending-posts'} className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition-colors duration-200">
                            Pending Approval
                        </Link>
                        <Link href={'/manager/scheduled-posts'} className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition-colors duration-200">
                            Scheduled Posts
                        </Link>
                        <Link href={'/manager/rejected-posts'} className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition-colors duration-200">
                            Rejected Posts
                        </Link>
                        <Link href={'/manager/draft-posts'} className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition-colors duration-200">
                            Draft Posts
                        </Link>
                    </div>
                </div>

                {/* Account Section */}
                <div className="mb-2">
                    <Link href={'/manager/manage-profile'}
                        className="w-full flex justify-between items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors duration-200"
                    >
                        <span>Manage Account</span>
                    </Link>

                </div>

            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 cursor-pointer">
                <SignOutButton >
                    <div className="flex items-center p-2 text-red-600 hover:bg-red-50 rounded-md font-medium transition-colors duration-200">
                        <LogOut className="mr-2 h-4 w-4 transition-transform duration-200 hover:scale-110" />
                        Log Out
                    </div>
                </SignOutButton>
            </div>
        </div>
    )
}