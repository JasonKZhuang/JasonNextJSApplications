import React, {Suspense} from 'react';
import {IUser} from "@/app/interface/user-interface";
import UserDataService from "@/app/_lib/service/user-data-service";
import {IPost} from "@/app/interface/post-interface";
import {myGetPostsByUserId} from "@/app/_lib/service/posts-service";
import UserLoading from "@/app/users/loading";
import UserPosts from "@/app/components/posts/user-posts";

type SingleUserDetailPageProps ={
    params: {
        userId: string
    }
}

// SSG
export async function generateStaticParams(){
    const users = await UserDataService.getInstance().myGetUsersByFetch();
    return users.map(user => ({
        params: {
            userId: user.id.toString()
        }
    }));
}

export default async function SingleUserDetailPage({params}: SingleUserDetailPageProps) {
    // http://localhost:3000/users/2
    //const pathName = usePathname();
    //console.log(pathName)

    // http://localhost:3000/users/2?search=abc
    //const searchParams = useSearchParams();
    //console.log(searchParams)

    const userId = params.userId;

    const userDataPromise:Promise<IUser | null> = UserDataService.getInstance().myGetSingleUsersById(parseInt(userId));
    const userPostsPromise:Promise<IPost[]> = myGetPostsByUserId(parseInt(userId));
    //const [user, posts] = await Promise.all([userDataPromise, userPostsPromise]);
    const user = await userDataPromise;
    //const posts = await userPostsPromise;
    return (
        <div className={"flex flex-col justify-start items-center pt-10 py-20"}>
            <h2>{user && user.name}</h2>
            <Suspense fallback={<UserLoading/>}>
                <UserPosts promise ={userPostsPromise}/>
            </Suspense>
        </div>
    );
}

