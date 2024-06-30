"use server";

import axios, {AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders} from "axios";
import {IPost} from "@/app/interface/post-interface";

const fetchingTimeout = 2000;

/**
 * using Axios to fetch data
 */
export async function myGetAllPosts(): Promise<IPost[]> {
    // url
    const endpoint = "https://jsonplaceholder.typicode.com/posts";
    // axios client instance
    const client = axios.create({
        baseURL: endpoint,
    });
    // request config
    const config: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
        } as RawAxiosRequestHeaders,
        timeout: fetchingTimeout,
    };
    // execute
    try {
        const searchResponse: AxiosResponse = await client.get(endpoint, config);
        // console.log(searchResponse.data);
        return searchResponse.data;
    } catch (err) {
        throw new Error("Failed to fetch posts data");
    }
}

export async function myAddPost(argPost: IPost): Promise<IPost | null> {
    const endpoint = "https://jsonplaceholder.typicode.com/posts";
    try {
        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: argPost.userId? argPost.userId : 1,
                title: argPost.title,
                body: argPost.body
            })
        });

        const data = await res.json();

        if (data) {
            return data;
        }
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
    return null;

}


/**
 * using Fetch API to fetch data
 * with AbortController signal
 * @param argUserId
 */
export async function myGetPostsByUserId(argUserId: number): Promise<IPost[]> {
    const endpoint = `https://jsonplaceholder.typicode.com/posts?userId=${argUserId}`;

    const abortController = new AbortController();
    setTimeout(() => {
        abortController.signal
    }, fetchingTimeout);

    const res = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        signal: abortController.signal
    });

    if (!res.ok) {
        throw new Error("Failed to fetch user posts data");
    }

    return res.json();
}

/**
 * this method combine fetch, abortController and revalidate
 * In Route handlers, fetch requests are not memoized as Route Handlers are not part of the React component tree.
 * @param argId
 */
export async function myGetSinglePostById(argId: number): Promise<IPost> {
    const endpoint = `https://jsonplaceholder.typicode.com/posts/${argId}`;

    const abortController = new AbortController();
    setTimeout(() => {
        abortController.signal
    }, fetchingTimeout);

    const res = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        signal: abortController.signal,
        cache: "force-cache", // 'force-cache' is the default, and can be omitted
        next: {revalidate: 60} // cache lifetime in seconds
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch user posts data");
    }

    return res.json();
}