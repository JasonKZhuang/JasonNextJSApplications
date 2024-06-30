"use client"

import React from 'react';

function SingleProductReview(
    // this is path parameters like this
    // http://localhost:3000/products/2/reviews/1
    {params}: {
        params: {
            productId: string,
            reviewId: string,
        }
    }
) {
    return (
        <div className="flex flex-col items-center justify-start min-h-[calc(100vh-200px)] h-1.5 p-24">
            <h2>This is Product Review Detail page</h2>
            <h2>with product id : {params.productId}</h2>
            <h2>with review id : {params.reviewId}</h2>
        </div>
    );
}

export default SingleProductReview;