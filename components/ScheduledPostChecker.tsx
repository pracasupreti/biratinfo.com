'use client'

import { useEffect } from 'react'

export default function ScheduledPostChecker() {
    useEffect(() => {
        const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
        if (!backend_uri) {
            console.error('Missing backend URI')
            return
        }

        fetch(`${backend_uri}/api/updateScheduledPost`, {
            cache: 'no-store',
        }).catch((err) => {
            console.error('Failed to update scheduled posts:', err)
        })
    }, [])

    return null
}
