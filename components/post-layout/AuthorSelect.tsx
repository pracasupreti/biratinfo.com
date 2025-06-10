'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { useAuth } from "@clerk/nextjs";

interface User {
    id: string;
    name: string | null;
    imageUrl: string;
    role?: string;
}

interface AuthorSelectProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
    isEditor?: boolean;
}

export function AuthorSelect({ value, onChange, error, isEditor = false }: AuthorSelectProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = await getToken();
                const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;
                if (!backend_uri) throw new Error("Missing API endpoint");
                const response = await fetch(`${backend_uri}/api/users`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const data = await response.json();
                setUsers(data.users || []);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [isEditor]);

    if (loading) {
        return (
            <div className="space-y-1">
                <Label className='text-sm font-medium text-gray-800'>Author *</Label>
                <div className="flex items-center gap-1 text-sm">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Loading authors...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-1">
            <Label htmlFor="author" className='text-sm font-medium text-gray-800'>
                Author *
            </Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full bg-gray-100 h-8">
                    <SelectValue placeholder="Select author" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-5 w-5">
                                        <AvatarImage src={user.imageUrl} />
                                        <AvatarFallback>
                                            {user.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">
                                        {user.name}
                                    </span>
                                </div>
                            </SelectItem>
                        ))
                    ) : (
                        <div className="text-xs text-gray-500 p-1">
                            No authors found
                        </div>
                    )}
                </SelectContent>
            </Select>
            {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
        </div>
    );
}