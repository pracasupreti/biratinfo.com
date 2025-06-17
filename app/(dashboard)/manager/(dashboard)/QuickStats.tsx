'use client'
import { Clock, Edit, AlertCircle, X, Check, CheckIcon } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Post from '@/types/Post'


interface QuickStatsProps {
    draftPosts: Post[]
    pendingPosts: Post[]
    scheduledPosts: Post[]
    approvedPosts: Post[]
    rejectedPosts: Post[]
}

export default function QuickStats({
    draftPosts,
    pendingPosts,
    scheduledPosts,
    approvedPosts,
    rejectedPosts
}: QuickStatsProps) {

    // Calculate recent posts (created in last 7 days)
    const recentApproved = approvedPosts.filter(post => {
        const postDate = new Date(post.createdAt || '')
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return postDate > weekAgo
    }).length

    // Calculate urgent posts (pending for more than 3 days)
    const urgentPending = pendingPosts.filter(post => {
        const postDate = new Date(post.createdAt || '')
        const threeDaysAgo = new Date()
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
        return postDate < threeDaysAgo
    }).length

    const stats = [
        {
            title: "Approved Posts",
            count: approvedPosts.length,
            icon: <CheckIcon className="h-6 w-6 text-green-500" />,
            color: "bg-green-50",
            textColor: "text-green-600",
            subText: `${recentApproved} new this week`
        },
        {
            title: "Scheduled Posts",
            count: scheduledPosts.length,
            icon: <Clock className="h-6 w-6 text-blue-500" />,
            color: "bg-blue-50",
            textColor: "text-blue-600",
            subText: `${getLastEditedText(scheduledPosts)}`
        },
        {
            title: "Pending Approval",
            count: pendingPosts.length,
            icon: <AlertCircle className="h-6 w-6 text-amber-500" />,
            color: "bg-amber-50",
            textColor: "text-amber-600",
            subText: `${urgentPending} need urgent review`
        },
        {
            title: "Rejected Posts",
            count: rejectedPosts.length,
            icon: <X className="h-6 w-6 text-red-500" />,
            color: "bg-red-50",
            textColor: "text-red-600",
            subText: `${rejectedPosts.filter(post => {
                const postDate = new Date(post.updatedAt || '')
                const weekAgo = new Date()
                weekAgo.setDate(weekAgo.getDate() - 7)
                return postDate > weekAgo
            }).length} new rejections`
        }
    ]

    function getLastEditedText(posts: Post[]): string {
        if (posts.length === 0) return 'No scheduled posts'

        const latest = posts.reduce((latestPost, currentPost) => {
            const currentDate = new Date(currentPost.updatedAt || '')
            const latestDate = new Date(latestPost.updatedAt || '')
            return currentDate > latestDate ? currentPost : latestPost
        })

        const now = new Date()
        const lastEdited = new Date(latest.updatedAt || '')
        const diffHours = Math.floor((now.getTime() - lastEdited.getTime()) / (1000 * 60 * 60))

        if (diffHours < 60) return 'Just now'
        if (diffHours < 3600) return `${Math.floor(diffHours / 60)} min ago`
        if (diffHours < 86400) return `${Math.floor(diffHours / 3600)} hr ago`
        if (diffHours < 2592000) return `${Math.floor(diffHours / 86400)} days ago`
        return lastEdited.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-shadow">
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
                            {index === 0 && (
                                <>
                                    <Check className="h-3 w-3 text-green-500 mr-1" />
                                    <span>{stat.subText}</span>
                                </>
                            )}
                            {index === 1 && (
                                <>
                                    <Clock className="h-3 w-3 text-blue-500 mr-1" />
                                    <span>{stat.subText}</span>
                                </>
                            )}
                            {index === 2 && (
                                <>
                                    <AlertCircle className="h-3 w-3 text-amber-500 mr-1" />
                                    <span>{stat.subText}</span>
                                </>
                            )}
                            {index === 3 && (
                                <>
                                    <X className="h-3 w-3 text-red-500 mr-1" />
                                    <span>{stat.subText}</span>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}