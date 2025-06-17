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

import { setRole } from './_actions'
import toast from 'react-hot-toast'

interface RoleDropdownProps {
    userId: string
    currentRole: string
    availableRoles: string[]
}

export function RoleDropdown({
    userId,
    currentRole,
    availableRoles,
}: RoleDropdownProps) {
    const router = useRouter()


    const handleSetRole = async (role: string) => {
        const formData = new FormData()
        formData.append('id', userId)
        formData.append('role', role)

        toast.promise(
            setRole(formData),
            {
                loading: `Updating role to ${role}...`,
                success: `User role updated to ${role}`,
                error: 'Failed to update role',
            }
        )

        router.refresh()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-muted">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                {availableRoles.map((role) => (
                    <DropdownMenuItem
                        key={role}
                        onClick={() => handleSetRole(role)}
                        disabled={currentRole === role}
                    >
                        Make {role}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}