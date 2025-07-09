import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { ContentCategory } from './page';


interface BannerCategoryDropdownProps {
    categories: readonly ContentCategory[];
    selectedCategory: ContentCategory;
    onCategoryChange: (category: ContentCategory) => void;
}

export function BannerCategoryDropdown({
    categories,
    selectedCategory,
    onCategoryChange
}: BannerCategoryDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="capitalize">
                    {selectedCategory} Banners <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {categories.map((category) => (
                    <DropdownMenuItem
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className="capitalize"
                    >
                        {category}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}