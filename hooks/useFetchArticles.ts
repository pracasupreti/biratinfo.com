'use client';
import { useEffect, useState } from "react";

export interface ArticleResponse {
    data: {
        records: ArticleRecord[];
    };
}

export interface ArticleRecord {
    id: string;
    createdTime: string;
    fields: ArticleFields;
}

export interface ArticleFields {
    id: number;
    "Post-ID": number;
    Title?: string;
    Block1?: string;
    Block2?: string;
    Block3?: string;
    Block4?: string;
    Block5?: string;
    Excerpt?: string;
    Status: "True" | "False" | string; // use boolean if your source guarantees it
    Author?: string;
    Categories?: string;
}


export const useFetchArticles = () => {
    const [articles, setArticles] = useState<ArticleRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('/api/articles');

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Error fetching articles');
                }

                const data = await response.json();

                const filteredRecords = data.data.records //only array of data is send

                setArticles(filteredRecords);

            } catch (error: any) {
                console.error("Fetch error:", error);
                setError(error.message);

            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    return { articles, loading, error };
};