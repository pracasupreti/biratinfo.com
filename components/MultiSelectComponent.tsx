'use client'

import { useState, useMemo } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface MultiSelectProps {
    options: { value: string; label: string }[]
    value: string[]
    onChange: (value: string[]) => void
    placeholder?: string
    label?: string
    error?: string
    maxSelections?: number
}

export function MultiSelect({
    options,
    value = [],
    onChange,
    placeholder = 'Select...',
    label,
    error,
    maxSelections
}: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')

    const filteredOptions = useMemo(() => {
        return options.filter(option =>
            option.label.toLowerCase().includes(search.toLowerCase()) &&
            !value.includes(option.value)
        )
    }, [options, search, value])

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
                    {
                        value.map(val => {
                            const option = options.find(o => o.value === val)
                            return (
                                <Badge
                                    key={val}
                                    variant="secondary"
                                    className="flex items-center gap-1 pr-1"
                                >
                                    {option?.label}
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
                            )
                        })
                    }
                    <Input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 min-w-[100px] h-auto p-0 border-0 shadow-none focus-visible:ring-0"
                        placeholder={value.length === 0 ? placeholder : ''}
                    />
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </div>

                {isOpen && (
                    <div className="absolute z-10 mt-1 w-full rounded-md border bg-popover shadow-lg">
                        <div className="max-h-60 overflow-y-auto p-1">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map(option => (
                                    <div
                                        key={option.value}
                                        className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                                        onClick={() => handleSelect(option.value)}
                                    >
                                        {option.label}
                                    </div>
                                ))
                            ) : (
                                <div className="text-sm p-2 text-muted-foreground">
                                    No options found
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