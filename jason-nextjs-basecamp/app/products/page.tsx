"use client"

import React from 'react';
import {redirect, useRouter} from "next/navigation";
import Link from "next/link";
import {myGetRandomInt} from "@/app/_lib/utils/math";

function ProductListPage() {

    const router = useRouter()
    const [productId, setProductId] = React.useState(myGetRandomInt(1, 100))

    const handleNavigateToProductDetail = () => {
        const productId = myGetRandomInt(1, 100);
        router.push(`/products/${productId}`);
    }

    const handleNavigateToProductDetailWithQueryParameter = () => {
        const productId = myGetRandomInt(1, 100);
        router.replace(`/products/${productId}?color=blue`);
        // router.back();
        // router.forward();
        // router.refresh();
    }

    const handleRedirect = () => {
        // For Server Components, use the redirect function instead.
        // here in the client, it does not work
        redirect('/');
    }

    return (
        <div className="flex flex-col items-start justify-start min-h-[calc(100vh-140px)] h-1.5 p-24">
            <button type="button"
                    className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 " +
                        "font-medium rounded-lg text-sm " +
                        "px-5 py-2.5 me-2 mb-2 " +
                        "dark:bg-blue-600 dark:hover:bg-blue-700 " +
                        "focus:outline-none dark:focus:ring-blue-800"}
                    onClick={handleNavigateToProductDetail}>
                Single Product detail Page useRoute() hook
            </button>

            <button type="button"
                    className={"focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"}
                    onClick={handleNavigateToProductDetailWithQueryParameter}>
                Single Product detail Page with Color Query Parameter
            </button>
            <button type={"button"}
                    className={"focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"}
                    onClick={handleRedirect}>
                Use Redirect (Only works on Server Components)
            </button>

            <div className={"flex flex-col justify-start items-start w-full"}>
                <Link href={"/products/1"}>Product 1 with PATH parameter in client side</Link>
                <Link href={"/products/1?color=red"}>Product 1 with QUERY parameter in client side</Link>
                <Link href={"/products/1"} scroll={false}>Product 1 scroll = false </Link>
                <Link href={"/products/3"} replace>Product 3 Replace Link</Link>
                <Link href={`/products/${productId}`}>Product {productId}</Link>
            </div>
        </div>
    );
}

export default ProductListPage;