export interface IUser {
    _id: string;
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'manager' | 'editor' | 'admin';
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
}
