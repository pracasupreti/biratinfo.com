// Body.tsx
import React from 'react';
import Summary from './Summary';
import Economy from './Economy';
import Technology from './Technology';
import { IPost } from '@/types/Post';
import Tourism from './Tourism';
import Agriculture from './Agriculture';
import Lifestyle from './Lifestyle';


interface BodyProps {
    data: IPost[] | null;
}

function Body({ data }: BodyProps) {
    if (!data) return null;


    // Filter posts by category
    const summaryPosts = data.filter(post =>
        ['sports', 'health', 'education', 'entertainment', 'culture'].includes(post.category?.toLowerCase())
    );

    const tourismPosts = data.filter(post => post.category?.toLowerCase() === 'tourism');
    const economyPosts = data.filter(post => post.category?.toLowerCase() === 'economy');
    const technologyPosts = data.filter(post => post.category?.toLowerCase() === 'technology');
    const agriculturePosts = data.filter(post => post.category?.toLowerCase() === 'agriculture');
    const lifestylePosts = data.filter(post => post.category?.toLowerCase() === 'lifestyle');

    return (
        <div>
            <Summary posts={summaryPosts} />
            <Tourism posts={tourismPosts} />
            <Economy posts={economyPosts} />
            <Technology posts={technologyPosts} />
            <Agriculture posts={agriculturePosts} />
            <Lifestyle posts={lifestylePosts} />
        </div>
    );
}

export default Body;