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
                <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                <div className="mb-2">
                    <Link
                        href={'/sriyog'}
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
                        <Link href={'/sriyog/posts/published-posts'} className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition-colors duration-200">
                            Published Posts
                        </Link>
                        <Link href={'/sriyog/posts/pending-posts'} className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition-colors duration-200">
                            Pending Approval
                        </Link>
                        <Link href={'/sriyog/posts/scheduled-posts'} className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition-colors duration-200">
                            Scheduled Posts
                        </Link>
                        <Link href={'/sriyog/posts/rejected-posts'} className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition-colors duration-200">
                            Rejected Posts
                        </Link>
                        <Link href={'/sriyog/posts/draft-posts'} className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition-colors duration-200">
                            Draft Posts
                        </Link>
                    </div>
                </div>


                {/* Categories Section */}

                <div className="mb-2">
                    <button
                        onClick={() => toggleSection('categories')}
                        className="w-full flex justify-between items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors duration-200"
                    >
                        <span>Content Insights</span>
                        <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${expandedSections.categories ? 'rotate-0' : '-rotate-90'}`}
                        />
                    </button>
                    <div className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${expandedSections.categories ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                        <Link href="/sriyog/content-insights/categories" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition-colors duration-200">
                            All Categories
                        </Link>
                    </div>
                    <div className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${expandedSections.categories ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                        <Link href="/sriyog/content-insights/analytics" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition-colors duration-200">
                            Analytics
                        </Link>
                    </div>
                </div>


                {/* Banners Section */}

                <div className="mb-2">
                    <button
                        onClick={() => toggleSection('banners')}
                        className="w-full flex justify-between items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors duration-200"
                    >
                        <span>Banners</span>
                        <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${expandedSections.banners ? 'rotate-0' : '-rotate-90'}`}
                        />
                    </button>
                    <div className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${expandedSections.banners ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                        <Link href="/sriyog/banners/header-banner" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition-colors duration-200">
                            Header Banners
                        </Link>
                        <Link href="/sriyog/banners/sponsor-banner" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition-colors duration-200">
                            Sponsor Banners
                        </Link>
                    </div>
                </div>



                {/* Administration Section */}

                <div className="mb-2">
                    <button
                        onClick={() => toggleSection('administration')}
                        className="w-full flex justify-between items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors duration-200"
                    >
                        <span>Administration</span>
                        <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${expandedSections.administration ? 'rotate-0' : '-rotate-90'}`}
                        />
                    </button>
                    <div className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${expandedSections.administration ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                        <Link href="/sriyog/administration/authors" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition-colors duration-200">
                            Authors
                        </Link>
                        <Link href="/sriyog/administration/editors" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition-colors duration-200">
                            Editors
                        </Link>
                        <Link href="/sriyog/administration/admin" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition-colors duration-200">
                            Admin
                        </Link>
                    </div>
                </div>


                {/* Account Section */}
                <div className="mb-2">
                    <Link href={'/sriyog/manage-profile'}
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