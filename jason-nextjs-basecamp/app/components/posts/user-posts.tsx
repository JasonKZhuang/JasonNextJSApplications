import React from 'react';
import {IPost} from "@/app/interface/post-interface";

type UserPostsProps = {
    promise: Promise<IPost[]>;
}

async function UserPosts({promise}: UserPostsProps) {
    const posts = await promise;
    return (
        <div>
            {
                posts && posts.map((post) => {
                    return (
                        <div key={post.id} className={"shadow hover:bg-green-700 mt-2 bg-gray-400"}>
                            <h3 className={"text-xl"}>{post.title}</h3>
                            <p>{post.body}</p>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default UserPosts;