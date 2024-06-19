"use client"
import {useSearchParams} from "next/navigation";

function BlogPage(
    {params}: { params: { id: number } }
) {
    const searchParams = useSearchParams();

    const search = searchParams && searchParams.get('search')

    return (
        <div>
            <a href="http://localhost:3000/blog/1?search=111">Test with path params and query params</a>
            <div>My Post with path parameter: {params.id}</div>
            <div>My Post with query parameter: {search}</div>
        </div>
    )

}

export default BlogPage;