"use client"

import {notFound, useSearchParams} from "next/navigation";
import {isDigitString} from "@/app/_lib/verify";
import {useState} from "react";

type Props ={
    params: {
        productId: string
    }
}

function SingleProductDetail(
    // this is path parameters like this
    // http://localhost:3000/dashboard/2
    {params}: Props
) {
    // this is to get query parameters values like this url
    // http://localhost:3000/dashboard/2?search=dog
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams ? searchParams.get('color') : '');

    if (!isDigitString(params.productId) || parseInt(params.productId) > 1000) {
        notFound()
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-[calc(100vh-200px)] h-1.5 p-24">
            <h2>This is Product Home page with product id : {params.productId}</h2>
            <h2>and Query parameters value : {searchValue}</h2>
        </div>
    );
}

export default SingleProductDetail;


// const generateMetadata =({params}:Props):Metadata=>{
//     return {
//         title: `Product Detail ${params.productId}`,
//         description: `Product Detail page ${params.productId}`,
//         keywords: `Product Detail page ${params.productId}`,
//     }
// };