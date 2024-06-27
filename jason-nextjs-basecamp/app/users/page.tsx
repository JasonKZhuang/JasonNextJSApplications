"use server";

import React, {Suspense} from 'react';
import Link from "next/link";
import UserLoading from "@/app/users/loading";
import UserList from "@/app/components/user/user-list";
import UserDataService from "@/app/_lib/service/user-data-service";

// since this is a server component, so we can use async/await here
async function UserHomePage() {

    const users = await UserDataService.getInstance().myGetUsersByFetch();

    // console.log("Here is the users data presented on server side : ", users)

    return (
        <div className={"flex flex-col justify-start items-center p-10 bg-gray-400 w-full"}>
            <h1 className="text-5xl">User Page</h1>
            <Link href="/" className="text-3xl underline my-2">Go to Home</Link>
            <Suspense fallback={<UserLoading/>}>
                <UserList argUsers={users}/>
            </Suspense>
        </div>
    );
}

export default UserHomePage;