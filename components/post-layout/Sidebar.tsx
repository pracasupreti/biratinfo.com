'use client'
import { useState } from 'react'
import { usePostStore } from '@/store/PostStore'
import { Card, CardContent } from '../ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { PostActions } from './PostActions'
import { EditorPostAction } from '../editor/EditorPostAction'
import { AuthorSelect } from './AuthorSelect'
import { MultiSelect } from '../MultiSelectComponent'
import { categoryOptions, Language } from '@/types/Post'
import { uploadImage, deleteImage, uploadAudio, deleteAudio } from '@/lib/cloudinary'
import { Loader2, CalendarIcon, Trash2, Upload } from 'lucide-react'
import Image from 'next/image'
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { TimePicker } from '../ui/time-picker'
import toast from 'react-hot-toast'
import { Progress } from '../ui/progress'

interface PostSidebarProps {
    isEditing?: boolean
    isEditor?: boolean
    isWriting?: boolean
}

export function PostSidebar({ isEditing, isEditor, isWriting }: PostSidebarProps) {
    const {
        isNepali,
        category,
        tags = [],
        date,
        time,
        authors = [],
        language,
        readingTime,
        audio,
        audioCredit,
        heroBanner,
        ogBanner,
        sponsoredAds,
        sponsorLink,
        heroImageCredit,
        ogImageCredit,
        access,
        canonicalUrl,
        errors,
        setField,
        setAudio,
        setHeroBanner,
        setOgBanner,
        setSponsoredAds,
    } = usePostStore()

    const [isHeroUploading, setIsHeroUploading] = useState(false)
    const [isOgUploading, setIsOgUploading] = useState(false)
    const [isSponsoredAdsUploading, setIsSponsoredAdsUploading] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        date ? new Date(date) : undefined
    )

    const handleImageUpload = async (field: 'heroBanner' | 'ogBanner' | 'sponsoredAds', file: File) => {
        const setIsUploading = field === 'heroBanner' ? setIsHeroUploading :
            field === 'ogBanner' ? setIsOgUploading : setIsSponsoredAdsUploading
        const setImage = field === 'heroBanner' ? setHeroBanner :
            field === 'ogBanner' ? setOgBanner : setSponsoredAds
        const toastMessage = field === 'heroBanner' ? 'Hero banner' :
            field === 'ogBanner' ? 'OG banner' : 'Sponsored ads image'

        setIsUploading(true)
        const toastId = toast.loading(`Uploading ${toastMessage}...`)

        try {
            const { url, public_id } = await uploadImage(file)
            setImage({ url, public_id })
            toast.success(`${toastMessage} uploaded successfully!`, { id: toastId })
        } catch (error) {
            console.error(`Failed to upload ${field}:`, error)
            toast.error(`Failed to upload ${toastMessage}`, { id: toastId })
            setImage(null)
        } finally {
            setIsUploading(false)
        }
    }

    const handleRemoveImage = async (field: 'heroBanner' | 'ogBanner' | 'sponsoredAds') => {
        const image = field === 'heroBanner' ? heroBanner :
            field === 'ogBanner' ? ogBanner : sponsoredAds
        const setImage = field === 'heroBanner' ? setHeroBanner :
            field === 'ogBanner' ? setOgBanner : setSponsoredAds
        const toastMessage = field === 'heroBanner' ? 'Hero banner' :
            field === 'ogBanner' ? 'OG banner' : 'Sponsored ads image'

        if (!image?.public_id) {
            setImage(null)
            return
        }

        const toastId = toast.loading(`Deleting ${toastMessage}...`)
        try {
            await deleteImage(image.public_id)
            setImage(null)
            toast.success(`${toastMessage} deleted successfully!`, { id: toastId })
        } catch (error) {
            console.error(`Failed to delete ${field}:`, error)
            toast.error(`Failed to delete ${toastMessage}`, { id: toastId })
        }
    }

    const handleActionClick = async (action: () => Promise<void>) => {
        setIsSubmitting(true)
        try {
            await action()
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date)
        setField('date', date ? format(date, 'yyyy-MM-dd') : '')
    }

    const handleTimeChange = (time: string) => {
        setField('time', time)
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
        <Card className="shadow-sm rounded-md border border-gray-200 text-sm">
            <CardContent className="p-3 space-y-3">
                <div className='flex justify-between items-center gap'>
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">
                        {isNepali ? 'पोष्ट सेटिङहरू' : 'Post Settings'}
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {/* Category */}
                    <div className="space-y-1">
                        <Label htmlFor="category" className='text-sm font-medium text-gray-800'>
                            {isNepali ? 'वर्ग *' : 'Category *'}
                        </Label>
                        <Select value={category} onValueChange={(value) => setField('category', value)}>
                            <SelectTrigger className="w-full bg-gray-100 h-8">
                                <SelectValue placeholder={isNepali ? 'वर्ग छान्नुहोस्' : 'Select category'} />
                            </SelectTrigger>
                            <SelectContent>
                                {categoryOptions.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {isNepali ? opt.np : opt.en}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.category && <p className="text-red-500 text-xs mt-0.5">{errors.category}</p>}
                    </div>

                    {/* Tags */}
                    <div className="space-y-1">
                        <Label className='text-sm font-medium text-gray-800'>
                            {isNepali ? 'ट्यागहरू (अधिकतम ५)' : 'Tags (max 5)'}
                        </Label>
                        <MultiSelect
                            value={tags}
                            onChange={(newTags) => setField('tags', newTags)}
                            placeholder={isNepali ? 'ट्याग थप्नुहोस्' : 'Add tags'}
                            maxSelections={5}
                            isNepali={isNepali}
                        />
                        {errors.tags && <p className="text-red-500 text-xs mt-0.5">{errors.tags}</p>}
                    </div>

                    {/* Date and Time */}
                    <div className="flex flex-col gap-3">
                        {/* Date Picker */}
                        <div className="space-y-1">
                            <Label className='text-sm font-medium text-gray-800'>
                                {isNepali ? 'मिति *' : 'Date *'}
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal h-9 bg-gray-100 px-3",
                                            !selectedDate && "text-muted-foreground",
                                            "overflow-hidden"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                                        <span className="truncate text-sm">
                                            {selectedDate ? (
                                                format(selectedDate, "MMM d, yyyy")
                                            ) : (
                                                <span>{isNepali ? 'मिति छान्नुहोस्' : 'Select date'}</span>
                                            )}
                                        </span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={handleDateSelect}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.date && <p className="text-red-500 text-xs mt-0.5">{errors.date}</p>}
                        </div>

                        {/* Time Picker Section */}
                        <div className="space-y-1">
                            <Label className='text-sm font-medium text-gray-800'>
                                {isNepali ? 'समय *' : 'Time *'}
                            </Label>
                            <TimePicker
                                value={time}
                                onChange={handleTimeChange}
                                disabled={isSubmitting}
                            />
                            {errors.time && <p className="text-red-500 text-xs mt-0.5">{errors.time}</p>}
                        </div>
                    </div>

                    {/* Authors */}
                    <div className="space-y-1">
                        <div className="space-y-2">
                            <AuthorSelect
                                value={authors}
                                onChange={(newAuthors) => setField('authors', newAuthors)}
                                isEditor={isEditor}
                                error={errors.authors}
                                maxSelections={2}
                            />
                            {errors.author && <p className="text-red-500 text-xs mt-0.5">{errors.author}</p>}

                        </div>
                    </div>

                    {/* Language */}
                    <div className="space-y-1">
                        <Label htmlFor="language" className='text-sm font-medium text-gray-800'>
                            {isNepali ? 'भाषा' : 'Language'}
                        </Label>
                        <Select
                            value={language}
                            onValueChange={(value) => setField('language', value)}
                        >
                            <SelectTrigger className="w-full bg-gray-100 h-8">
                                <SelectValue placeholder={isNepali ? 'भाषा छान्नुहोस्' : 'Select language'} />
                            </SelectTrigger>
                            <SelectContent>
                                {Language.map((item, index) =>
                                    <SelectItem key={index} value={item.value}>
                                        {item.language}
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Reading Time */}
                    {isEditor && (
                        <div className="space-y-1">
                            <Label htmlFor="readingTime" className='text-sm font-medium text-gray-800'>
                                {isNepali ? 'पढ्ने समय' : 'Reading Time'}
                            </Label>
                            <Select
                                value={readingTime}
                                onValueChange={(value) => setField('readingTime', value)}
                            >
                                <SelectTrigger className="w-full bg-gray-100 h-8">
                                    <SelectValue placeholder={isNepali ? 'समय छान्नुहोस्' : 'Select reading time'} />
                                </SelectTrigger>
                                <SelectContent>
                                    {[3, 4, 5, 6, 7, 8, 9, 10].map(min => (
                                        <SelectItem key={min} value={`${min} min`}>
                                            {isNepali ? `${min} मिनेट` : `${min} min`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* Audio Upload Section */}
                    <div className="space-y-2">
                        <Label>{isNepali ? 'अडियो' : 'Audio'}</Label>
                        {audio ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 p-2 border rounded-lg">
                                    <div className="flex-1 min-w-0">
                                        <audio controls className="w-full max-w-full">
                                            <source src={audio.url} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={handleRemoveAudio}
                                        className="shrink-0 cursor-pointer"
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
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-full">
                                <Label
                                    htmlFor="audio-upload"
                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-2 text-center">
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
                            <Progress value={uploadProgress} className="h-2 w-full" />
                        )}
                        {errors.audio && (
                            <p className="text-red-500 text-xs">{errors.audio}</p>
                        )}
                    </div>

                    {/* Hero Banner */}
                    <ImageUploadSection
                        label={isNepali ? 'हिरो ब्यानर' : 'Hero Banner'}
                        field="heroBanner"
                        image={heroBanner}
                        isUploading={isHeroUploading}
                        onUpload={handleImageUpload}
                        onRemove={handleRemoveImage}
                        isOtherUploading={isOgUploading || isSponsoredAdsUploading || isSubmitting}
                        error={errors.heroBanner}
                    />

                    {/* Hero Image Credit */}
                    <div className="space-y-1">
                        <Label htmlFor="heroImageCredit" className='text-sm font-medium text-gray-800'>
                            {isNepali ? 'हिरो छवि क्रेडिट' : 'Hero Image Credit'}
                        </Label>
                        <Input
                            id="heroImageCredit"
                            value={heroImageCredit}
                            onChange={(e) => setField('heroImageCredit', e.target.value)}
                            placeholder={isNepali ? 'छवि क्रेडिट' : 'Image credit'}
                            className="w-full bg-gray-100 h-8"
                        />
                        {errors.heroImageCredit && <p className="text-red-500 text-xs mt-0.5">{errors.heroImageCredit}</p>}
                    </div>

                    {/* OG Banner */}
                    <ImageUploadSection
                        label={isNepali ? 'OG ब्यानर' : 'OG Banner'}
                        field="ogBanner"
                        image={ogBanner}
                        isUploading={isOgUploading}
                        onUpload={handleImageUpload}
                        onRemove={handleRemoveImage}
                        isOtherUploading={isHeroUploading || isSponsoredAdsUploading || isSubmitting}
                        error={errors.ogBanner}
                    />

                    {/* OG Image Credit */}
                    <div className="space-y-1">
                        <Label htmlFor="ogImageCredit" className='text-sm font-medium text-gray-800'>
                            {isNepali ? 'OG छवि क्रेडिट' : 'OG Image Credit'}
                        </Label>
                        <Input
                            id="ogImageCredit"
                            value={ogImageCredit}
                            onChange={(e) => setField('ogImageCredit', e.target.value)}
                            placeholder={isNepali ? 'छवि क्रेडिट' : 'Image credit'}
                            className="w-full bg-gray-100 h-8"
                        />
                        {errors.ogImageCredit && <p className="text-red-500 text-xs mt-0.5">{errors.ogImageCredit}</p>}
                    </div>

                    {/* Sponsored Ads */}
                    <ImageUploadSection
                        label={isNepali ? 'प्रायोजित विज्ञापन' : 'Sponsored Ads'}
                        field="sponsoredAds"
                        image={sponsoredAds}
                        isUploading={isSponsoredAdsUploading}
                        onUpload={handleImageUpload}
                        onRemove={handleRemoveImage}
                        isOtherUploading={isHeroUploading || isOgUploading || isSubmitting}
                        error={errors.sponsoredAds}
                    />

                    {/* Sponsored Link */}
                    <div className="space-y-1">
                        <Label htmlFor="sponsorLink" className='text-sm font-medium text-gray-800'>
                            {isNepali ? 'प्रायोजक लिङ्क' : 'Sponsor Link'}
                        </Label>
                        <Input
                            id="sponsorLink"
                            value={sponsorLink || ''}
                            onChange={(e) => setField('sponsorLink', e.target.value)}
                            placeholder={isNepali ? 'प्रायोजक लिङ्क' : 'Enter sponsor link'}
                            className="w-full bg-gray-100 h-8"
                        />
                    </div>


                    {/* Access */}
                    <div className="space-y-1">
                        <Label htmlFor="access" className='text-sm font-medium text-gray-800'>
                            {isNepali ? 'पहुँच' : 'Access'}
                        </Label>
                        <Select
                            value={access}
                            onValueChange={(value) => setField('access', value)}
                        >
                            <SelectTrigger className="w-full bg-gray-100 h-8">
                                <SelectValue placeholder={isNepali ? 'पहुँच स्तर छान्नुहोस्' : 'Select access level'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="public">
                                    {isNepali ? 'सार्वजनिक' : 'Public'}
                                </SelectItem>
                                <SelectItem value="private">
                                    {isNepali ? 'निजी' : 'Private'}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Canonical URL */}
                    <div className="space-y-1">
                        <Label htmlFor="canonicalUrl" className='text-sm font-medium text-gray-800'>
                            {isNepali ? 'क्यानोनिकल URL' : 'Canonical URL'}
                        </Label>
                        <Input
                            id="canonicalUrl"
                            value={canonicalUrl}
                            onChange={(e) => setField('canonicalUrl', e.target.value)}
                            placeholder="Canonical URL"
                            className="w-full bg-gray-100 h-8"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                {isEditor && isEditing ? (
                    <EditorPostAction
                        onActionClick={handleActionClick}
                        isSubmitting={isSubmitting}
                    />
                ) : (
                    <PostActions
                        isEditing={isEditing}
                        isSubmitting={isSubmitting}
                        isWriting={isWriting}
                        onActionClick={handleActionClick}
                    />
                )}
            </CardContent>
        </Card>
    )
}

interface ImageUploadSectionProps {
    label: string
    field: 'heroBanner' | 'ogBanner' | 'sponsoredAds'
    image?: { url: string, public_id: string }
    isUploading: boolean
    onUpload: (field: 'heroBanner' | 'ogBanner' | 'sponsoredAds', file: File) => Promise<void>
    onRemove: (field: 'heroBanner' | 'ogBanner' | 'sponsoredAds') => void
    isOtherUploading: boolean
    error?: string
}

const ImageUploadSection = ({
    label,
    field,
    image,
    isUploading,
    onUpload,
    onRemove,
    isOtherUploading,
    error
}: ImageUploadSectionProps) => {
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            await onUpload(field, e.target.files[0])
        }
    }

    return (
        <div className="space-y-1">
            <Label htmlFor={field} className='text-sm font-medium text-gray-700'>{label}</Label>
            {image?.url ? (
                <div className="relative">
                    <Image
                        src={image.url}
                        alt={`${label} preview`}
                        className="w-full h-auto rounded-sm shadow-xs"
                        width={800}
                        height={600}
                        style={{ objectFit: 'contain' }}
                        quality={100}
                    />
                    <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 cursor-pointer"
                        onClick={() => onRemove(field)}
                        disabled={isUploading || isOtherUploading}
                    >
                        {isUploading ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Remove'}
                    </Button>
                </div>
            ) : (
                <div className="border border-dashed border-gray-300 rounded-sm p-2 flex items-center justify-center text-gray-500 text-xs">
                    No image uploaded
                </div>
            )}
            <Input
                id={field}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
            {!image?.url && (
                <Button
                    type="button"
                    onClick={() => document.getElementById(field)?.click()}
                    className="w-full h-8 text-sm"
                    disabled={isUploading || isOtherUploading}
                >
                    {isUploading ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : 'Upload'}
                </Button>
            )}
            {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
        </div>
    )
}