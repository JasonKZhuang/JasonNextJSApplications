"use client"

import {notFound, useRouter, useSearchParams} from "next/navigation";
import {isDigitString} from "@/app/_lib/verify";
import React, {useState} from "react";
import {getRandomInt, getRandomIntBoundary} from "@/app/_lib/math";

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
    const router = useRouter()
    const [searchValue, setSearchValue] = useState(searchParams ? searchParams.get('color') : '');

    if (!isDigitString(params.productId) || parseInt(params.productId) > 1000) {
        notFound()
    }

    const handleNavigateToReviewList = () => {
        router.push(`/dashboard/products/${params.productId}/reviews`);
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-[calc(100vh-200px)] h-1.5 p-24">
            <h2>This is Product Details page with product id : {params.productId}</h2>
            <h2>and Query parameters value : {searchValue}</h2>
            <button type="button" onClick={handleNavigateToReviewList}>
                Go to Product Review List Page
            </button>
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