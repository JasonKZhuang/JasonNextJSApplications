import {IPhoto} from "@/app/interface/photo-interface";
import {cache} from 'react'

const abortController = new AbortController();
setTimeout(() => {
    abortController.signal
}, 5000);

export const myGetAllPhotos = cache(async (): Promise<IPhoto | null> => {

    const endpoint = "https://jsonplaceholder.typicode.com/photos";

    const initOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        signal: abortController.signal
    }

    const res = await fetch(endpoint, initOptions);

    if (!res.ok) {
        throw new Error("Failed to fetch photos data");
    }

    if (res) {
        return await res.json();
    }
    return null;
})


export const myGetPhotosByAlbumId= cache(async (argId: number): Promise<IPhoto | null> => {

    const endpoint = `https://jsonplaceholder.typicode.com/photos?albumId=${argId}`;

    const initOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        signal: abortController.signal
    }

    const res = await fetch(endpoint, initOptions);

    if (!res.ok) {
        throw new Error("Failed to fetch photos data");
    }

    if (res) {
        return await res.json();
    }

    return null;
})
