"use server";

import React, {Suspense} from 'react';
import {IUser} from "@/app/_interface/user-interface";
import UserDataService from "@/app/_lib/service/user-data-service";
import {IPost} from "@/app/_interface/post-interface";
import {myGetPostsByUserId} from "@/app/_lib/service/posts-service";
import UserLoading from "@/app/users/loading";
import UserPosts from "@/app/_components/posts/user-posts";


async function getUserById(argId: number): Promise<IUser | null> {
    //
    const endpoint = `https://jsonplaceholder.typicode.com/users/${argId}`;
    //
    const abortController = new AbortController();
    setTimeout(()=>abortController.abort(), 5000);
    //
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        signal: abortController.signal
    };

    const response = await fetch(endpoint, requestOptions);

    if(!response.ok){
        throw new Error(response.statusText);
    }

    return await response.json();

}

async function getPostsByUserId(argUserId: number): Promise<IPost[]> {
    //
    const endpoint = `https://jsonplaceholder.typicode.com/posts`;
    //
    const abortController = new AbortController();
    setTimeout(()=>abortController.abort(), 5000);
    //
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        params:{
            "userId": argUserId
        },
        signal: abortController.signal,
        next:{
            revalidate: 10 //seconds
        }
    };

    const response = await fetch(endpoint, requestOptions);

    if(!response.ok){
        throw new Error(response.statusText);
    }

    return await response.json();
}

type SingleUserDetailPageProps ={
    params: {
        userId: string
    }
}

export default async function SingleUserDetailPage({params}: SingleUserDetailPageProps) {
    // http://localhost:3000/users/2
    //const pathName = usePathname();
    //console.log(pathName)

    // http://localhost:3000/users/2?search=abc
    //const searchParams = useSearchParams();
    //console.log(searchParams)

    //const userDataPromise:Promise<IUser | null> = UserDataService.getInstance().myGetSingleUsersById(parseInt(userId));
    //const userPostsPromise:Promise<IPost[]> = myGetPostsByUserId(parseInt(userId));
    //const [user, posts] = await Promise.all([userDataPromise, userPostsPromise]);
    //const user = await userDataPromise;
    //const posts = await userPostsPromise;

    const userId = params.userId;
    const userObject = await getUserById(parseInt(userId));
    const postList:Promise<IPost[]> = getPostsByUserId(parseInt(userId));

    return (
        <div className={"flex flex-col justify-start items-center pt-10 py-20"}>
            <div className={"flex flex-col justify-start items-center"}>
                {
                    userObject? <>
                            <h2>ID: {userObject.id}</h2>
                            <h2>Name: {userObject.name}</h2>
                            <span>Email: {userObject.email}</span>
                            {
                                userObject.address? <div>
                                    <span>{userObject.address.suite}</span>
                                    <span>{userObject.address.street}</span>
                                    <span>{userObject.address.city}</span>
                                </div> : null
                            }
                            <span>{userObject.phone}</span>
                            {
                                userObject.company? <div>
                                    <span>{userObject.company.name}</span>
                                    <span>{userObject.company.catchPhrase}</span>
                                    <span>{userObject.company.bs}</span>
                                </div> : null
                            }
                            <span>WebSite: {userObject.website}</span>
                        </> :
                        <span className={"text-red-500"}>No found user by {userId}</span>
                }
            </div>
            <Suspense fallback={<UserLoading/>}>
                <UserPosts promise ={postList}/>
            </Suspense>
        </div>
    );
}

// SSG (Static Site Generation)
export async function generateStaticParams(){
    const users = await UserDataService.getInstance().myGetUsersByFetch();
    return users.map(user => ({
        params: {
            userId: user.id.toString()
        }
    }));
}