/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { usePostStore } from '@/store/PostStore'
import { RichTextEditor } from './TextEditor'
import { NetworkSitesSection } from '../NetworkSitesSelection'
import { deleteImage, uploadImage } from '@/lib/cloudinary'
import { Textarea } from '@/components/ui/textarea'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export function PostForm() {
    const {
        title,
        excerpt,
        isNepali,
        content,
        featuredIn,
        postInNetwork,
        ctas,
        errors,
        setTitle,
        setExcerpt,
        setContent,
        addToFeaturedIn,
        removeFromFeaturedIn,
        addToPostInNetwork,
        removeFromPostInNetwork,
        addCTA,
        removeCTA,
        updateCTA,
    } = usePostStore()

    const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
    const [titleLength, setTitleLength] = useState(title.length)
    const [excerptLength, setExcerptLength] = useState(excerpt.length)

    const handleImageUpload = async (file: File) => {
        const uploadToast = toast.loading('Uploading image...')
        try {
            console.log("Route Hit")
            const { url, public_id } = await uploadImage(file)
            toast.success('Image uploaded successfully!', { id: uploadToast })
            return { url, public_id }
        } catch (error) {
            toast.error('Image upload failed', { id: uploadToast })
            console.error('Image upload failed:', error)
            throw error
        }
    }

    const handleImageDelete = async (publicId: string) => {
        const deleteToast = toast.loading('Deleting image...')
        try {
            await deleteImage(publicId)
            toast.success('Image deleted successfully!', { id: deleteToast })
        } catch (error) {
            toast.error('Failed to delete image', { id: deleteToast })
            console.error('Image deletion failed:', error)
            throw error
        }
    }

    return (
        <Card className="mb-3 shadow-sm rounded-lg border">
            <CardHeader className="border-b p-4">
                <ToggleGroup
                    type="single"
                    value={activeTab}
                    onValueChange={(value) => setActiveTab(value as 'edit' | 'preview')}
                    className="justify-end"
                >
                    <ToggleGroupItem
                        value="edit"
                        className="data-[state=on]:bg-primary data-[state=on]:text-white px-4 py-2"
                    >
                        {isNepali ? 'सम्पादन गर्नुहोस्' : 'Edit'}
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="preview"
                        className="data-[state=on]:bg-primary data-[state=on]:text-white px-4 py-2"
                    >
                        {isNepali ? 'पूर्वावलोकन गर्नुहोस्' : 'Preview'}
                    </ToggleGroupItem>
                </ToggleGroup>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
                {activeTab === 'edit' ? (
                    <>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="title">
                                    {isNepali ? 'शीर्षक' : 'Title'} *
                                </Label>
                                <span className={`text-xs ${titleLength > 100 ? 'text-red-500' : 'text-gray-500'}`}>
                                    {titleLength}/100
                                </span>
                            </div>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => {
                                    const newValue = e.target.value
                                    if (newValue.length <= 100) {
                                        setTitle(newValue, isNepali)
                                        setTitleLength(newValue.length)
                                    }
                                }}
                                placeholder={isNepali ? 'शीर्षक लेख्नुहोस्' : 'Enter title (max 100 characters)'}
                                className="text-lg"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-xs">{errors.title}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="excerpt">
                                    {isNepali ? 'संक्षिप्त विवरण' : 'Excerpt'} *
                                </Label>
                                <span className={`text-xs ${excerptLength > 500 ? 'text-red-500' : 'text-gray-500'}`}>
                                    {excerptLength}/500
                                </span>
                            </div>
                            <Textarea
                                id="excerpt"
                                value={excerpt}
                                onChange={(e) => {
                                    const newValue = e.target.value
                                    if (newValue.length <= 500) {
                                        setExcerpt(newValue, isNepali)
                                        setExcerptLength(newValue.length)
                                    }
                                }}
                                placeholder={isNepali ? 'संक्षिप्त विवरण लेख्नुहोस् (अधिकतम ५०० अक्षर)' : 'Enter excerpt (max 500 characters)'}
                                rows={3}
                            />
                            {errors.excerpt && (
                                <p className="text-red-500 text-xs">{errors.excerpt}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>{isNepali ? 'सामग्री' : 'Content'} *</Label>
                            <div className="min-h-[600px] border rounded-lg overflow-hidden">
                                <RichTextEditor
                                    value={content}
                                    onChange={setContent}
                                    onImageUpload={async (file) => {
                                        const { url } = await handleImageUpload(file)
                                        return url
                                    }}
                                    onImageDelete={handleImageDelete}
                                />
                            </div>
                            {errors.content && (
                                <p className="text-red-500 text-xs">{errors.content}</p>
                            )}
                        </div>

                        {/* Call to Action Section */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label>{isNepali ? 'कल टु एक्शन' : 'Call to Actions'}</Label>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addCTA({ name: '', url: '' })}
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    {isNepali ? 'थप्नुहोस्' : 'Add'}
                                </Button>
                            </div>

                            {ctas?.length === 0 ? (
                                <div className="text-center py-4 text-sm text-gray-500 rounded-lg border">
                                    {isNepali ? 'कुनै कल टु एक्शन थपिएको छैन' : 'No call to actions added yet'}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {ctas?.map((cta, index) => (
                                        <div key={index} className="flex gap-2 items-start">
                                            <div className="flex-1 space-y-1 min-w-0">
                                                <Select
                                                    value={cta.name}
                                                    onValueChange={(value) => updateCTA(index, { name: value })}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder={isNepali ? 'नाम छान्नुहोस्' : 'Select name'} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="Call Now">{isNepali ? 'अहिले कल गर्नुहोस्' : 'Call Now'}</SelectItem>
                                                            <SelectItem value="Contact Us">{isNepali ? 'हामीलाई सम्पर्क गर्नुहोस्' : 'Contact Us'}</SelectItem>
                                                            <SelectItem value="Book an Appointment">{isNepali ? 'अपोइन्टमेन्ट बुक गर्नुहोस्' : 'Book an Appointment'}</SelectItem>
                                                            <SelectItem value="Hire Now">{isNepali ? 'अहिले भर्ना गर्नुहोस्' : 'Hire Now'}</SelectItem>
                                                            <SelectItem value="Free Inquiry">{isNepali ? 'नि:शुल्क जानकारी' : 'Free Inquiry'}</SelectItem>
                                                            <SelectItem value="Book a Meeting">{isNepali ? 'मिटिङ बुक गर्नुहोस्' : 'Book a Meeting'}</SelectItem>
                                                            <SelectItem value="Browse More">{isNepali ? 'थप हेर्नुहोस्' : 'Browse More'}</SelectItem>
                                                            <SelectItem value="Download Now">{isNepali ? 'अहिले डाउनलोड गर्नुहोस्' : 'Download Now'}</SelectItem>
                                                            <SelectItem value="WhatsApp">{isNepali ? 'WhatsApp' : 'WhatsApp'}</SelectItem>
                                                            <SelectItem value="Messenger">{isNepali ? 'Messenger' : 'Messenger'}</SelectItem>
                                                            <SelectItem value="Telegram">{isNepali ? 'Telegram' : 'Telegram'}</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                {errors[`cta-${index}-name`] && (
                                                    <p className="text-red-500 text-xs">
                                                        {errors[`cta-${index}-name`]}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex-1 space-y-1 min-w-0">
                                                <Input
                                                    placeholder={isNepali ? 'URL (https://)' : 'URL (https://)'}
                                                    value={cta.url}
                                                    onChange={(e) =>
                                                        updateCTA(index, { url: e.target.value })
                                                    }
                                                    className="w-full"
                                                />
                                                {errors[`cta-${index}-url`] && (
                                                    <p className="text-red-500 text-xs">
                                                        {errors[`cta-${index}-url`]}
                                                    </p>
                                                )}
                                            </div>

                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeCTA(index)}
                                                className="self-stretch"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <NetworkSitesSection
                            featuredIn={featuredIn}
                            postInNetwork={postInNetwork}
                            isNepali={isNepali}
                            onAddFeatured={addToFeaturedIn}
                            onRemoveFeatured={removeFromFeaturedIn}
                            onAddNetwork={addToPostInNetwork}
                            onRemoveNetwork={removeFromPostInNetwork}
                        />
                    </>
                ) : (
                    <div className="prose max-w-none">
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-lg text-text-color">
                            {title}
                        </h1>
                        {excerpt && (
                            <p className="text-base text-text-color mb-4 leading-relaxed">
                                {excerpt}
                            </p>
                        )}

                        {ctas?.length! > 0 && (
                            <div className="my-6 space-y-2">
                                {ctas?.map((cta, index) => (
                                    cta?.name && cta?.url && (
                                        <Link
                                            key={index}
                                            href={cta.url.startsWith('http') ? cta.url : `https://${cta.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors mr-2 mb-2"
                                        >
                                            {cta.name}
                                        </Link>
                                    )
                                ))}
                            </div>
                        )}

                        {/* Create a temporary div to parse the content */}
                        <div
                            dangerouslySetInnerHTML={{ __html: content }}
                            ref={(node) => {
                                if (node) {
                                    // Find all anchor tags with YouTube links
                                    const links = node.querySelectorAll('a[href*="youtube.com"], a[href*="youtu.be"]');
                                    links.forEach(link => {
                                        const href = link.getAttribute('href');
                                        if (href) {
                                            // Extract YouTube ID
                                            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                                            const match = href.match(regExp);
                                            const youtubeId = (match && match[2].length === 11) ? match[2] : null;

                                            if (youtubeId) {
                                                // Replace the link with an iframe
                                                const iframe = document.createElement('div');
                                                iframe.className = 'my-6 w-full aspect-video';
                                                iframe.innerHTML = `
                                    <iframe
                                        src="https://www.youtube.com/embed/${youtubeId}"
                                        class="w-full h-full rounded-lg"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                    ></iframe>
                                `;
                                                link.replaceWith(iframe);
                                            } else {
                                                // For non-YouTube links, add proper styling
                                                link.classList.add('text-blue-600', 'underline', 'underline-offset-2', 'hover:opacity-75', 'cursor-pointer', 'break-words');
                                            }
                                        }
                                    });

                                    // Apply other styles
                                    const elements = {
                                        h1: 'text-2xl md:text-3xl font-bold text-text-color mb-4',
                                        p: 'text-base text-gray-800 mb-4 leading-relaxed',
                                        ul: 'list-disc pl-5 mb-4',
                                        ol: 'list-decimal pl-5 mb-4',
                                        img: 'rounded-lg my-4 mx-auto max-w-full h-auto max-h-[400px] object-contain block',
                                        strong: 'font-semibold',
                                        em: 'italic'
                                    };

                                    Object.entries(elements).forEach(([tag, classes]) => {
                                        node.querySelectorAll(tag).forEach(el => {
                                            el.className = classes;
                                        });
                                    });
                                }
                            }}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}