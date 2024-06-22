"use client"

import React from 'react';
import {redirect, useRouter} from "next/navigation";
import {getRandomInt} from "@/app/_lib/math";
import Link from "next/link";

function ProductListPage() {
    const router = useRouter()
    const [productId, setProductId] = React.useState(100)

    const handleNavigateToProductDetail = () => {
        const productId = getRandomInt(1, 100);
        router.push(`/dashboard/products/${productId}`);
    }

    const handleNavigateToProductDetailWithQueryParameter = () => {
        const productId = getRandomInt(1, 100);
        router.replace(`/dashboard/products/${productId}?color=blue`);
        // router.back();
        // router.forward();
        // router.refresh();
    }

    const handleThrowAnError = () => {
        throw new Error("Test Error at Product List Page");
    }

    const handleRedirect = () => {
        // For Server Components, use the redirect function instead.
        // here in the client, it does not work
        redirect('/');
    }

    return (
        <div className="flex flex-col items-start justify-start min-h-[calc(100vh-140px)] h-1.5 p-24">
            <button type="button" onClick={handleNavigateToProductDetail}>
                Single Product detail Page useRoute()
            </button>
            <button type="button" onClick={handleNavigateToProductDetailWithQueryParameter}>
                Single Product detail Page with Color Query Parameter
            </button>
            <button onClick={handleRedirect}>
                Use Redirect Only works on Server Components
            </button>
            <button type="button" onClick={handleThrowAnError}>
                Test Throw An Error at Product List level
            </button>

            <div className={"flex flex-col justify-start items-start w-full"}>
                <Link href={"/dashboard/products/1"} scroll={false}>Product 1</Link>
                <Link href={"/dashboard/products/2"}>Product 2</Link>
                <Link href={"/dashboard/products/3"} replace>Product 3 Replace Link</Link>
                <Link href={`/dashboard/products/${productId}`}>Product {productId}</Link>
            </div>
        </div>
    );
}

export default ProductListPage;