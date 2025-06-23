'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'
import { Label } from '../ui/label'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { X, ChevronDown } from 'lucide-react'

interface User {
    id: string
    name: string | null
    imageUrl: string
    role?: string
}

interface AuthorSelectProps {
    value: string[]
    onChange: (value: string[]) => void
    error?: string | string[]
    isEditor?: boolean
    maxSelections?: number
}

export function AuthorSelect({
    value = [],
    onChange,
    error,
    isEditor = false,
    maxSelections = 2
}: AuthorSelectProps) {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const { getToken } = useAuth()
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = await getToken()
                const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
                if (!backend_uri) throw new Error('Missing API endpoint')
                const response = await fetch(`${backend_uri}/api/users`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                })
                const data = await response.json()
                setUsers(data.users || [])
            } catch (error) {
                console.error('Error fetching users:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [isEditor, getToken])

    const filteredOptions = users.filter(user =>
        user.name?.toLowerCase().includes(search.toLowerCase()) &&
        !value.includes(user.id)
    )

    const handleSelect = (userId: string) => {
        if (value.length >= maxSelections) return
        onChange([...value, userId])
        setSearch('')
        setIsOpen(false)
    }

    const handleRemove = (userId: string) => {
        onChange(value.filter(id => id !== userId))
    }

    if (loading) {
        return (
            <div className="space-y-1">
                <Label className='text-sm font-medium text-gray-800'>Authors (max {maxSelections}) *</Label>
                <div className="flex items-center gap-1 text-sm">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Loading authors...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-1 relative">
            <Label className="text-sm font-medium text-gray-800">
                Authors (max {maxSelections}) *
            </Label>

            <div className="relative">
                <div
                    className="flex flex-wrap gap-1 items-center min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 cursor-pointer"
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    {value.length > 0 ? (
                        value.map(userId => {
                            const user = users.find(u => u.id === userId)
                            return (
                                <Badge
                                    key={userId}
                                    variant="secondary"
                                    className="flex items-center gap-1 pr-1"
                                >
                                    <Avatar className="h-4 w-4">
                                        <AvatarImage src={user?.imageUrl} />
                                        <AvatarFallback>
                                            {user?.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    {user?.name || 'Unknown'}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleRemove(userId)
                                        }}
                                        className="rounded-full hover:bg-gray-200 p-0.5"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            )
                        })
                    ) : (
                        <span className="text-muted-foreground"></span>
                    )}
                    {value.length < maxSelections && (
                        <Input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setIsOpen(true);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 min-w-[100px] h-auto p-0 border-0 shadow-none focus-visible:ring-0"
                            placeholder={value.length === 0 ? 'Select authors' : ''}
                        />
                    )}
                    <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>

                {isOpen && (
                    <div className="absolute z-10 mt-1 w-full rounded-md border bg-popover shadow-lg">
                        <div className="max-h-60 overflow-y-auto p-1">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map(user => (
                                    <div
                                        key={user.id}
                                        className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                                        onClick={() => handleSelect(user.id)}
                                    >
                                        <Avatar className="h-5 w-5 mr-2">
                                            <AvatarImage src={user.imageUrl} />
                                            <AvatarFallback>
                                                {user.name?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        {user.name}
                                    </div>
                                ))
                            ) : (
                                <div className="text-sm p-2 text-muted-foreground">
                                    {search ? 'No matching authors found' : 'No authors available'}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}

            {value.length >= maxSelections && (
                <p className="text-xs text-muted-foreground mt-1">
                    Maximum {maxSelections} authors selected
                </p>
            )}
        </div>
    )
}

