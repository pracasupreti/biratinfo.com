'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export function SearchUsers({
    placeholder = "Search users...",
}: {
    placeholder?: string
}) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    return (
        <div className="mb-6">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    const form = e.currentTarget
                    const formData = new FormData(form)
                    const queryTerm = formData.get('search') as string
                    router.push(pathname + '?search=' + queryTerm)
                }}
                className="flex gap-2"
            >
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        name="search"
                        type="text"
                        placeholder={placeholder}
                        className="pl-10"
                        defaultValue={searchParams?.get('search') || ''}
                    />
                </div>
                <Button type="submit">Search</Button>
            </form>
        </div>
    )
}