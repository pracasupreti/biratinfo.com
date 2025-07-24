'use client'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"
import { usePathname } from "next/navigation"

interface NavItem {
    name: string | ReactNode
    path: string
}

interface MobileNavProps {
    navItems: NavItem[]
}

function MobileNav({ navItems }: MobileNavProps) {
    const pathname = usePathname()

    return (
        <Sheet>
            <SheetTrigger className="rounded-[2px] px-0.5">
                <MenuIcon color="black" size={25} />
            </SheetTrigger>
            <SheetContent
                side="left"
                className="bg-[#055D59] w-[80%] p-0"
            >
                <SheetHeader>
                    <SheetTitle className="text-white"></SheetTitle>
                    <SheetDescription className="sr-only">
                        Main navigation menu for the website
                    </SheetDescription>
                </SheetHeader>

                <div className="h-full flex flex-col">
                    <div className="flex-1 overflow-y-auto">
                        <nav className="space-y-1 px-4 py-2">
                            {navItems.map((item, index) => {
                                const isActive = pathname === item.path

                                return (
                                    <Link
                                        key={index}
                                        href={item.path}
                                        className={`block font-inter font-[400] text-lg py-3 px-2 rounded transition-colors duration-200
                      ${isActive
                                                ? "bg-white/20 text-white"
                                                : "text-white hover:bg-white/10"
                                            }`}
                                        style={{ lineHeight: '1.5' }} // Add this line
                                    >
                                        <div className="flex items-center">
                                            {typeof item.name === 'string' ? (
                                                <span className="leading-normal">{item.name}</span>
                                            ) : (
                                                item.name
                                            )}
                                        </div>
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav
