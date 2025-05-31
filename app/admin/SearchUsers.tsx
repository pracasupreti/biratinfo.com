'use client'

import { usePathname, useRouter } from 'next/navigation'

export const SearchUsers = () => {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    const form = e.currentTarget
                    const formData = new FormData(form)
                    const queryTerm = formData.get('search') as string
                    router.push(pathname + '?search=' + queryTerm)
                }}
                className="flex flex-col space-y-4"
            >
                <label htmlFor="search" className="text-sm font-medium text-gray-700">
                    Search for users
                </label>
                <div className="flex gap-2">
                    <input
                        id="search"
                        name="search"
                        type="text"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="Enter name or email..."
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    )
}