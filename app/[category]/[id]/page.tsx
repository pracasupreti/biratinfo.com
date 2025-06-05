'use client';

import { useParams } from 'next/navigation';

const PostPage = () => {
    const params = useParams();
    const category = params.category;
    const id = params.id;

    return (
        <div>
            <h1>Category: {category}</h1>
            <h2>Post ID: {id}</h2>
        </div>
    );
};

export default PostPage;
