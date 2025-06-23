// components/MobileNav.tsx (Client Component)
'use client'
import { Menu, X } from 'lucide-react';
import { useState } from 'react';


import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';

export default function MobileNav({
    navItems,
    othersDropdownItems
}: {
    navItems: Array<{ name: string | React.ReactNode; path: string }>;
    othersDropdownItems: Array<{ name: string; path: string }>;
}) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    {open ? <X size={20} /> : <Menu size={20} />}
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                    <div className="flex items-center justify-start pt-4">
                        <Link href="/" onClick={() => setOpen(false)}>
                            <span className="text-xl font-bold">Birat Info</span>
                        </Link>
                    </div>
                </SheetHeader>
                <div className="flex flex-col space-y-3 mt-6">
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.path}
                            onClick={() => setOpen(false)}
                            className={`px-4 py-2 rounded-md ${pathname === item.path ? 'bg-green-950 text-white' : 'hover:bg-gray-100'}`}
                        >
                            {typeof item.name === 'string' ? item.name : 'लेख्नुहोस'}
                        </Link>
                    ))}
                    <div className="border-t pt-4">
                        <h3 className="px-4 py-2 font-medium">अन्य</h3>
                        {othersDropdownItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.path}
                                onClick={() => setOpen(false)}
                                className={`block px-6 py-2 rounded-md ${pathname === item.path ? 'bg-green-950 text-white' : 'hover:bg-gray-100'}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}