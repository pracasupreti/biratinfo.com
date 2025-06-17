'use server'

import { clerkClient, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function setRole(formData: FormData) {
    const client = await clerkClient()
    const user = await currentUser()

    if (!user || user.publicMetadata.role !== 'admin') {
        redirect('/')
    }

    try {
        await client.users.updateUserMetadata(formData.get('id') as string, {
            publicMetadata: { role: formData.get('role') },
        })
    } catch (err) {
        console.error('Error setting role:', err)
        throw err
    }
}

export async function removeRole(formData: FormData) {
    const client = await clerkClient()
    const user = await currentUser()

    if (!user || user.publicMetadata.role !== 'admin') {
        redirect('/')
    }

    try {
        await client.users.updateUserMetadata(formData.get('id') as string, {
            publicMetadata: { role: null },
        })
    } catch (err) {
        console.error('Error removing role:', err)
        throw err
    }
}

export async function deleteUser(userId: string) {
    const user = await currentUser()

    if (!user || user.publicMetadata.role !== 'admin') {
        redirect('/')
    }
    try {
        const client = await clerkClient()
        await client.users.deleteUser(userId)
    } catch (err) {
        console.error('Error deleting user:', err)
        throw err
    }
}