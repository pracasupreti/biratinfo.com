'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link2, ExternalLink, Edit2, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BannerLinkFormProps {
    initialLink: string;
    initialTitle: string;
    onSave: (link: string, title: string) => Promise<void>;
    className?: string;
}

export function BannerLinkForm({
    initialLink,
    initialTitle,
    onSave,
    className
}: BannerLinkFormProps) {
    const [link, setLink] = useState(initialLink);
    const [title, setTitle] = useState(initialTitle);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        if (!link) return;
        setIsSaving(true);
        try {
            await onSave(link, title);
            setIsEditing(false);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className={cn("space-y-3", className)}>
            {!isEditing ? (
                <div className="flex flex-col">
                    {link ? (
                        <>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Link2 className="h-4 w-4 flex-shrink-0" />
                                <span>Navigation Link</span>
                            </div>
                            <div className="mt-1 flex items-center gap-2 group">
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary hover:underline flex items-center gap-1"
                                >
                                    {title || link}
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsEditing(true)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Edit2 className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                            className="gap-1.5"
                        >
                            <Link2 className="h-3.5 w-3.5" />
                            <span>Add Link</span>
                        </Button>
                    )}
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="space-y-1.5">
                        <Label htmlFor="banner-link" className="flex items-center gap-1.5">
                            <Link2 className="h-3.5 w-3.5" />
                            <span>Link URL</span>
                        </Label>
                        <Input
                            id="banner-link"
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="https://example.com"
                            className="focus-visible:ring-1"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="banner-link-title">Display Text (optional)</Label>
                        <Input
                            id="banner-link-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Example Website"
                            className="focus-visible:ring-1"
                        />
                    </div>

                    <div className="flex gap-2 pt-1">
                        <Button
                            size="sm"
                            onClick={handleSave}
                            disabled={isSaving || !link}
                            className="gap-1.5 flex-1"
                        >
                            {isSaving ? (
                                <>
                                    <span className="animate-pulse">Saving...</span>
                                </>
                            ) : (
                                <>
                                    <Check className="h-3.5 w-3.5" />
                                    <span>Save</span>
                                </>
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setIsEditing(false);
                                setLink(initialLink);
                                setTitle(initialTitle);
                            }}
                            className="gap-1.5"
                        >
                            <X className="h-3.5 w-3.5" />
                            <span>Cancel</span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}