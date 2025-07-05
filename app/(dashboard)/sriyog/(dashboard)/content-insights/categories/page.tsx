/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Loader from "@/components/Loader";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";

// Color palette for categories
const COLORS = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
    '#8b5cf6', '#ec4899', '#14b8a6', '#f97316',
    '#6366f1', '#22d3ee', '#a855f7', '#d946ef'
];

const CategoriesPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<any[]>([]);
    const { getToken } = useAuth();

    useEffect(() => {
        const getCategories = async () => {
            try {
                const token = await getToken();
                const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;
                if (!backend_uri) throw new Error("Missing API endpoint");

                const res = await fetch(`${backend_uri}/api/categories`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (!res.ok) throw new Error('Failed to fetch categories');
                const data = await res.json();
                const categories = data.result?.success ? data.result?.categories : [];
                setCategories(categories);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error("Error fetching categories", error);
            }
        };

        getCategories();
    }, [getToken]);

    if (isLoading) return <Loader />;

    // Transform categories data for the chart
    const chartData = categories.map((category, index) => ({
        name: category.category,
        posts: category.postCount || category.posts?.length || 0,
        color: COLORS[index % COLORS.length]
    }));

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">All Categories</h1>

            {/* Chart Section */}
            <div className="h-[600px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={chartData}
                        margin={{ top: 20, right: 50, left: 100, bottom: 20 }}
                    >
                        <XAxis type="number" />
                        <YAxis
                            dataKey="name"
                            type="category"
                            width={120}
                            tick={{ fontSize: 14 }}
                        />
                        <Tooltip
                            formatter={(value) => [`${value} posts`, 'Count']}
                            labelFormatter={(label) => `Category: ${label}`}
                        />
                        <Bar
                            dataKey="posts"
                            radius={[0, 4, 4, 0]}
                            shape={(props: any) => {
                                const { x, y, width, height, index } = props;
                                const fillColor = chartData[index].color;
                                return (
                                    <rect
                                        x={x}
                                        y={y}
                                        width={width}
                                        height={height}
                                        fill={fillColor}
                                        rx={4}
                                        ry={4}
                                    />
                                );
                            }}
                        >
                            <LabelList
                                dataKey="posts"
                                position="right"
                                formatter={(value: number) => `${value} posts`}
                                style={{ fill: '#64748b', fontSize: 12 }}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Categories Grid */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {chartData.map((category) => (
                    <div
                        key={category.name}
                        className="p-4 rounded-lg shadow-sm border hover:shadow-lg transition-shadow"
                        style={{ borderLeft: `4px solid ${category.color}` }}
                    >
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-2xl font-bold mt-1">{category.posts}</p>
                        <p className="text-sm text-gray-500">posts</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesPage;