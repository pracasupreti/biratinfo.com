'use client'

import { useState, useMemo, useEffect } from 'react'
import { X, ChevronDown, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface MultiSelectProps {
    value: string[]
    onChange: (value: string[]) => void
    placeholder?: string
    label?: string
    error?: string
    maxSelections?: number
    isNepali?: boolean
}

interface Tag {
    _id?: string
    np?: string  // Nepali name
    en?: string  // English name
    count?: number
    createdAt?: string | Date
    updatedAt?: string | Date
}

export function MultiSelect({
    value = [],
    onChange,
    placeholder = 'Select...',
    label,
    error,
    maxSelections,
    isNepali = false,
}: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState<Tag[]>([])
    const [loading, setLoading] = useState(true)
    const [fetchError, setFetchError] = useState<string | null>(null)

    const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
    const apiKey = process.env.NEXT_PUBLIC_API_SPECIAL_KEY

    useEffect(() => {
        const fetchTags = async () => {
            if (!backend_uri || !apiKey) {
                setFetchError('Missing backend configuration')
                setLoading(false)
                return
            }

            try {
                const headers = { 'x-special-key': apiKey }
                const options: RequestInit = {
                    headers,
                    cache: 'no-store'
                }

                const response = await fetch(`${backend_uri}/api/tags`, options)
                if (!response.ok) {
                    throw new Error(`Failed to fetch tags: ${response.status}`)
                }
                const data = await response.json()
                setTags(data)
            } catch (err) {
                setFetchError(err instanceof Error ? err.message : 'Failed to fetch tags')
                console.error('Error fetching tags:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchTags()
    }, [backend_uri, apiKey])

    const tagOptions = useMemo(() => {
        return tags.map(tag => {
            // Use Nepali name if isNepali=true and np exists, otherwise use English name
            const displayName = isNepali
                ? tag.np || tag.en || ''
                : tag.en || tag.np || ''

            return {
                value: displayName, // Using the display name as value
                label: displayName,
                rawValue: tag // Keep original tag data
            }
        }).filter(option => option.label) // Filter out empty names
    }, [tags, isNepali])

    const filteredOptions = useMemo(() => {
        return tagOptions.filter(option =>
            option.label.toLowerCase().includes(search.toLowerCase()) &&
            !value.includes(option.value)
        )
    }, [tagOptions, search, value])

    const handleSelect = (selectedValue: string) => {
        if (maxSelections && value.length >= maxSelections) return
        onChange([...value, selectedValue])
        setSearch('')
        setIsOpen(false)
    }

    const handleRemove = (removedValue: string) => {
        onChange(value.filter(v => v !== removedValue))
    }

    return (
        <div className="space-y-1 relative">
            {label && <Label className="text-sm font-medium text-gray-800">{label}</Label>}

            <div className="relative">
                <div
                    className="flex flex-wrap gap-1 items-center min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    {value.map(val => (
                        <Badge
                            key={val}
                            variant="secondary"
                            className="flex items-center gap-1 pr-1"
                        >
                            {val}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleRemove(val)
                                }}
                                className="rounded-full hover:bg-gray-200 p-0.5"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                    <Input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 min-w-[100px] h-auto p-0 border-0 shadow-none focus-visible:ring-0"
                        placeholder={value.length === 0 ? placeholder : ''}
                        disabled={loading}
                    />
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    )}
                </div>

                {isOpen && !loading && (
                    <div className="absolute z-10 mt-1 w-full rounded-md border bg-popover shadow-lg">
                        <div className="max-h-60 overflow-y-auto p-1">
                            {fetchError ? (
                                <div className="text-sm p-2 text-red-500">
                                    Error loading tags: {fetchError}
                                </div>
                            ) : filteredOptions.length > 0 ? (
                                filteredOptions.map(option => (
                                    <div
                                        key={`${option.value}-${option.rawValue?._id || ''}`}
                                        className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                                        onClick={() => handleSelect(option.value)}
                                    >
                                        {option.label}
                                    </div>
                                ))
                            ) : (
                                <div
                                    className="text-sm p-2 text-muted-foreground cursor-pointer hover:text-black"
                                    onClick={() => {
                                        if (search.trim()) {
                                            handleSelect(search.trim())
                                            setSearch('')
                                            setIsOpen(false)
                                        }
                                    }}
                                >
                                    {search.trim() ? `+ Use "${search}"` : 'No options available'}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
        </div>
    )
}