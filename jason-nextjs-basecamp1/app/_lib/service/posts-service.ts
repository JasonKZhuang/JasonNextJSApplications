"use server";

import axios, {AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders} from "axios";
import {IPost} from "@/app/interface/post-interface.ts";

export async function myGetPosts():Promise<IPost[]>{
    // url
    const endpoint ="https://jsonplaceholder.typicode.com/posts";
    // axios client instance
    const client = axios.create({
        baseURL: endpoint,
    });
    // request config
    const config: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
        } as RawAxiosRequestHeaders,
        params: {},
        timeout: 5000,
    };
    // execute
    try {
        const searchResponse: AxiosResponse = await client.get(endpoint, config);
        console.log(searchResponse.data);
        return searchResponse.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}