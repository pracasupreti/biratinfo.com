'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SidebarItemProps {
    icon: React.ReactNode
    text: string
    href: string
    active: boolean
    collapsed: boolean
}

export default function SidebarItem({
    icon,
    text,
    href,
    active,
    collapsed
}: SidebarItemProps) {
    return (
        <Button
            asChild
            variant="ghost"
            className={cn(
                'w-full justify-start gap-2 text-gray-300 hover:bg-gray-800 hover:text-white',
                collapsed ? 'px-3' : 'px-4',
                active && 'bg-gray-800 text-white'
            )}
        >
            <Link href={href}>
                {icon}
                {!collapsed && <span>{text}</span>}
            </Link>
        </Button>
    )
}