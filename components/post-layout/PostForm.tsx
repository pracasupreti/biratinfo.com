'use client'

import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '../ui/input'
import { usePostStore } from '@/store/PostStore'

export function PostForm() {
    const {
        englishTitle,
        nepaliTitle,
        blocks,
        excerpt,
        featuredIn,
        postInNetwork,
        errors,
        setField
    } = usePostStore()

    const maxChars = 60;

    return (
        <Card className="mb-3 shadow-xl rounded-md">
            <CardContent className="space-y-4 p-4">
                {/* English Title */}
                <div className="space-y-1">
                    <Label htmlFor="englishTitle" className='text-sm font-medium text-gray-800'>
                        English Title (max {maxChars} chars)
                    </Label>
                    <Input
                        id="englishTitle"
                        value={englishTitle}
                        onChange={(e) => setField('englishTitle', e.target.value.slice(0, maxChars))}
                        className="bg-gray-100 h-8"
                        placeholder="English title"
                    />
                    <p className={`text-xs ${englishTitle.length === maxChars ? 'text-red-500' : 'text-gray-600'}`}>
                        {englishTitle.length}/{maxChars}
                    </p>
                    {errors.englishTitle && <p className="text-red-500 text-xs mt-0.5">{errors.englishTitle}</p>}
                </div>

                {/* Nepali Title */}
                <div className="space-y-1">
                    <Label htmlFor="nepaliTitle" className='text-sm font-medium text-gray-800'>
                        Nepali Title (max {maxChars} chars)
                    </Label>
                    <Input
                        id="nepaliTitle"
                        value={nepaliTitle}
                        onChange={(e) => setField('nepaliTitle', e.target.value.slice(0, maxChars))}
                        className="bg-gray-100 h-8"
                        placeholder="Nepali title"
                    />
                    <p className={`text-xs ${nepaliTitle.length === maxChars ? 'text-red-500' : 'text-gray-600'}`}>
                        {nepaliTitle.length}/{maxChars}
                    </p>
                    {errors.nepaliTitle && <p className="text-red-500 text-xs mt-0.5">{errors.nepaliTitle}</p>}
                </div>

                {/* Excerpt */}
                <div className="space-y-1">
                    <Label htmlFor="excerpt" className='text-sm font-medium text-gray-800'>Excerpt</Label>
                    <Textarea
                        id="excerpt"
                        value={excerpt}
                        onChange={(e) => setField('excerpt', e.target.value)}
                        className="h-24 bg-gray-100"
                        placeholder="Brief excerpt"
                    />
                    {errors.excerpt && <p className="text-red-500 text-xs mt-0.5">{errors.excerpt}</p>}
                </div>

                {/* Content Blocks */}
                {blocks.map((block, i) => (
                    <div key={i} className="space-y-1">
                        <Label htmlFor={`block-${i}`} className='text-sm font-medium text-gray-800'>Block {i + 1}</Label>
                        <Textarea
                            id={`block-${i}`}
                            value={block}
                            onChange={(e) => {
                                const newBlocks = [...blocks]
                                newBlocks[i] = e.target.value
                                setField('blocks', newBlocks)
                            }}
                            className="h-32 bg-gray-100"
                            placeholder={`Content block ${i + 1}`}
                        />
                        {errors[`block${i}`] && <p className="text-red-500 text-xs mt-0.5">{errors[`block${i}`]}</p>}
                    </div>
                ))}

                {/* Featured In Section */}
                <Card className="border border-gray-200 shadow-xs">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold">Featured In</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {FEATURED_SITES.map((site, i) => (
                            <div key={site} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`featured-${i}`}
                                    checked={featuredIn[i]}
                                    onCheckedChange={(checked) => {
                                        const newFeaturedIn = [...featuredIn]
                                        newFeaturedIn[i] = checked as boolean
                                        setField('featuredIn', newFeaturedIn)
                                    }}
                                    className="h-4 w-4 border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-white"
                                />
                                <Label htmlFor={`featured-${i}`} className="text-[13px] font-normal cursor-pointer">
                                    {site}
                                </Label>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Post in Network Section */}
                <Card className="border border-gray-200 shadow-xs">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold">Post in Network</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {NETWORK_SITES.map((site, i) => (
                            <div key={site} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`network-${i}`}
                                    checked={postInNetwork[i]}
                                    onCheckedChange={(checked) => {
                                        const newPostInNetwork = [...postInNetwork]
                                        newPostInNetwork[i] = checked as boolean
                                        setField('postInNetwork', newPostInNetwork)
                                    }}
                                    className="h-4 w-4 border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-white"
                                />
                                <Label htmlFor={`network-${i}`} className="text-[13px] font-normal cursor-pointer">
                                    {site}
                                </Label>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    )
}

const FEATURED_SITES = [
    'bhadrapur.com', 'belauri.com', 'chandragadhi.com', 'digitalkoshi.com',
    'koshinfo.com', 'uhabi.com', 'jhorahat.com', 'sriyog.net'
]

const NETWORK_SITES = [
    'bhadrapur.com', 'belauri.com', 'chandragadhi.com', 'digitalkoshi.com',
    'koshinfo.com', 'uhabi.com', 'jhorahat.com', 'sriyog.net'
]