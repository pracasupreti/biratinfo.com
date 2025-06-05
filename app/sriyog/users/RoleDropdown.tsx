'use client'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { removeRole, setRole } from '../_actions'

export default function RoleDropdown({
    userId,
}: {
    userId: string
    currentRole: string
}) {
    const router = useRouter()

    const handleSetRole = async (role: string) => {
        const formData = new FormData()
        formData.append('id', userId)
        formData.append('role', role)
        await setRole(formData)
        router.refresh()
    }

    const handleRemoveRole = async () => {
        const formData = new FormData()
        formData.append('id', userId)
        await removeRole(formData)
        router.refresh()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleSetRole('admin')}>
                    Make Admin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSetRole('manager')}>
                    Make Manager
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleRemoveRole}>
                    Remove Role
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}