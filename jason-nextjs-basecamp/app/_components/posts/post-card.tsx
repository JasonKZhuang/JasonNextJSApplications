import React from 'react';
import {IPost} from "@/app/_interface/post-interface";

type PostCardProps = {
    post: IPost
}

function PostCard({post}: PostCardProps) {
    return (
        <div className={"flex flex-col justify-center items-center " +
            "h-auto my-4 mx-10 p-4 " +
            "rounded-lg shadow-lg " +
            "bg-green-800"}>
            <span>{post.id}</span>
            <span>{post.title}</span>
            <span>{post.body}</span>
        </div>
    );
}

export default PostCard;