"use client"

import React from 'react';

function SingleProductReview(
    // this is path parameters like this
    // http://localhost:3000/dashboard/2/reviews/1
    {params}: {
        params: {
            productId: string,
            reviewId: string,
        }
    }
) {
    return (
        <div>
            <h2>This is Product Review Detail page</h2>
            <h2>with product id : {params.productId}</h2>
            <h2>with review id : {params.reviewId}</h2>
        </div>
    );
}

export default SingleProductReview;