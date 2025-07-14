/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Image from 'next/image'
import { Clock } from 'lucide-react'
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa'
import { notFound } from 'next/navigation'
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'
import NepaliDateTime from '@/components/homepage/NepaliDate'
import NepaliTimeDisplay, { convertToNepaliNum } from '@/components/homepage/NepaliTime'
import { getNepaliCategory } from '@/components/homepage/Hero'
import Link from 'next/link'

interface ImageData {
    url: string
    public_id: string
}

interface socialLinks {
    facebook: string,
    instagram: string,
    twitter: string,
    youtube: string,
    tiktok: string
}

interface Post {
    title: string
    category: string
    categoryId: number
    excerpt: string
    createdAt: Date
    updatedAt: Date
    readingTime: number | string
    heroBanner?: ImageData
    ogBanner?: ImageData
    _id: string
}

interface AuthorData {
    id: string
    firstName: string | null
    lastName: string | null
    username?: string | null
    imageUrl: string
    joinedDate: Date
    bio: string
    socialLinks: socialLinks
    totalPosts: number
    topCategories: string[]
    allposts: Post[]
}

const API_CONFIG = {
    backend_uri: process.env.NEXT_PUBLIC_BACKEND_URL,
    apiKey: process.env.NEXT_PUBLIC_API_SPECIAL_KEY,
}

