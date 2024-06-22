"use client"

import React from 'react';
import {getRandomIntBoundary} from "@/app/_lib/math";
import {usePathname, useRouter} from "next/navigation";

type ReviewsProps ={
    params: {
        productId: string
    }
}

function ProductReviewListPage( {params}: ReviewsProps) {

    const pathName = usePathname();
    console.log(pathName)
    console.log(params.productId)

    if (!params.productId || parseInt(params.productId,10) > 10){
        throw new Error('Error in Reviews with Product id cannot be larger than 10');
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-[calc(100vh-200px)] h-1.5 p-24">
            this is product review list page with product id : {params.productId}
        </div>
    );
}

export default ProductReviewListPage;