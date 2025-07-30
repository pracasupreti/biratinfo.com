'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { X } from 'lucide-react'

interface RoadblockBannerProps {
    data: {
        _doc: {
            image: {
                url: string
                publicId?: string
            }
            link: string
            closeButtonDelay: number
            bannerTimeDelay: number
            repeat: string
            networks: string | string[]
            location: string
            devices: string
            hideForLoggedIn: boolean
            startDate: string
            endDate: string | null
            isActive: boolean
            _id: string
        }
        priority?: number
    } | null
}

const RoadblockBanner: React.FC<RoadblockBannerProps> = ({ data }) => {
    const [isVisible, setIsVisible] = useState(true)
    const [showCloseButton, setShowCloseButton] = useState(false)
    const [countdown, setCountdown] = useState<number | null>(null)
    const [countdownKey, setCountdownKey] = useState(0)

    useEffect(() => {
        if (!data) {
            setIsVisible(false)
            return
        }

        const delay = data._doc.closeButtonDelay
        setCountdown(delay)
        setCountdownKey(prev => prev + 1)

        const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
                if (prev === null) return null
                if (prev <= 1) {
                    clearInterval(countdownInterval)
                    setShowCloseButton(true)
                    return null
                }
                setCountdownKey(k => k + 1) // trigger animation
                return prev - 1
            })
        }, 1000)

        const dismissTimer = setTimeout(() => {
            handleClose()
        }, (delay + data._doc.bannerTimeDelay) * 1000)

        return () => {
            clearInterval(countdownInterval)
            clearTimeout(dismissTimer)
        }
    }, [data])

    const handleClose = () => {
        setIsVisible(false)
        if (data?._doc._id) {
            document.cookie = `banner_dismissed_${data._doc._id}=${new Date().toISOString()}; path=/; max-age=${60 * 60 * 24}`
        }
    }

    if (!data || !isVisible) return null

    const bannerData = data._doc

    return (
        <div className="fixed inset-0 z-[9999] bg-gray-100 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
                {/* Image container */}
                <div className="relative w-full" style={{ paddingBottom: '125%' }}>
                    <Link
                        href={bannerData.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center p-4"
                    >
                        <Image
                            src={bannerData.image.url}
                            alt="Banner"
                            fill
                            className="object-contain"
                            priority
                            quality={90}
                        />
                    </Link>
                </div>

                {/* Countdown or Close button */}
                <div className="absolute top-2 right-2 flex items-center space-x-2">
                    {countdown !== null && (
                        <span
                            key={countdownKey}
                            className="text-xs font-semibold rounded-full px-3 py-1 border border-gray-200 transition-all duration-300 ease-in-out transform animate-ping-once bg-red-500 text-white"
                        >
                            Close in {countdown}
                        </span>
                    )}
                    {showCloseButton && (
                        <Button
                            onClick={handleClose}
                            variant="destructive"
                            size="icon"
                            className="rounded-full p-1 border border-gray-200 transition-opacity cursor-pointer"
                            aria-label="Close banner"
                        >
                            <X className="h-4 w-4 text-white" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RoadblockBanner
