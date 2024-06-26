"use client";

import React, {useEffect, useState} from 'react';
import {IPost} from "@/app/interface/post-interface";
import {myGetPosts} from "@/app/_lib/service/posts-service";

// this is server side rendering
function PostHomePage() {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {

        const callMyPosts = async () => {
            const tempData = await myGetPosts();
            if (tempData) {
                setPosts(tempData);
            }
        }


        const fetchDataForPosts = async () => {
            setLoading(true);
            //
            const abortController = new AbortController();
            setTimeout(() => {
                abortController.signal
            }, 5000);
            //
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts?_limit=8`, {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        signal: abortController.signal
                    }
                );

                if (!response.ok) {
                    setError(`HTTP error: Status ${response.status}`);
                    throw new Error(`HTTP error: Status ${response.status}`);
                }

                let postsData = await response.json();
                setPosts(postsData);
                setError(null);
            } catch (err) {
                if (err && (err as Error).message) {
                    setError((err as Error).message);
                }
                if (err && (err as Error).name === 'AbortError') {
                    console.log('Aborted');
                }
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        if (!posts || posts.length === 0) {
            // callMyPosts().then();
            fetchDataForPosts().then();
        }

    }, [posts]);

    return (
        <>
        {
            loading && <div className={"w-full text-center text-blue-500"}>Loading...</div>
        }

        <div className={"grid  grid-cols-3 gap-3  place-item-center w-full px-10]"}>
            {
                posts && posts.map((post: IPost, index) => {
                    return (
                        <div key={`post-id-${index}`}
                             className={"flex flex-col justify-center items-center " +
                                 "h-auto my-4 mx-10 p-4 " +
                                 "rounded-lg shadow-lg " +
                                 "bg-green-800"}>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                    );
                })
            }
            {
                error && <div className={"text-red-500"}>{error}</div>
            }
        </div>
        </>
    );
}

export default PostHomePage;