'use client'

import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '../ui/input'
import { usePostStore } from '@/store/PostStore'
import { RichTextEditor } from './TextEditor'

export function PostForm() {
    const {
        englishTitle,
        nepaliTitle,
        blocks,
        excerpt,
        featuredIn,
        postInNetwork,
        errors,
        setField,
        addToFeaturedIn,
        removeFromFeaturedIn,
        addToPostInNetwork,
        removeFromPostInNetwork,
        updateBlock
    } = usePostStore()

    const maxChars = 70
    return (
        <Card className="mb-3 shadow-sm rounded-lg border">
            <CardContent className="space-y-4 p-6">
                {/* English Title */}
                <div className="space-y-2">
                    <Label htmlFor="englishTitle" className='text-sm font-medium text-gray-700'>
                        English Title (max {maxChars} chars)
                    </Label>
                    <Input
                        id="englishTitle"
                        value={englishTitle}
                        onChange={(e) => setField('englishTitle', e.target.value.slice(0, maxChars))}
                        className="h-10 bg-gray-50"
                        placeholder="Enter English title"
                    />
                    <div className="flex justify-between items-center">
                        <p className={`text-xs ${englishTitle.length === maxChars ? 'text-red-500' : 'text-gray-500'}`}>
                            {englishTitle.length}/{maxChars}
                        </p>
                        {errors.englishTitle && <p className="text-red-500 text-xs">{errors.englishTitle}</p>}
                    </div>
                </div>

                {/* Nepali Title */}
                <div className="space-y-2">
                    <Label htmlFor="nepaliTitle" className='text-sm font-medium text-gray-700'>
                        नेपाली शीर्षक (अधिकतम {maxChars} अक्षर)
                    </Label>
                    <Input
                        id="nepaliTitle"
                        value={nepaliTitle}
                        onChange={(e) => setField('nepaliTitle', e.target.value.slice(0, maxChars))}
                        className="h-10 bg-gray-50"
                        placeholder="नेपाली शीर्षक लेख्नुहोस्"
                        lang="ne"
                    />
                    <div className="flex justify-between items-center">
                        <p className={`text-xs ${nepaliTitle.length === maxChars ? 'text-red-500' : 'text-gray-500'}`}>
                            {nepaliTitle.length}/{maxChars}
                        </p>
                        {errors.nepaliTitle && <p className="text-red-500 text-xs">{errors.nepaliTitle}</p>}
                    </div>
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                    <Label htmlFor="excerpt" className='text-sm font-medium text-gray-700'>Excerpt</Label>
                    <Textarea
                        id="excerpt"
                        value={excerpt}
                        onChange={(e) => setField('excerpt', e.target.value)}
                        className="min-h-[100px] bg-gray-50"
                        placeholder="Enter brief excerpt"
                    />
                    {errors.excerpt && <p className="text-red-500 text-xs mt-1">{errors.excerpt}</p>}
                </div>

                {/* Content Blocks */}
                {blocks.map((block, i) => (
                    <div key={i} className="space-y-2">
                        <Label className='text-sm font-medium text-gray-700'>
                            Block {i + 1}
                        </Label>
                        <RichTextEditor
                            value={block.content}
                            onChange={(html) => updateBlock(i, html)}
                        />
                    </div>
                ))}

                {/* Featured In Section */}
                <Card className="border rounded-lg shadow-sm bg-gray-100">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-semibold">Featured In Network</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 md:gap-x-16 ">
                        {FEATURED_SITES.map((site, i) => (
                            <div key={`featured-${site}`} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`featured-${i}`}
                                    checked={featuredIn.includes(site)}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            addToFeaturedIn(site);
                                        } else {
                                            removeFromFeaturedIn(site);
                                        }
                                    }}
                                    className={`h-4 w-4 border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 cursor-pointer`}
                                />
                                <Label htmlFor={`featured-${i}`} className="text-sm font-normal cursor-pointer">
                                    {site}
                                </Label>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Post in Network Section */}
                <Card className="border rounded-lg shadow-sm bg-gray-100">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-semibold">Post in Network</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 md:gap-x-16">
                        {NETWORK_SITES.map((site, i) => (
                            <div key={`network-${site}`} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`network-${i}`}
                                    checked={postInNetwork.includes(site)}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            addToPostInNetwork(site)  // only adds to postInNetwork
                                        } else {
                                            removeFromPostInNetwork(site)  // only removes
                                        }
                                    }}
                                    className={`h-4 w-4 border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 cursor-pointer`}
                                />
                                <Label htmlFor={`network-${i}`} className="text-sm font-normal cursor-pointer">
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
    'biratinfo.com', 'bhadrapur.com', 'belauri.com', 'chandragadhi.com', 'digitalkoshi.com',
    'koshiinfo.com', 'duhabi.com', 'jhorahat.com', 'sriyog.net', 'sunsaritimes.com', 'birtacity.com', 'karmashil.com'
]

const NETWORK_SITES = [
    'biratinfo.com', 'bhadrapur.com', 'belauri.com', 'chandragadhi.com', 'digitalkoshi.com',
    'koshiinfo.com', 'duhabi.com', 'jhorahat.com', 'sriyog.net', 'sunsaritimes.com', 'birtacity.com', 'karmashil.com'
]