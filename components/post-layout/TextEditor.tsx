'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import { Bold, Italic, List, ListOrdered } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'

export const RichTextEditor = ({
    value,
    onChange,
}: {
    value: string
    onChange: (content: string) => void
}) => {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc pl-5',
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal pl-5',
                    },
                },
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'min-h-[200px] w-full p-4 border rounded-b-md focus:outline-none',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value, false)
        }
    }, [value, editor])

    if (!editor) {
        return <div className="min-h-[200px] rounded-md border bg-background p-4">Loading editor...</div>
    }

    return (
        <div className="flex flex-col rounded-md border shadow-sm bg-gray-100">
            <div className="border-b bg-gray-50 rounded-t-md p-2 flex items-center gap-2">
                {/* Text Styles */}
                <Toggle
                    size="sm"
                    pressed={editor.isActive('bold')}
                    onPressedChange={() => editor.chain().focus().toggleBold().run()}
                    aria-label="Bold"
                >
                    <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('italic')}
                    onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                    aria-label="Italic"
                >
                    <Italic className="h-4 w-4" />
                </Toggle>

                <div className="h-6 w-px bg-gray-300 mx-1" />

                {/* Lists */}
                <Toggle
                    size="sm"
                    pressed={editor.isActive('bulletList')}
                    onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                    aria-label="Bullet List"
                >
                    <List className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('orderedList')}
                    onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                    aria-label="Ordered List"
                >
                    <ListOrdered className="h-4 w-4" />
                </Toggle>
            </div>
            <EditorContent editor={editor} />
        </div>
    )
}