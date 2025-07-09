/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { useEffect, useState } from 'react'
import {
    Bold, Italic, Link2, Unlink, Heading1, List, ListOrdered, Image as ImageIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
    value: string
    onChange: (content: string) => void
    onImageUpload: (file: File) => Promise<string>
    onImageDelete: (publicId: string) => Promise<void>
}

export const RichTextEditor = ({ value, onChange, onImageUpload, onImageDelete }: RichTextEditorProps) => {
    const [imageUrl, setImageUrl] = useState('')
    const [linkUrl, setLinkUrl] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [showLinkDialog, setShowLinkDialog] = useState(false)

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: { levels: [1], HTMLAttributes: { class: 'text-2xl font-bold mb-4' } },
                bulletList: { HTMLAttributes: { class: 'list-disc pl-5' } },
                orderedList: { HTMLAttributes: { class: 'list-decimal pl-5' } },
                paragraph: { HTMLAttributes: { class: 'mb-4 text-gray-800' } },
            }),
            Image.extend({
                addAttributes() {
                    return {
                        ...this.parent?.(),
                        src: { default: null },
                        'data-public-id': { default: null },
                    }
                },
                renderHTML({ HTMLAttributes }) {
                    const { 'data-public-id': publicId, ...rest } = HTMLAttributes
                    return [
                        'div',
                        {
                            class: 'relative group w-fit mx-auto my-4',
                            'data-image-wrapper': true
                        },
                        ['img', {
                            ...rest,
                            class: 'rounded-lg max-w-full h-auto max-h-[400px] object-contain block',
                            'data-public-id': publicId
                        }],
                        ['button',
                            {
                                class: 'absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors cursor-pointer',
                                'data-delete-button': true,
                                'data-public-id': publicId,
                                onclick: `window.handleImageDelete('${publicId}')`
                            },
                            ['span', { class: 'text-lg font-bold' }, '×']
                        ]
                    ]
                },
            }),
            Link.configure({
                HTMLAttributes: {
                    class: 'text-blue-600 underline hover:text-blue-800 transition-colors',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                },
                validate: href => /^https?:\/\//.test(href),
                autolink: false,
                linkOnPaste: false,
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'min-h-[300px] p-4 focus:outline-none prose max-w-none w-full',
            },
            handleDOMEvents: {
                click: (view, event) => {
                    const target = event.target as HTMLElement
                    const deleteButton = target.closest('[data-delete-button]')
                    if (deleteButton) {
                        event.preventDefault()
                        event.stopPropagation()
                        const publicId = deleteButton.getAttribute('data-public-id')
                        if (publicId) {
                            handleDeleteImage(publicId)
                            return true
                        }
                    }
                    return false
                },
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value)
        }

        // Add global delete handler
        ; (window as any).handleImageDelete = (publicId: string) => {
            handleDeleteImage(publicId)
        }

        return () => {
            delete (window as any).handleImageDelete
        }
    }, [value, editor])

    const handleImageUpload = async (file: File) => {
        setIsUploading(true)
        try {
            const url = await onImageUpload(file)
            const publicIdMatch = url.match(/upload\/(?:v\d+\/)?([^\.]+)/)
            const publicId = publicIdMatch ? publicIdMatch[1] : null
            if (!publicId) return
            editor?.chain().focus().setImage({
                src: url,
                'data-public-id': publicId
            } as any).run()
            setImageUrl('')
        } catch (err) {
            console.error('Image upload failed', err)
        } finally {
            setIsUploading(false)
        }
    }

    const handleDeleteImage = async (publicId: string) => {
        if (!editor || !publicId) return;

        try {
            let imagePos: number | null = null;

            // Find the position of the image node
            editor.state.doc.descendants((node, pos) => {
                if (node.type.name === 'image' && node.attrs['data-public-id'] === publicId) {
                    imagePos = pos;
                }
            });

            if (imagePos === null) return;

            // Delete the image from storage
            await onImageDelete(publicId);

            // Use the transaction API properly
            editor.view.dispatch(
                editor.state.tr.delete(imagePos, imagePos + 1)
            );
        } catch (err) {
            console.error('Image deletion failed', err);
        }
    };

    const handleSetLink = () => {
        if (!linkUrl || !editor) return
        const processedUrl = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`
        if (editor.state.selection.empty) {
            editor.chain().focus().insertContent(`<a href="${processedUrl}" target="_blank" rel="noopener noreferrer">${processedUrl}</a>`).insertContent(' ').run()
        } else {
            const { to } = editor.state.selection
            editor.chain().focus().setLink({ href: processedUrl, target: '_blank', rel: 'noopener noreferrer' }).setTextSelection(to + 1).run()
        }
        setShowLinkDialog(false)
        setLinkUrl('')
    }

    const handleRemoveLink = () => {
        editor?.chain().focus().unsetLink().run()
        setShowLinkDialog(false)
        setLinkUrl('')
    }

    if (!editor) return <div className="min-h-[600px] rounded-md border bg-background p-4">Loading editor...</div>

    return (
        <div className="flex flex-col rounded-md border shadow-sm bg-background relative min-h-[600px]">
            <div className="border-b bg-gray-50 rounded-t-md p-2 flex flex-wrap items-center gap-2 sticky top-0 z-10">
                {[{ icon: Heading1, cmd: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive('heading', { level: 1 }) },
                { icon: Bold, cmd: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold') },
                { icon: Italic, cmd: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic') },
                { icon: List, cmd: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList') },
                { icon: ListOrdered, cmd: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList') }
                ].map(({ icon: Icon, cmd, active }, idx) => (
                    <Button key={idx} variant="ghost" size="sm" onClick={cmd} className={cn(active && 'bg-gray-200')}>
                        <Icon className="h-4 w-4" />
                    </Button>
                ))}
                <Button variant="ghost" size="sm" onClick={() => { const existingLink = editor.getAttributes('link').href; setLinkUrl(existingLink || ''); setShowLinkDialog(true); }} className={cn(editor.isActive('link') && 'bg-gray-200')}>
                    <Link2 className="h-4 w-4" />
                </Button>
                {editor.isActive('link') && (
                    <Button variant="ghost" size="sm" onClick={handleRemoveLink}>
                        <Unlink className="h-4 w-4" />
                    </Button>
                )}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" disabled={isUploading}><ImageIcon className="h-4 w-4" /></Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Insert Image</DialogTitle>
                        <DialogDescription>Upload a file or paste an image URL</DialogDescription>
                        <div className="space-y-4 mt-4">
                            <Label htmlFor="image-url">Image URL</Label>
                            <Input id="image-url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" />
                            <div className="cursor-pointer border-dashed border-2 border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition" onClick={() => document.getElementById('hidden-file-input')?.click()}>
                                <p className="text-sm text-gray-500">Click here to upload an image</p>
                            </div>
                            <Input id="hidden-file-input" type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} disabled={isUploading} />
                            <div className="flex gap-2 pt-2">
                                <Button onClick={() => { if (imageUrl) { editor.chain().focus().setImage({ src: imageUrl }).run(); setImageUrl('') } }} disabled={!imageUrl || isUploading} className="flex-1">Insert Image</Button>
                                <Button variant="outline" onClick={() => setImageUrl('')} className="flex-1">Cancel</Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
                <DialogContent>
                    <DialogTitle>Insert Link</DialogTitle>
                    <DialogDescription>{editor?.state.selection.empty ? 'The link will be inserted as text' : 'Selected text will become a link'}</DialogDescription>
                    <div className="space-y-4 mt-4">
                        <Label htmlFor="link-url">Link URL</Label>
                        <Input id="link-url" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://example.com" />
                        <div className="flex gap-2">
                            <Button onClick={handleSetLink} disabled={!linkUrl} className="flex-1">Apply Link</Button>
                            <Button variant="outline" onClick={() => setShowLinkDialog(false)} className="flex-1">Cancel</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <EditorContent editor={editor} className="overflow-auto border-t" style={{ minHeight: '300px', maxHeight: '3400px' }} />
            {/* minimize maxHeight to make scrollable */}
        </div>
    )
}