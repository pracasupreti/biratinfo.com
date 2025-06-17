// app/analytics/page.tsx
'use client';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LabelList } from "recharts";

const AnalyticsPage = () => {
    // Top 10 Authors Dummy Data
    const topAuthors = [
        { name: 'John Doe', posts: 245, color: '#3b82f6' },
        { name: 'Jane Smith', posts: 198, color: '#10b981' },
        { name: 'Alex Johnson', posts: 176, color: '#f59e0b' },
        { name: 'Sarah Williams', posts: 154, color: '#ef4444' },
        { name: 'Mike Brown', posts: 132, color: '#8b5cf6' },
        { name: 'Emily Davis', posts: 121, color: '#ec4899' },
        { name: 'David Wilson', posts: 109, color: '#14b8a6' },
        { name: 'Lisa Miller', posts: 98, color: '#f97316' },
        { name: 'Chris Taylor', posts: 87, color: '#84cc16' },
        { name: 'Amy Anderson', posts: 76, color: '#64748b' },
    ];

    // Top 10 Categories Dummy Data
    const topCategories = [
        { name: 'Technology', posts: 542, color: '#3b82f6' },
        { name: 'Health', posts: 412, color: '#10b981' },
        { name: 'Business', posts: 398, color: '#f59e0b' },
        { name: 'Science', posts: 376, color: '#ef4444' },
        { name: 'Entertainment', posts: 321, color: '#8b5cf6' },
        { name: 'Education', posts: 287, color: '#ec4899' },
        { name: 'Sports', posts: 254, color: '#14b8a6' },
        { name: 'Politics', posts: 231, color: '#f97316' },
        { name: 'Travel', posts: 198, color: '#84cc16' },
        { name: 'Food', posts: 176, color: '#64748b' },
    ];

    // Monthly Articles Dummy Data
    const monthlyArticles = [
        { month: 'Jan', articles: 125 },
        { month: 'Feb', articles: 189 },
        { month: 'Mar', articles: 214 },
        { month: 'Apr', articles: 198 },
        { month: 'May', articles: 237 },
        { month: 'Jun', articles: 265 },
        { month: 'Jul', articles: 243 },
        { month: 'Aug', articles: 278 },
        { month: 'Sep', articles: 301 },
        { month: 'Oct', articles: 287 },
        { month: 'Nov', articles: 312 },
        { month: 'Dec', articles: 356 },
    ];

    // Gradient color for bars
    const getGradientColor = (value: number) => {
        const max = Math.max(...monthlyArticles.map(item => item.articles));
        const ratio = value / max;
        return `rgba(59, 130, 246, ${0.3 + ratio * 0.7})`;
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Content Analytics Dashboard</h1>

            {/* Pie Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Top Authors Pie Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Top 10 Authors by Posts</h2>
                    <div className="h-[400px]">
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
                    </div>
                </div>

                {/* Top Categories Pie Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Top 10 Categories by Posts</h2>
                    <div className="h-[400px]">
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
                    </div>
                </div>
            </div>

            {/* Monthly Articles Bar Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold mb-4">Monthly Articles Published</h2>
                <div className="h-[500px]">
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
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;