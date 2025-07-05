/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LabelList } from "recharts";

interface User {
    id: string;
    name: string
    role: string;
}

interface Post {
    _id: string;
    title: string;
    authors: User[] | string[]; // Can be array of User objects or author IDs (strings)
    category: string;
    createdAt: string;
    status: string;
}

interface Category {
    _id: string;
    category: string;
    posts: string[];
}

interface AuthorData {
    name: string;
    posts: number;
    color: string;
}

interface CategoryData {
    name: string;
    posts: number;
    color: string;
}

interface MonthlyData {
    month: string;
    articles: number;
}

const AnalyticsPage = () => {
    const { getToken } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [topAuthors, setTopAuthors] = useState<AuthorData[]>([]);
    const [topCategories, setTopCategories] = useState<CategoryData[]>([]);
    const [monthlyArticles, setMonthlyArticles] = useState<MonthlyData[]>([]);

    // Color palettes
    const AUTHOR_COLORS = [
        '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
        '#8b5cf6', '#ec4899', '#14b8a6', '#f97316',
        '#84cc16', '#64748b'
    ];

    const CATEGORY_COLORS = [
        '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
        '#8b5cf6', '#ec4899', '#14b8a6', '#f97316',
        '#84cc16', '#64748b'
    ];

    // Helper functions
    const extractPosts = (data: any): Post[] => {
        if (Array.isArray(data?.posts)) return data.posts;
        if (Array.isArray(data?.posts?.posts)) return data.posts.posts;
        return [];
    };

    const fetchAllPostsByStatus = async (status: string, token: string): Promise<Post[]> => {
        const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backend_uri) throw new Error("Missing api endpoint");

        const response = await fetch(`${backend_uri}/api/posts/allpost/${status}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch ${status} posts`);
        }

        const data = await response.json();
        return extractPosts(data);
    };

    const fetchAllCategories = async (token: string): Promise<Category[]> => {
        const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backend_uri) throw new Error("Missing api endpoint");

        const response = await fetch(`${backend_uri}/api/categories`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        return data.result?.categories || [];
    };

    const fetchAllUsers = async (token: string): Promise<User[]> => {
        const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backend_uri) throw new Error("Missing api endpoint");

        const response = await fetch(`${backend_uri}/api/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        return data.users || [];
    };

    const processData = async () => {
        try {
            const token = await getToken();
            if (!token) throw new Error("No authentication token");

            // Fetch all necessary data
            const [approvedPosts, categories, usersResponse] = await Promise.all([
                fetchAllPostsByStatus('approved', token),
                fetchAllCategories(token),
                fetchAllUsers(token),
            ]);

            // Process top authors - using the formatted names from backend
            const authorPostCount = new Map<string, number>();
            approvedPosts.forEach(post => {
                if (post.authors?.length > 0) {
                    // Handle both cases where authors is array of IDs or full user objects
                    const firstAuthor = post.authors[0];
                    const authorName = typeof firstAuthor === 'string'
                        ? usersResponse.find(u => u.id === firstAuthor)?.name || `Author ${firstAuthor.substring(0, 6)}`
                        : firstAuthor.name || `Author ${firstAuthor.id.substring(0, 6)}`;

                    authorPostCount.set(
                        authorName,
                        (authorPostCount.get(authorName) || 0) + 1
                    );
                }
            });

            // Convert to sorted array and take top 10
            const topAuthorsData = Array.from(authorPostCount.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .map(([name, count], index) => ({
                    name,
                    posts: count,
                    color: AUTHOR_COLORS[index % AUTHOR_COLORS.length]
                }));

            // Process top categories
            const categoryPostCount = new Map<string, number>();
            approvedPosts.forEach(post => {
                if (post.category) {
                    categoryPostCount.set(
                        post.category,
                        (categoryPostCount.get(post.category) || 0) + 1
                    );
                }
            });

            // Create category map for name lookup
            const categoryMap = new Map<string, Category>();
            categories.forEach(category => {
                categoryMap.set(category._id, category);
            });

            // Convert to sorted array and take top 10
            const topCategoriesData = Array.from(categoryPostCount.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .map(([categoryId, count], index) => {
                    const category = categoryMap.get(categoryId);
                    let categoryName = category?.category || `${categoryId.substring(0, 15)}`;

                    // Capitalize first letter of each word and handle common variations
                    categoryName = categoryName.toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');

                    return {
                        name: categoryName,
                        posts: count,
                        color: CATEGORY_COLORS[index % CATEGORY_COLORS.length]
                    };
                });

            // Process monthly articles
            const monthlyCount = new Map<string, number>();
            approvedPosts.forEach(post => {
                if (post.createdAt) {
                    const date = new Date(post.createdAt);
                    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
                    monthlyCount.set(
                        monthYear,
                        (monthlyCount.get(monthYear) || 0) + 1
                    );
                }
            });

            // Convert to sorted array by date
            const monthlyArticlesData = Array.from(monthlyCount.entries())
                .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
                .map(([month, count]) => ({
                    month,
                    articles: count
                }));

            setTopAuthors(topAuthorsData);
            setTopCategories(topCategoriesData);
            setMonthlyArticles(monthlyArticlesData);
            setIsLoading(false);
        } catch (error) {
            console.error("Error processing data:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        processData();
    }, [getToken]);

    const getGradientColor = (value: number) => {
        const max = monthlyArticles.length > 0
            ? Math.max(...monthlyArticles.map(item => item.articles))
            : 1;
        const ratio = value / max;
        return `rgba(59, 130, 246, ${0.3 + ratio * 0.7})`;
    };

    if (isLoading) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Content Analytics Dashboard</h1>
                <div className="flex justify-center items-center h-64">
                    <p>Loading analytics data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Content Analytics Dashboard</h1>

            {/* Pie Charts Section - Column layout */}
            <div className="flex flex-col gap-8 mb-12">
                {/* Top Authors Pie Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Top 10 Authors by Posts</h2>
                    <div className="h-[400px]">
                        {topAuthors.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={topAuthors}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="posts"
                                        nameKey="name"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {topAuthors.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: number) => [`${value} posts`, 'Posts']}
                                        labelFormatter={(label) => `Author: ${label}`}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <p>No author data available</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Top Categories Pie Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Top 10 Categories by Posts</h2>
                    <div className="h-[400px]">
                        {topCategories.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={topCategories}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="posts"
                                        nameKey="name"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {topCategories.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: number) => [`${value} posts`, 'Posts']}
                                        labelFormatter={(label) => `Category: ${label}`}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <p>No category data available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Monthly Articles Bar Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold mb-4">Monthly Articles Published</h2>
                <div className="h-[500px]">
                    {monthlyArticles.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={monthlyArticles}
                                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            >
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip
                                    formatter={(value: number) => [`${value} articles`, 'Count']}
                                    labelFormatter={(label) => `Month: ${label}`}
                                />
                                <Bar
                                    dataKey="articles"
                                    name="Articles"
                                    radius={[4, 4, 0, 0]}
                                >
                                    {monthlyArticles.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={getGradientColor(entry.articles)}
                                        />
                                    ))}
                                </Bar>
                                <LabelList
                                    dataKey="articles"
                                    position="top"
                                    style={{ fill: '#64748b', fontSize: 12 }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            <p>No monthly article data available</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;