/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'

export async function GET() {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    const folder = 'biratinfo/advertisement'
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image?tags=true`, {
        headers: {
            Authorization: `Basic ${auth}`,
        },

    })

    const data = await res.json()
    const filteredImages = data.resources.filter((img: any) =>
        img.public_id.startsWith(`${folder}/`) &&
        img.tags?.includes('sponsor_banner')
    )

    return NextResponse.json({ success: true, filteredImages })
}
