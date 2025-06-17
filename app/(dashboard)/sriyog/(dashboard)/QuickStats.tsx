/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Clock, AlertCircle, X, Check, PenTool, Tag, Bookmark, User } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Post from '@/types/Post'
import { IUser } from '@/types/User'

interface QuickStatsProps {
    draftPosts: Post[]
    pendingPosts: Post[]
    scheduledPosts: Post[]
    approvedPosts: Post[]
    rejectedPosts: Post[]
    categories: any[]
    managers: IUser[]
    editors: IUser[]
    trendingCategory: string
    activeManagers: number
    activeEditors: number
}

export default function QuickStats({
    draftPosts,
    pendingPosts,
    scheduledPosts,
    approvedPosts,
    rejectedPosts,
    categories,
    managers,
    editors,
    trendingCategory,
    activeManagers,
    activeEditors
}: QuickStatsProps) {

    // Calculate recent approved posts (created in last 7 days)
    const recentApproved = approvedPosts.filter(post => {
        const postDate = new Date(post.createdAt || '');
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return postDate > weekAgo;
    }).length;

    // Calculate urgent posts (pending for more than 3 days)
    const urgentPending = pendingPosts.filter(post => {
        const postDate = new Date(post.createdAt || '');
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        return postDate < threeDaysAgo;
    }).length;

    // Calculate recently rejected posts
    const recentRejections = rejectedPosts.filter(post => {
        const postDate = new Date(post.updatedAt || '');
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return postDate > weekAgo;
    }).length;

    // Calculate monthly published posts
    // const monthlyPublished = approvedPosts.filter(post => {
    //     const postDate = new Date(post.createdAt || '');
    //     const monthAgo = new Date();
    //     monthAgo.setMonth(monthAgo.getMonth() - 1);
    //     return postDate > monthAgo;
    // }).length;

    const stats = [
        {
            title: "Approved Posts",
            count: approvedPosts.length,
            icon: <Check className="h-6 w-6 text-green-500" />,
            color: "bg-green-50",
            textColor: "text-green-600",
            subText: `${recentApproved} new this week`,
            subIcon: <Check className="h-3 w-3 text-green-500" />
        },
        {
            title: "Pending Approval",
            count: pendingPosts.length,
            icon: <AlertCircle className="h-6 w-6 text-amber-500" />,
            color: "bg-amber-50",
            textColor: "text-amber-600",
            subText: `${urgentPending} need urgent review`,
            subIcon: <AlertCircle className="h-3 w-3 text-amber-500" />
        },
        {
            title: "Rejected Posts",
            count: rejectedPosts.length,
            icon: <X className="h-6 w-6 text-red-500" />,
            color: "bg-red-50",
            textColor: "text-red-600",
            subText: `${recentRejections} new rejections`,
            subIcon: <X className="h-3 w-3 text-red-500" />
        },
        {
            title: "Draft Posts",
            count: draftPosts.length,
            icon: <Bookmark className="h-6 w-6 text-blue-500" />,
            color: "bg-blue-50",
            textColor: "text-blue-600",
            subText: `${draftPosts.filter(draft => !draft.updatedAt).length} not edited yet`,
            subIcon: <Bookmark className="h-3 w-3 text-blue-500" />
        },
        {
            title: "Scheduled Posts",
            count: scheduledPosts.length,
            icon: <Clock className="h-6 w-6 text-indigo-500" />,
            color: "bg-indigo-50",
            textColor: "text-indigo-600",
            subText: getLastEditedText(scheduledPosts),
            subIcon: <Clock className="h-3 w-3 text-indigo-500" />
        },
        {
            title: "Categories",
            count: categories.length,
            icon: <Tag className="h-6 w-6 text-purple-500" />,
            color: "bg-purple-50",
            textColor: "text-purple-600",
            subText: `${trendingCategory} is trending`,
            subIcon: <Tag className="h-3 w-3 text-purple-500" />
        },
        {
            title: "Authors", //(manager)
            count: managers.length,
            icon: <User className="h-6 w-6 text-teal-500" />,
            color: "bg-teal-50",
            textColor: "text-teal-600",
            subText: `${activeManagers} active authors`,
            subIcon: <User className="h-3 w-3 text-teal-500" />
        },
        {
            title: "Editors",
            count: editors.length,
            icon: <PenTool className="h-6 w-6 text-pink-500" />,
            color: "bg-pink-50",
            textColor: "text-pink-600",
            subText: `${activeEditors} active editors`,
            subIcon: <PenTool className="h-3 w-3 text-pink-500" />
        }
    ];

    function getLastEditedText(posts: Post[]): string {
        if (posts.length === 0) return 'No scheduled posts';

        const latest = posts.reduce((latestPost, currentPost) => {
            const currentDate = new Date(currentPost.updatedAt || currentPost.createdAt || '');
            const latestDate = new Date(latestPost.updatedAt || latestPost.createdAt || '');
            return currentDate > latestDate ? currentPost : latestPost;
        });

        const now = new Date();
        const lastEdited = new Date(latest.updatedAt || latest.createdAt || '');
        const diffHours = Math.floor((now.getTime() - lastEdited.getTime()) / (1000 * 60 * 60));

        if (diffHours < 60) return 'Just now'
        if (diffHours < 3600) return `${Math.floor(diffHours / 60)} min ago`
        if (diffHours < 86400) return `${Math.floor(diffHours / 3600)} hr ago`
        if (diffHours < 2592000) return `${Math.floor(diffHours / 86400)} days ago`
        return lastEdited.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className={`text-sm font-medium ${stat.textColor}`}>
                            {stat.title}
                        </CardTitle>
                        <div className={`p-2 rounded-lg ${stat.color}`}>
                            {stat.icon}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.count}</div>
                        <div className="flex items-center pt-2 text-xs text-muted-foreground">
                            {stat.subIcon && (
                                <span className="mr-1">{stat.subIcon}</span>
                            )}
                            <span>{stat.subText}</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}