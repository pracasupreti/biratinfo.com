import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { HomeIcon, MenuIcon } from "lucide-react"


function MobileNav() {
    const nav = [
        { name: <HomeIcon />, path: "/kasin" },
        { name: "ताजा समाचार", path: "/politics" },
        { name: "समाचार", path: "/society" },
        { name: "राजनीति", path: "/startups" },
        { name: "विज्ञान र प्रबिधि", path: "/economy" },
        { name: "साहित्य", path: "/tourism" },
        { name: "अर्थ/कारोवार", path: "/employment" },
        { name: "सम्पादकीय ", path: "/sports" },
        { name: "बिचार", path: "/world" },
        { name: "प्रदेश", path: "/health" },
        { name: "खेलकुद", path: "/agriculture" },
        { name: "रोजगार", path: "/entertainment" },
        { name: "मनोरंजन", path: "/markeWorldt" },
        { name: "सुरक्षा", path: "/markeWorldt" },
        { name: "अन्य", path: "/markeWorldt" }
    ];
    return (
        <Sheet>
            <SheetTrigger className="bg-red-500 rounded-[2px] px-0.5"><MenuIcon color="white" size={30} /></SheetTrigger>
            <SheetContent side="left" className="bg-[#055D59]">
                <SheetHeader className="flex flex-col gap-6">
                    <SheetTitle className="text-white font-inter font-[400] text-xl">BIRAT Informatics Pvt. Ltd.</SheetTitle>
                    {nav.map((items, index) =>
                        <SheetDescription key={index} className="text-white font-inter font-[400] text-lg">
                            {items.name}
                        </SheetDescription>)}
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}

export default MobileNav