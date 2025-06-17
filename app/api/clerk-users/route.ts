import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
    const Users = await clerkClient()
    const users = await Users.users.getUserList({ limit: 100 })
    return NextResponse.json({ users: users.data })
}
