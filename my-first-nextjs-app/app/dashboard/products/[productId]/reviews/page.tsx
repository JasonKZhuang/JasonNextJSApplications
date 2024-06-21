import React from 'react';
import {getRandomIntBoundary} from "@/app/_lib/math";

function ProductReviewListPage() {

    const randomValue = getRandomIntBoundary(2);

    if (randomValue===1){
        throw new Error('Error in Reviews with review id' + randomValue);
    }

    return (
        <div>

            this is product review list page

        </div>
    );
}

export default ProductReviewListPage;