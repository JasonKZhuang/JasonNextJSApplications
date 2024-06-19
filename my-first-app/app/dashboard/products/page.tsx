"use client"


import React from 'react';
import {useRouter} from "next/navigation";
import {getRandomInt} from "@/app/lib/math";

function ProductListPage() {

    const router = useRouter()

    const handleNavigateToProductDetail = () => {
        const productId = getRandomInt(1, 100);
        router.push(`/dashboard/products/${productId}`);
    }

    const handleNavigateToProductDetailWtihQueryParameter = () => {
        const productId = getRandomInt(1, 100);
        router.push(`/dashboard/products/${productId}?color=blue`);
    }

    return (
        <div>
            <button type="button" onClick={handleNavigateToProductDetail}>
                Go to Single Product detail Page
            </button>
            <button type="button" onClick={handleNavigateToProductDetailWtihQueryParameter}>
                Go to Single Product detail Page with Color Query Parameter
            </button>
        </div>
    );
}

export default ProductListPage;