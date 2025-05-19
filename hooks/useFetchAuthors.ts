import { useEffect, useState } from "react"

export interface AuthorResponse {
    data: {
        records: AuthorRecords[]
    }
}

export interface AuthorRecords {
    id: string,
    createdTime: string,
    fields: AuthorField
}

export interface AuthorField {
    id: number;
    Name: string;
    "Last Name": string;
    Status: string;
    Post: number;
    "Active Since": string | Date;
    "Last-modified": string | Date;
    URL: string;
}


export const useFetchAuthors = () => {
    const [authors, setAuthors] = useState<AuthorRecords[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch('/api/authors');

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Error fetching articles');
                }

                const data = await response.json()

                const filteredRecords = data.data.records //only array of data is send

                setAuthors(filteredRecords);
            } catch (error: any) {
                console.error("Fetch error:", error);
                setError(error.message);
            } finally {
                setLoading(false)
            }
        };

        fetchAuthors();

    }, [])
    return { authors, loading, error }
}