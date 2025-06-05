// import { SearchUsers } from './SearchUsers'
// import { clerkClient } from '@clerk/nextjs/server'
// import { removeRole, setRole } from './_actions'
// import { SignOutButton } from '@clerk/nextjs'
// import { checkRole } from '@/lib/role'

// export default async function AdminDashboard(params: {
//     searchParams: Promise<{ search?: string }>
// }) {
//     await checkRole('admin');

//     const query = (await params.searchParams).search
//     const client = await clerkClient()
//     const users = query ? (await client.users.getUserList({ query })).data : []



//     return (
//         <div className="min-h-screen bg-gray-50 p-6">
//             <div className="max-w-6xl mx-auto">
//                 <header className="mb-8 flex justify-between items-center">
//                     <h1 className="text-2xl font-bold text-gray-800">
//                         Admin Dashboard <span className="text-sm font-normal bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Admin Access</span>
//                     </h1>
//                     <div className="flex items-center gap-4">
//                         <SignOutButton />
//                     </div>
//                 </header>

//                 <SearchUsers />

//                 {users.length === 0 ? (
//                     <div className="text-center py-12">
//                         <p className="text-gray-500">No users found. Try a different search.</p>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {users.map((user) => (
//                             <div key={user.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition">
//                                 <div className="p-6">
//                                     <div className="flex items-start space-x-4">
//                                         <div className="flex-1 min-w-0">
//                                             <h3 className="text-lg font-semibold text-gray-900 truncate">
//                                                 {user.firstName} {user.lastName}
//                                             </h3>
//                                             <p className="text-sm text-gray-500 truncate">
//                                                 {user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)?.emailAddress}
//                                             </p>
//                                             <div className="mt-2">
//                                                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.publicMetadata.role === 'admin'
//                                                     ? 'bg-purple-100 text-purple-800'
//                                                     : user.publicMetadata.role === 'moderator'
//                                                         ? 'bg-blue-100 text-blue-800'
//                                                         : 'bg-gray-100 text-gray-800'
//                                                     }`}>
//                                                     {user.publicMetadata.role as string || 'No role'}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="mt-6 flex flex-wrap gap-2">
//                                         <form action={setRole} className="flex-1 min-w-[120px]">
//                                             <input type="hidden" value={user.id} name="id" />
//                                             <input type="hidden" value="admin" name="role" />
//                                             <button
//                                                 type="submit"
//                                                 className="w-full px-3 py-1.5 text-xs font-medium rounded-md bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
//                                             >
//                                                 Make Admin
//                                             </button>
//                                         </form>

//                                         <form action={setRole} className="flex-1 min-w-[120px]">
//                                             <input type="hidden" value={user.id} name="id" />
//                                             <input type="hidden" value="moderator" name="role" />
//                                             <button
//                                                 type="submit"
//                                                 className="w-full px-3 py-1.5 text-xs font-medium rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
//                                             >
//                                                 Make Moderator
//                                             </button>
//                                         </form>

//                                         <form action={removeRole} className="flex-1 min-w-[120px]">
//                                             <input type="hidden" value={user.id} name="id" />
//                                             <button
//                                                 type="submit"
//                                                 className="w-full px-3 py-1.5 text-xs font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
//                                             >
//                                                 Remove Role
//                                             </button>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }


import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
    Activity,
    CreditCard,
    DollarSign,
    Users,
} from 'lucide-react'

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-muted-foreground">
                            +180.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground">
                            +19% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">
                            +201 since last hour
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


