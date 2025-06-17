// app/categories/page.tsx
'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";

const CategoriesPage = () => {
    const data = [
        { name: 'Technology', posts: 142, color: '#3b82f6' },
        { name: 'Science', posts: 98, color: '#10b981' },
        { name: 'Business', posts: 75, color: '#f59e0b' },
        { name: 'Health', posts: 112, color: '#ef4444' },
        { name: 'Entertainment', posts: 86, color: '#8b5cf6' },
        { name: 'Education', posts: 64, color: '#ec4899' },
        { name: 'Sports', posts: 53, color: '#14b8a6' },
        { name: 'Politics', posts: 47, color: '#f97316' },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">All Categories</h1>
            <div className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={data}
                        margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
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
                                const fillColor = data[index].color;
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

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.map((category) => (
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