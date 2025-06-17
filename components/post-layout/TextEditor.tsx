'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect } from 'react'
import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Undo,
    Redo,
} from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'

export const RichTextEditor = ({
    value,
    onChange,
    placeholder = 'Start writing here...',
}: {
    value: string
    onChange: (content: string) => void
    placeholder?: string
}) => {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder,
                emptyEditorClass: 'is-editor-empty',
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'min-h-[250px] w-full rounded-b-md border-t-0 border border-input bg-gray-100 px-4 py-3 text-sm ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        },
    })

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value, false)
        }
    }, [value, editor])

    if (!editor) return null

    return (
        <div className="flex flex-col border rounded-md shadow-sm">
            {/* Enhanced Toolbar */}
            <div className="border-b border-input bg-gray-50 rounded-t-md p-2 flex flex-wrap items-center gap-1">
                <Toggle
                    size="sm"
                    pressed={editor.isActive('heading', { level: 2 })}
                    onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className="hover:bg-gray-100"
                >
                    <Heading2 className="h-4 w-4 text-gray-700" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('bold')}
                    onPressedChange={() => editor.chain().focus().toggleBold().run()}
                    className="hover:bg-gray-100"
                >
                    <Bold className="h-4 w-4 text-gray-700" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('italic')}
                    onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                    className="hover:bg-gray-100"
                >
                    <Italic className="h-4 w-4 text-gray-700" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('strike')}
                    onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                    className="hover:bg-gray-100"
                >
                    <Strikethrough className="h-4 w-4 text-gray-700" />
                </Toggle>
                <div className="h-6 w-px bg-gray-300 mx-1" />
                <Toggle
                    size="sm"
                    pressed={editor.isActive('bulletList')}
                    onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                    className="hover:bg-gray-100"
                >
                    <List className="h-4 w-4 text-gray-700" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('orderedList')}
                    onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                    className="hover:bg-gray-100"
                >
                    <ListOrdered className="h-4 w-4 text-gray-700" />
                </Toggle>

                <div className="flex-grow" />

                <Toggle
                    size="sm"
                    onPressedChange={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                    className="hover:bg-gray-100"
                >
                    <Undo className="h-4 w-4 text-gray-700" />
                </Toggle>
                <Toggle
                    size="sm"
                    onPressedChange={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                    className="hover:bg-gray-100"
                >
                    <Redo className="h-4 w-4 text-gray-700" />
                </Toggle>
            </div>

            {/* Editor Content with Nepali support */}
            <EditorContent
                editor={editor}
                className="[&_.ProseMirror]:min-h-[200px] [&_.ProseMirror]:px-4 [&_.ProseMirror]:py-3"
            />
        </div>
    )
}