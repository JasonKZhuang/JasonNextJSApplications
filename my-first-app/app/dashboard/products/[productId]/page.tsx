"use client"

import React, {useState} from 'react';
import {notFound, useSearchParams} from "next/navigation";
import {isDigitString} from "@/app/lib/verify";

function SingleProductDetail(
    // this is path parameters like this
    // http://localhost:3000/dashboard/2
    {params}: { params: { productId: string } }
) {
    // this is to get query parameters values like this url
    // http://localhost:3000/dashboard/2?search=dog
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams ? searchParams.get('color') : '');

    if (!isDigitString(params.productId) || parseInt(params.productId) > 1000) {
        notFound()
    }

    return (
        <div>
            <h2>This is Product Home page with product id : {params.productId}</h2>
            <h2>and Query parameters value : {searchValue}</h2>
        </div>
    );
}

export default SingleProductDetail;