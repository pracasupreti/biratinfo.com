// app/api/cloudinary/delete-image/route.ts
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: Request) {
    const { public_id } = await req.json()

    if (!public_id) {
        return NextResponse.json({ error: 'Missing public_id' }, { status: 400 })
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    const timestamp = Math.floor(Date.now() / 1000)
    const signatureString = `public_id=${public_id}&timestamp=${timestamp}${apiSecret}`
    const signature = crypto
        .createHash('sha1')
        .update(signatureString)
        .digest('hex')

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            public_id,
            timestamp,
            api_key: apiKey,
            signature,
        }),
    })

    const data = await res.json()

    if (!res.ok || data.result !== 'ok') {
        return NextResponse.json({ error: data }, { status: res.status })
    }

    return NextResponse.json({ success: true })
}