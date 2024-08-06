"use client";

import React from 'react';
import {QueryClient, useMutation, useQuery} from "react-query";
import {myAddPost, myGetAllPosts} from "@/app/_lib/service/posts-service";
import {IPost} from "@/app/_interface/post-interface";
import PostCard from "@/app/_components/posts/post-card";

const queryClient = new QueryClient();
// react clientQuery can be used in client side rendering only
function PostList() {
    const [title, setTitle] = React.useState<string>("");
    const [body, setBody] = React.useState<string>("");


    const {data: posts, isLoading, error} = useQuery({
        queryKey: ['posts'],
        queryFn: async () => await myGetAllPosts()
    });

    // this one cannot be debug
    const {mutateAsync: addPostMutation} = useMutation({
        mutationFn: myAddPost,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (err) => {
            console.log(err);
        }
    });

    if (isLoading) {
        return <div className={"w-full text-center text-blue-500"}>Loading...</div>
    }

    if (error) {
        return <div className={"text-red-500"}>Wrong Error</div>
    }

    const handleSavePost = async () => {
        const newPost: IPost = {
            title: title,
            body: body
        };
        try {
          await addPostMutation(newPost);
        } catch (err) {
            throw new Error("client Failed to add post data");
        }
    }


    return (
        <section>
            <div className={"flex flex-row justify-start items-center w-20"}>
                <input className={"w-50 h-10 my-4 mx-4 text-black"}
                       type={"text"}
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}/>
                <input className={"w-50 h-10 my-4 mx-4 text-black"}
                       type={"text"}
                       value={body}
                       onChange={(e) => setBody(e.target.value)}/>

            </div>
            <button className={"w-20 h-10 bg-blue-500 text-xl"}
                    onClick={handleSavePost}>
                Save
            </button>
            <div className={"grid  grid-cols-3 gap-3  place-item-center w-full px-10 bg-amber-600"}>
                {
                    posts && posts.map((tmpPost: IPost, index) => {
                        return (
                            <PostCard key={`post-${index}`} post={tmpPost}/>
                        );
                    })
                }
            </div>
        </section>
    );
}

export default PostList;