import {IUser} from "@/app/_interface/user-interface";

export async function fetchTemplateServiceGet(): Promise<IUser[] | null> {
    const endpoint = "https://jsonplaceholder.typicode.com/users";
    //
    const abortController = new AbortController();
    setTimeout(() => {
        abortController.signal
    }, 3000);
    //
    const initConfig: RequestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "max-age=604800", // // A cached response is okay unless it's more than a week old
            //"API-Key": process.env.DATA_API_KEY,
        },
        cache: "force-cache", // this is default
        next: {revalidate: 3000},
        signal: abortController.signal,
        credentials: "same-origin", //Controls what browsers do with credentials
        mode: "cors",
        priority: "auto",
    };
    //
    const response = await fetch(endpoint, initConfig);

    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }

    if (response) {
        return await response.json();
    }

    return null;

}