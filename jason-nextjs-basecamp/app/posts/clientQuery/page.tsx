"use client";

import React from 'react';
import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function UseReactQueryPage() {
    return (
        <QueryClientProvider client={queryClient}>
           <Posts/>
        </QueryClientProvider>
    );
}

function Posts() {

    const {data, isPending, error} = useQuery({
        queryKey: ['posts'],
        queryFn: () => fetch("https://jsonplaceholder.typicode.com/posts", {}).then(r => r.json()),
    });

    if (isPending){
        return <div>Loading...</div>
    }

    if (error){
        throw new Error("Failed to fetch posts data");
    }

    console.log(data);

    return (
        <div className={"grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-3"}>
            {data && data.map((post: any) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
}


