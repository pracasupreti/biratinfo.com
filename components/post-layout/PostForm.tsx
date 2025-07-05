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
import { deleteImage, uploadImage, uploadAudio, deleteAudio } from '@/lib/cloudinary'
import { Textarea } from '@/components/ui/textarea'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Upload } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'

export function PostForm() {
    const {
        title,
        excerpt,
        isNepali,
        content,
        featuredIn,
        postInNetwork,
        ctas,
        audio,
        audioCredit,
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
        setAudio,
        setField
    } = usePostStore()

    const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
    const [titleLength, setTitleLength] = useState(title.length)
    const [excerptLength, setExcerptLength] = useState(excerpt.length)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)

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

    const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('audio/')) {
            toast.error('Please upload an audio file')
            return
        }

        setIsUploading(true)
        setUploadProgress(0)
        const uploadToast = toast.loading('Uploading audio...')

        try {
            const { url, public_id, duration } = await uploadAudio(file)
            setAudio({ url, public_id, duration })
            toast.success('Audio uploaded successfully!', { id: uploadToast })
        } catch (error) {
            toast.error('Audio upload failed', { id: uploadToast })
            console.error('Audio upload failed:', error)
        } finally {
            setIsUploading(false)
            setUploadProgress(0)
        }
    }

    const handleRemoveAudio = async () => {
        if (!audio?.public_id) {
            setAudio(null)
            return
        }

        const deleteToast = toast.loading('Deleting audio...')
        try {
            await deleteAudio(audio.public_id)
            setAudio(null)
            toast.success('Audio deleted successfully!', { id: deleteToast })
        } catch (error) {
            toast.error('Failed to delete audio', { id: deleteToast })
            console.error('Audio deletion failed:', error)
            // Don't clear audio state if deletion failed
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
                                <span className={`text-xs ${excerptLength > 250 ? 'text-red-500' : 'text-gray-500'}`}>
                                    {excerptLength}/250
                                </span>
                            </div>
                            <Textarea
                                id="excerpt"
                                value={excerpt}
                                onChange={(e) => {
                                    const newValue = e.target.value
                                    if (newValue.length <= 150) {
                                        setExcerpt(newValue, isNepali)
                                        setExcerptLength(newValue.length)
                                    }
                                }}
                                placeholder={isNepali ? 'संक्षिप्त विवरण लेख्नुहोस् (अधिकतम १५० अक्षर)' : 'Enter excerpt (max 150 characters)'}
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

                        {/* Audio Upload Section */}

                        <div className="space-y-2">
                            <Label>{isNepali ? 'अडियो' : 'Audio'}</Label>
                            {audio ? (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center space-x-2">
                                            <audio controls className="h-10">
                                                <source src={audio.url} type="audio/mpeg" />
                                                Your browser does not support the audio element.
                                            </audio>
                                        </div>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={handleRemoveAudio}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="audio-credit">
                                            {isNepali ? 'अडियो क्रेडिट' : 'Audio Credit'}
                                        </Label>
                                        <Input
                                            id="audio-credit"
                                            value={audioCredit || ''}
                                            onChange={(e) => setField('audioCredit', e.target.value)}
                                            placeholder={isNepali ? 'अडियो क्रेडिट' : 'Enter audio credit'}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center w-full">
                                    <Label
                                        htmlFor="audio-upload"
                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-3 text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">
                                                    {isNepali ? 'अडियो अपलोड गर्नुहोस्' : 'Click to upload audio'}
                                                </span>
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {isNepali ? 'MP3, WAV, AAC' : 'MP3, WAV, AAC'}
                                            </p>
                                        </div>
                                        <input
                                            id="audio-upload"
                                            type="file"
                                            accept="audio/*"
                                            className="hidden"
                                            onChange={handleAudioUpload}
                                            disabled={isUploading}
                                        />
                                    </Label>
                                </div>
                            )}
                            {isUploading && (
                                <Progress value={uploadProgress} className="h-2" />
                            )}
                            {errors.audio && (
                                <p className="text-red-500 text-xs">{errors.audio}</p>
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
                                        <div key={index} className="flex space-x-2">
                                            <div className="flex-1 space-y-1">
                                                <Input
                                                    placeholder={isNepali ? 'नाम' : 'Name'}
                                                    value={cta.name}
                                                    onChange={(e) =>
                                                        updateCTA(index, { name: e.target.value })
                                                    }
                                                />
                                                {errors[`cta-${index}-name`] && (
                                                    <p className="text-red-500 text-xs">
                                                        {errors[`cta-${index}-name`]}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <Input
                                                    placeholder={isNepali ? 'URL (https://)' : 'URL (https://)'}
                                                    value={cta.url}
                                                    onChange={(e) =>
                                                        updateCTA(index, { url: e.target.value })
                                                    }
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
                                                className="self-end"
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
                        {audio && (
                            <div className="my-6">
                                <audio controls className="w-full">
                                    <source src={audio.url} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
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
                        <div
                            dangerouslySetInnerHTML={{ __html: content }}
                            className="[&_h1]:text-2xl [&_h1]:md:text-3xl [&_h1]:font-bold [&_h1]:text-text-color [&_h1]:mb-4
                                       [&_p]:text-base [&_p]:text-gray-800 [&_p]:mb-4 [&_p]:leading-relaxed
                                       [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4
                                       [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4
                                       [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:opacity-75 [&_a]:cursor-pointer [&_a]:break-words
                                       [&_img]:rounded-lg [&_img]:my-4 [&_img]:mx-auto [&_img]:max-w-full [&_img]:h-auto [&_img]:max-h-[400px] [&_img]:object-contain [&_img]:block
                                       [&_strong]:font-semibold [&_em]:italic"
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}