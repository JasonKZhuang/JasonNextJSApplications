"use client"

import React, {useState} from "react";
import {notFound, useParams, useRouter, useSearchParams} from "next/navigation";
import {myIsDigitString} from "@/app/_lib/utils/verify";

type Props = {
    params: {
        productId: string
    }
}

function SingleProductDetail({params}: Props) {
    // this is path parameters values like this url
    // http://localhost:3000/products/2
    const tempProductId = params.productId;
    const [productId1, setProductId1] = useState(tempProductId);

    // this is to get path parameters values by using useParams() hook
    const tmpParams = useParams();
    console.log(tmpParams);
    const [productId2, setProductId2] = useState(tmpParams.productId);

    // this is to get query parameters values by using useSearchParams() hook
    // http://localhost:3000/products/2?search=dog
    const searchParams = useSearchParams();
    searchParams.forEach((value, key) => {
        console.log(key, value);
    });
    const tmpColor = searchParams.get("color") ? searchParams.get("color") : 'white';
    const [productColor, setProductColor] = useState(tmpColor);

    // this is to use the router to navigate to other pages
    const router = useRouter()

    // trigger not found
    if (!myIsDigitString(params.productId) || parseInt(params.productId) > 1000) {
        notFound()
    }

    const handleNavigateToReviewList = () => {
        router.push(`/dashboard/products/${params.productId}/reviews`);
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-[calc(100vh-200px)] h-1.5 p-24">
            <h2>ProductID1 : {productId1} - by using params.productId Props to obtain</h2>
            <h2>ProductID2 : {productId2} - by using useParams() hooks to obtain</h2>
            <h2>Query parameters value : {productColor} - by using useSearchParams to obtain</h2>
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