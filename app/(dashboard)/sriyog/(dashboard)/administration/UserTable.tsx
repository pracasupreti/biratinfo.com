// app/(admin)/users/_components/UserTable.tsx
'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { RoleDropdown } from './RoleDropdown'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface User {
    id: string
    name: string
    email: string
    role: string
    posts: number
    imageUrl: string
}

interface UserTableProps {
    users: User[]
    availableRoles: string[]
    currentRole: string
}

export function UserTable({ users, availableRoles, currentRole }: UserTableProps) {
    const handleDelete = (userId: string) => { }
    return (
        <div className="rounded-lg border bg-white shadow-sm">
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="w-[300px]">User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Posts</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={user.imageUrl} />
                                        <AvatarFallback>
                                            {user.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {user.posts} published articles
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className="capitalize">
                                    {user.role}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">{user.posts}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <RoleDropdown
                                        userId={user.id}
                                        currentRole={user.role}
                                        availableRoles={availableRoles}
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="hover:bg-red-50 hover:text-red-600"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}