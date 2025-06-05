'use client'

import { useState } from 'react'
import { LayoutDashboard, Users, Settings, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SidebarItem from './SidebarItem'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const pathname = usePathname()

    const toggleSidebar = () => {
        setCollapsed(!collapsed)
    }

    return (
        <aside
            className={`h-screen bg-gray-900 text-white transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-64'
                }`}
        >
            <div className="flex h-full flex-col">
                <div className="flex items-center justify-between p-4">
                    {!collapsed && (
                        <h1 className="text-xl font-bold">Admin Panel</h1>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-gray-400 hover:bg-gray-800 hover:text-white"
                        onClick={toggleSidebar}
                    >
                        <ChevronLeft
                            className={`h-4 w-4 transition-transform ${collapsed ? 'rotate-180' : ''}`}
                        />
                    </Button>
                </div>

                <nav className="flex-1 space-y-2 p-4">
                    <SidebarItem
                        icon={<LayoutDashboard size={20} />}
                        text="Dashboard"
                        href="/admin"
                        active={pathname === '/admin'}
                        collapsed={collapsed}
                    />
                    <SidebarItem
                        icon={<Users size={20} />}
                        text="Users"
                        href="/admin/users"
                        active={pathname.startsWith('/admin/users')}
                        collapsed={collapsed}
                    />
                    <SidebarItem
                        icon={<Settings size={20} />}
                        text="Settings"
                        href="/admin/settings"
                        active={pathname.startsWith('/admin/settings')}
                        collapsed={collapsed}
                    />
                </nav>

                <div className="p-4">
                    {!collapsed ? (
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gray-600"></div>
                            <div>
                                <p className="text-sm font-medium">Admin User</p>
                                <p className="text-xs text-gray-400">admin@example.com</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <div className="h-8 w-8 rounded-full bg-gray-600"></div>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    )
}