export default async function AuthorPage({ params }: { params: Promise<{ username: string }> }) {
    const { backend_uri, apiKey } = API_CONFIG

    if (!backend_uri || !apiKey) {
        return (
            <div className="p-4 text-center text-red-600">
                Something went wrong!!!. Please try again after certain time
            </div>
        )
    }

    const headers = { 'x-special-key': apiKey }
    const options: RequestInit = { headers, cache: 'no-store' }
    const { username } = await params

    try {
        const authorRes = await fetch(
            `${backend_uri}/api/users/details/${username}`,
            options
        )

        if (!authorRes.ok) throw new Error(`Failed to fetch author. Status: ${authorRes.status}`)

        const authorResult = await authorRes.json()
        const author: AuthorData = authorResult?.author

        if (!author.id) throw new Error('Author not found.')

        // Format the joined date
        const formattedJoinDate = new Date(author.joinedDate).toLocaleDateString('ne-NP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        })

        // Get latest 6 posts
        const latestPosts = author.allposts.slice(0, 6)
        const remainingPosts = author.allposts.slice(6)

        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                    {/* Author Hero Section */}
                    <section className="bg-gradient-to-r from-[#eff5f5] to-[#e0ecec] py-16 px-4 md:px-0">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
                                {/* Author Image - Larger and more prominent */}
                                <div className="w-full md:w-5/12 lg:w-5/12 flex justify-center">
                                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                                        <Image
                                            src={author.imageUrl}
                                            alt={`${author.firstName} ${author.lastName}`}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
                                        {/* Decorative rings */}
                                        <div className="absolute inset-0 rounded-full border-4 border-white/30 pointer-events-none" />
                                        <div className="absolute inset-4 rounded-full border-2 border-white/20 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Author Details - Extended to right edge */}
                                <div className="w-full md:w-7/12 lg:w-7/12 space-y-6 md:pr-10">
                                    <div>
                                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-color leading-tight">
                                            {author.firstName} {author.lastName}
                                        </h1>
                                        <div className="h-1 w-24 bg-[#2f5d62] my-4 rounded-full" />
                                    </div>

                                    {/* Author Description in Nepali */}
                                    <div className="mb-6 text-text-color text-lg leading-relaxed">
                                        <p >
                                            {author.bio}

                                        </p>
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex gap-4">
                                        {[
                                            { icon: <FaFacebookF />, color: 'bg-blue-600', link: author.socialLinks.facebook },
                                            { icon: <FaTwitter />, color: 'bg-sky-500', link: author.socialLinks.twitter },
                                            { icon: <FaInstagram />, color: 'bg-pink-500', link: author.socialLinks.instagram },
                                            { icon: <FaYoutube />, color: 'bg-red-600', link: author.socialLinks.youtube },
                                            { icon: <FaTiktok />, color: 'bg-black', link: author.socialLinks.tiktok }
                                        ].map((social, i) => (
                                            social.link && (
                                                <Link
                                                    key={i}
                                                    href={social.link}
                                                    className={`p-3 rounded-full text-white ${social.color} hover:opacity-90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5`}
                                                >
                                                    {social.icon}
                                                </Link>
                                            )
                                        ))}
                                    </div>

                                    {/* Author Stats - Improved card layout */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                                        {/* Total Posts Card */}
                                        <div className="bg-gradient-to-br from-[#2f5d62] to-[#1e3d42] p-4 rounded-xl shadow-md text-white">
                                            <p className="text-sm text-white/80">जम्मा लेखहरू</p>
                                            <p className="text-3xl font-bold mt-1"> {convertToNepaliNum({ timeText: author.totalPosts.toString() })}</p>
                                            <div className="mt-2 h-1 w-full bg-white/20 rounded-full">
                                                <div
                                                    className="h-1 bg-white rounded-full"
                                                    style={{ width: `${Math.min(100, author.totalPosts * 2)}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Categories Card */}
                                        <div className="bg-white p-4 rounded-xl shadow-md">
                                            <p className="text-sm text-gray-600">मुख्य श्रेणीहरू</p>
                                            <p className="text-lg font-medium text-[#2f5d62] mt-1 line-clamp-1">
                                                {author.topCategories.map((i) => getNepaliCategory(i)).join(', ')}
                                            </p>
                                            <div className="flex gap-1 mt-2">
                                                {author.topCategories.slice(0, 3).map((cat, i) => (
                                                    <span key={i} className="h-1 w-4 rounded-full bg-[#2f5d62]/50" />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Join Date Card */}
                                        <div className="bg-white p-4 rounded-xl shadow-md">
                                            <p className="text-sm text-gray-600">लेख्न शुरु गरेको मिति</p>
                                            <p className="text-lg font-medium text-[#2f5d62] mt-1">
                                                {formattedJoinDate}
                                            </p>
                                            <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                                                <Clock size={14} />
                                                <span>{new Date(author.joinedDate).toLocaleDateString('ne-NP')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Main Content */}
                    <div className="w-full px-4 lg:px-16 md:px-5 py-12">
                        <div className="max-w-8xl mx-auto md:mx-12 lg:mx-20 space-y-16">
                            {/* Categories Section */}
                            <section>
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-3xl font-bold text-[#2f5d62] border-b-2 border-[#2f5d62] pb-2">
                                        मुख्य विधाहरू
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {author.topCategories.map((category, index) => {
                                        const colors = [
                                            'from-blue-500 to-blue-600',
                                            'from-green-500 to-green-600',
                                            'from-amber-500 to-amber-600',
                                            'from-purple-500 to-purple-600',
                                            'from-pink-500 to-pink-600',
                                            'from-indigo-500 to-indigo-600'
                                        ];
                                        const colorClass = colors[index % colors.length];

                                        return (
                                            <div
                                                key={category}
                                                className={`bg-gradient-to-br ${colorClass} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}
                                            >
                                                <h3 className="text-xl font-bold mb-2"> {getNepaliCategory(category)}</h3>
                                                <p className="text-white/90">
                                                    {convertToNepaliNum({ timeText: author.allposts.filter(p => p.category === category).length.toString() })} लेखहरू
                                                </p>
                                                <div className="mt-4 h-1 w-full bg-white/20 rounded-full">
                                                    <div
                                                        className="h-1 bg-white rounded-full"
                                                        style={{
                                                            width: `${Math.min(100, author.allposts.filter(p => p.category === category).length * 10)}%`
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Latest Posts */}
                            <section>
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-3xl font-bold text-[#2f5d62] border-b-2 border-[#2f5d62] pb-2">
                                        मुख्य  लेखहरू
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {latestPosts.map(post => (
                                        <article
                                            key={post._id}
                                            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                                        >
                                            <div className="relative h-52 w-full overflow-hidden">
                                                <Image
                                                    src={post.heroBanner?.url || '/images/default-banner.jpg'}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-sm font-medium rounded-full text-[#2f5d62]">
                                                    {getNepaliCategory(post.category)}
                                                </span>
                                            </div>
                                            <div className="p-6">
                                                <Link href={`/${post.category}/${post.categoryId}`} className="text-xl font-bold mb-3 text-[#2f5d62] transition-colors line-clamp-1 hover:underline cursor-pointer">
                                                    {post.title}
                                                </Link>
                                                <p className="text-gray-600 mb-4 line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center justify-between text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={14} />
                                                        <NepaliTimeDisplay timeText={post.readingTime.toString()} />
                                                    </span>
                                                    <NepaliDateTime updatedAt={post.createdAt} />
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>

                            {/* Remaining Posts */}
                            {remainingPosts.length > 0 && (
                                <section>
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-3xl font-bold text-[#2f5d62] border-b-2 border-[#2f5d62] pb-2">
                                            अन्य लेखहरू
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {remainingPosts.map(post => (
                                            <article
                                                key={post._id}
                                                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                                            >
                                                <div className="relative h-52 w-full overflow-hidden">
                                                    <Image
                                                        src={post.heroBanner?.url || '/images/default-banner.jpg'}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-sm font-medium rounded-full text-[#2f5d62]">
                                                        {getNepaliCategory(post.category)}
                                                    </span>
                                                </div>
                                                <div className="p-6">
                                                    <Link href={`/${post.category}/${post.categoryId}`} className="text-xl font-bold mb-3 text-[#2f5d62] transition-colors line-clamp-2 hover:underline">
                                                        {post.title}
                                                    </Link>
                                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <Clock size={14} />
                                                            <NepaliTimeDisplay timeText={post.readingTime.toString()} />
                                                        </span>
                                                        <NepaliDateTime updatedAt={post.createdAt} />
                                                    </div>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        )
    } catch (error: any) {
        console.error('Error fetching author data:', error.message)
        return notFound()
    }
}