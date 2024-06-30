import {IPost} from "@/app/interface/post-interface";

type UserPostsProps = {
    promise: Promise<IPost[]>;
}

async function UserPosts({promise}: UserPostsProps) {
    const posts = await promise;

    return (
        <div className={"flex flex-col justify-start items-center m-5 p-5"}>
            {
                posts && posts.map((post) => {
                    return (
                        <div key={post.id} className={"flex flex-col justify-center items-start " +
                            "mt-5 p-5 w-full bg-gray-400 " +
                            "cursor-pointer shadow hover:bg-green-700 "}>
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