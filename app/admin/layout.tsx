import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from './(sidebar)/Sidebar'
import Header from './(header)/Header'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Next.js Admin Panel',
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={`${inter.className} flex h-screen overflow-hidden`}>
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}