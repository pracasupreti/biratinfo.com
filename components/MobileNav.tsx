import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface NavItem {
    name: string | React.ReactNode
    path: string
}

interface MobileNavProps {
    navItems: NavItem[]
    othersDropdown: NavItem[]
}

function MobileNav({ navItems, othersDropdown }: MobileNavProps) {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)

    return (
        <Sheet>
            <SheetTrigger className="rounded-[2px] px-0.5">
                <MenuIcon color="black" size={25} />
            </SheetTrigger>
            <SheetContent
                side="left"
                className="bg-[#055D59] w-[80%]"
            >
                <SheetHeader>
                    <SheetTitle></SheetTitle>
                    <SheetDescription className="sr-only">
                        Main navigation menu for the website
                    </SheetDescription>
                    <div className="h-full overflow-y-auto pb-6">
                        <div className="flex flex-col gap-1 pt-2">
                            {navItems.map((item, index) => {
                                if (item.name === 'अन्य') {
                                    return (
                                        <div key={index} className="flex flex-col">
                                            <button
                                                onClick={() => setOpenDropdown(openDropdown === 'others' ? null : 'others')}
                                                className="flex items-center justify-between text-white font-inter font-[400] text-lg py-2 px-1"
                                            >
                                                <span>{item.name}</span>
                                                <ChevronDown
                                                    className={`transition-transform ${openDropdown === 'others' ? 'rotate-180' : ''}`}
                                                    size={20}
                                                />
                                            </button>

                                            {openDropdown === 'others' && (
                                                <div className="flex flex-col pl-4 border-l border-white/20 ml-2">
                                                    {othersDropdown.map((dropItem, dropIndex) => (
                                                        <Link
                                                            key={dropIndex}
                                                            href={dropItem.path}
                                                            className="text-white/80 font-inter font-[400] text-base py-1.5 px-1 hover:text-white"
                                                        >
                                                            {dropItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )
                                }

                                return (
                                    <Link
                                        key={index}
                                        href={item.path}
                                        className="text-white font-inter font-[400] text-lg py-2 px-1 hover:bg-white/10 rounded"
                                    >
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav