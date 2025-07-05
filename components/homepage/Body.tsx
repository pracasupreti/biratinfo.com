// Body.tsx
import React from 'react';
import Summary from './Summary';
import Economy from './Economy';
import Technology from './Technology';
import { PostsResponse } from '@/types/Post';
import Tourism from './Tourism';
import Agriculture from './Agriculture';
import Lifestyle from './Lifestyle';


interface BodyProps {
    data: PostsResponse[] | null;
}

function Body({ data }: BodyProps) {
    if (!data) return null;

    // Extract all posts
    const allPosts = data.flatMap(item => item.post);

    // Filter posts by category
    const summaryPosts = allPosts.filter(post =>
        ['sports', 'health', 'education', 'entertainment', 'culture'].includes(post.category?.toLowerCase())
    );

    const tourismPosts = allPosts.filter(post => post.category?.toLowerCase() === 'tourism' && !post.featuredIn.includes('biratinfo.com'));
    const economyPosts = allPosts.filter(post => post.category?.toLowerCase() === 'economy' && !post.featuredIn.includes('biratinfo.com'));
    const technologyPosts = allPosts.filter(post => post.category?.toLowerCase() === 'technology' && !post.featuredIn.includes('biratinfo.com'));
    const agriculturePosts = allPosts.filter(post => post.category?.toLowerCase() === 'agriculture' && !post.featuredIn.includes('biratinfo.com'));
    const lifestylePosts = allPosts.filter(post => post.category?.toLowerCase() === 'lifestyle' && !post.featuredIn.includes('biratinfo.com'));


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