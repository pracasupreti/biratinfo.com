'use client'

import { useState, useEffect } from 'react'
import { CldImage, CldUploadWidget } from 'next-cloudinary'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Trash2, CheckCircle } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'

interface CloudinaryBanner {
    public_id: string
    secure_url: string
    width: number
    height: number
    context?: {
        custom?: {
            name?: string
        }
    }
}

export default function SponsorBannerManager() {
    const [banners, setBanners] = useState<CloudinaryBanner[]>([])
    const [activeBannerUrl, setActiveBannerUrl] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { getToken } = useAuth()

    async function fetchBanners() {
        try {
            const response = await fetch('/api/cloudinary/advertisement')
            if (!response.ok) throw new Error('Failed to fetch banners')
            const data = await response.json()
            return Array.isArray(data) ? data : []
        } catch (error) {
            console.error('Error fetching banners:', error)
            toast.error('Failed to load banners')
            return []
        }
    }

    async function fetchActiveBanner() {
        try {
            const token = await getToken()
            const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
            if (!backend_uri) throw new Error("Missing API endpoint")

            const response = await fetch(`${backend_uri}/api/active-banner?name=header_banner`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            if (!response.ok) throw new Error('Failed to fetch active banner')
            const data = await response.json()
            return data ? data.url : null
        } catch (error) {
            console.error('Error fetching active banner:', error)
            return null
        }
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const [bannersData, activeUrl] = await Promise.all([
                    fetchBanners(),
                    fetchActiveBanner()
                ])

                setBanners(bannersData)
                setActiveBannerUrl(activeUrl)
            } catch (error) {
                console.error('Initialization error:', error)
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [])

    const handleSetActive = async (url: string) => {
        try {
            const token = await getToken()
            const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
            if (!backend_uri) throw new Error("Missing API endpoint")

            const response = await fetch(`${backend_uri}/api/active-banner`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url, name: 'header_banner' })
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to set active banner')
            }

            setActiveBannerUrl(url)
            toast.success('Banner activated successfully')
        } catch (error) {
            console.error('Error setting active banner:', error)
            toast.error(error instanceof Error ? error.message : 'Failed to update banner')
        }
    }

    const handleDelete = async (publicId: string) => {
        if (!confirm('Are you sure you want to delete this banner?')) return

        try {
            // Delete from Cloudinary
            const deleteResponse = await fetch('/api/cloudinary/advertisement', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ publicId })
            })

            if (!deleteResponse.ok) throw new Error('Failed to delete banner')

            // Update local state
            setBanners(prev => prev.filter(b => b.public_id !== publicId))

            // If this was the active banner, clear it
            if (activeBannerUrl?.includes(publicId)) {
                setActiveBannerUrl(null)
                const token = await getToken()
                const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
                if (backend_uri) {
                    await fetch(`${backend_uri}/api/active-banner`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    })
                }
            }

            toast.success('Banner deleted successfully')
        } catch (error) {
            console.error('Error deleting banner:', error)
            toast.error(error instanceof Error ? error.message : 'Failed to delete banner')
        }
    }

    if (isLoading) {
        return (
            <div className="space-y-4 p-6">
                <Skeleton className="h-10 w-1/3" />
                <div className="grid grid-cols-1 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i}>
                            <CardContent className="p-4 space-y-4">
                                <Skeleton className="h-40 w-full" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-10 flex-1" />
                                    <Skeleton className="h-10 w-10" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Current Active Banner</CardTitle>
                </CardHeader>
                <CardContent>
                    {activeBannerUrl ? (
                        <div className="relative w-full flex items-center justify-center rounded-md overflow-hidden">
                            <CldImage
                                src={activeBannerUrl}
                                alt="Active sponsor banner"
                                width={1200}
                                height={300}
                                className="object-contain w-full h-auto max-h-[180px]"
                                sizes="(max-width: 768px) 100vw, 1200px"
                            />
                        </div>
                    ) : (
                        <div className="h-40 flex items-center justify-center bg-muted rounded-md">
                            <p className="text-muted-foreground">No active banner selected</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Upload New Banner</CardTitle>
                </CardHeader>
                <CardContent>
                    <CldUploadWidget
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_ADVERTISEMENT_UPLOAD_PRESET}
                        options={{
                            folder: 'biratinfo/advertisement',
                            context: { name: 'header banner' },
                            tags: ['header_banner'],
                            resourceType: 'image',
                            multiple: false,
                            maxFiles: 1,
                            clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
                            maxImageFileSize: 5000000,
                        }}
                        onSuccess={(result: any) => {
                            if (result?.info) {
                                const newBanner: CloudinaryBanner = {
                                    public_id: result.info.public_id,
                                    secure_url: result.info.secure_url,
                                    width: result.info.width,
                                    height: result.info.height,
                                    context: result.info.context,
                                }
                                setBanners(prev => [...prev, newBanner])
                                handleSetActive(newBanner.secure_url)
                            }
                        }}
                    >
                        {({ open }) => (
                            <Button onClick={() => open()} className="gap-2">
                                Upload New Banner
                            </Button>
                        )}
                    </CldUploadWidget>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Banner Library</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {banners.length === 0 ? (
                        <p className="text-muted-foreground">No banners available</p>
                    ) : (
                        <div className="space-y-4">
                            {banners.map((banner) => (
                                <Card
                                    key={banner.public_id}
                                    className={activeBannerUrl === banner.secure_url ? 'border-2 border-green-300 bg-gray-200' : 'bg-gray-200'}
                                >
                                    <CardContent className="flex flex-col sm:flex-row gap-4 items-center p-4">
                                        <div className="relative w-full flex items-center justify-center rounded-md overflow-hidden">
                                            <CldImage
                                                src={banner.public_id}
                                                alt="Sponsor banner"
                                                width={1200}
                                                height={300}
                                                className="object-contain w-full h-auto max-h-[180px]"
                                                sizes="(max-width: 768px) 100vw, 1200px"
                                            />
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                                            <Button
                                                onClick={() => handleSetActive(banner.secure_url)}
                                                disabled={activeBannerUrl === banner.secure_url}
                                                className="gap-2"
                                                variant={
                                                    activeBannerUrl === banner.secure_url ? 'default' : 'outline'
                                                }
                                            >
                                                {activeBannerUrl === banner.secure_url ? (
                                                    <>
                                                        <CheckCircle className="h-4 w-4" />
                                                        Active
                                                    </>
                                                ) : (
                                                    'Set Active'
                                                )}
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(banner.public_id)}
                                                variant="destructive"
                                                className="gap-2"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                Delete
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}