import Sidebar from "./Sidebar"


export default async function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}