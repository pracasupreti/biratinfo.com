'use client'

import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '../ui/input'
import { usePostStore } from '@/store/PostStore'

interface PostFormProps {
    isEditing?: boolean
}

export function PostForm({ isEditing = false }: PostFormProps) {
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

    return (
        <Card className="mb-4">
            <CardContent className="space-y-4">
                {/* English Title */}
                <div>
                    <Label htmlFor="englishTitle">Post Title in English (140 words)</Label>
                    <Input
                        id="englishTitle"
                        value={englishTitle}
                        onChange={(e) => setField('englishTitle', e.target.value)}
                        className="mt-2 bg-zinc-100"
                    />
                    {errors.englishTitle && <p className="text-red-500 text-sm mt-1">{errors.englishTitle}</p>}
                </div>

                {/* Nepali Title */}
                <div>
                    <Label htmlFor="nepaliTitle">Post Title in Nepali (140 words)</Label>
                    <Input
                        id="nepaliTitle"
                        value={nepaliTitle}
                        onChange={(e) => setField('nepaliTitle', e.target.value)}
                        className="mt-2 bg-zinc-100"
                    />
                    {errors.nepaliTitle && <p className="text-red-500 text-sm mt-1">{errors.nepaliTitle}</p>}
                </div>

                {/* Excerpt */}
                <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                        id="excerpt"
                        value={excerpt}
                        onChange={(e) => setField('excerpt', e.target.value)}
                        className="h-32 mt-2 bg-zinc-100"
                    />
                    {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>}
                </div>

                {/* Content Blocks */}
                {blocks.map((block, i) => (
                    <div key={i}>
                        <Label htmlFor={`block-${i}`}>Block {i + 1}</Label>
                        <Textarea
                            id={`block-${i}`}
                            value={block}
                            onChange={(e) => {
                                const newBlocks = [...blocks]
                                newBlocks[i] = e.target.value
                                setField('blocks', newBlocks)
                            }}
                            className="h-40 mt-2 bg-zinc-100"
                        />
                        {errors[`block${i}`] && <p className="text-red-500 text-sm mt-1">{errors[`block${i}`]}</p>}
                    </div>
                ))}


                {/* Featured In Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Featured In</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-4 gap-4">
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
                                />
                                <Label htmlFor={`featured-${i}`}>{site}</Label>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Post in Network Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Post in Network</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-4 gap-4">
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
                                />
                                <Label htmlFor={`network-${i}`}>{site}</Label>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    )
}

// Constants (could be moved to a separate file)
const FEATURED_SITES = [
    'bhadrapur.com', 'belauri.com', 'chandragadhi.com', 'digitalkoshi.com',
    'koshinfo.com', 'uhabi.com', 'jhorahat.com', 'sriyog.net'
]

const NETWORK_SITES = [
    'bhadrapur.com', 'belauri.com', 'chandragadhi.com', 'digitalkoshi.com',
    'koshinfo.com', 'uhabi.com', 'jhorahat.com', 'sriyog.net'
]