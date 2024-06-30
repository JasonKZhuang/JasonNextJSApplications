"use server";

// since this is a server component, so we can use async/await here

import React, {Suspense} from 'react';
import Link from "next/link";
import UserLoading from "@/app/users/loading";
import UserList from "@/app/_components/user/user-list";
import UserDataService from "@/app/_lib/service/user-data-service";
import styles from './styles.module.css'

// define some method here for fetching data or call some service
async function getData() {
    const res = await fetch('https://api.example.com/...')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}




async function UserHomePage() {
    // using await to get data from server side
    const users = await UserDataService.getInstance().myGetUsersByFetch();

    // console.log("Here is the users data presented on server side : ", users)
    return (
        <div className={styles.userContainer}>
            <div className={"flex flex-col justify-center items-center w-full bg-blue-200"}>
                <h1 className="text-4xl text-center">User Page</h1>
                <h2>This is Server Component Style from Global CSS</h2>
                <h2 className={styles.userH2}>This is Server Component from module css</h2>

                <Link href="/" className="text-2xl underline my-2">Go to Home</Link>
            </div>
            <Suspense fallback={<UserLoading/>}>
                <UserList argUsers={users}/>
            </Suspense>
        </div>
    );
}

export default UserHomePage;