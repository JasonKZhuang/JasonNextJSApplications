"use server";

import React from 'react';
import {IUser} from "@/app/interface/user-interface";
import Link from "next/link";


// The `fetch` function is automatically memoized and the result is cached
export const getUserData = async (): Promise<IUser[]> => {
    console.log("Fetching user data at " + new Date().toLocaleTimeString());
    const endpoint ="https://jsonplaceholder.typicode.com/users";
    //
    const abortController = new AbortController();
    setTimeout(() => {
        abortController.signal
    }, 5000);
    //
    const tmpUsersRes = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        // cache: "force-cache", // this is default
        next: {
            revalidate: 60 // seconds
        }, // seconds
        signal: abortController.signal
    });

    if (!tmpUsersRes.ok) {
        throw new Error("Failed to fetch user data");
    }

    if (tmpUsersRes) {
        return await tmpUsersRes.json();
    }

    return [];
}


type UserListProps = {
    argUsers?: IUser[]
}

async function UserList({argUsers}: UserListProps) {
    let users = [];
    if (argUsers && argUsers.length > 0) {
        users = argUsers;
    }else {
        // This function is called twice, but only executed the first time
        users = await getUserData();
        // The second call could be anywhere in your route
        users = await getUserData() // cache HIT
    }

    return (
        <div className={"grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-3"}>
            {
                users && users.map((it, index) => {
                    return (
                        <div key={`user-div-${index}`}
                             className={"flex flex-col justify-center items-center " +
                                 "mx-2 my-2 p-5 w-min-[240px] h-min-[200px] " +
                                 "bg-blue-400"}
                        >
                            <span className={"text-red-700"}><Link href={`/users/${it.id}`}> {it.name}</Link></span>
                            <span>{it.email}</span>
                        </div>);
                })
            }
        </div>
    );
}

export default UserList;