"use client";
// react query can be used in client side rendering only

import React from 'react';
import {QueryClient, QueryClientProvider} from "react-query";
import PostList from "@/app/_components/posts/post-list";

const queryClient = new QueryClient();

// this is client side rendering
function PostHomePage() {

    return (
        <QueryClientProvider client={queryClient}>
            <h1>This is Posts Page</h1>
            <PostList/>
        </QueryClientProvider>
    );
}

export default PostHomePage;