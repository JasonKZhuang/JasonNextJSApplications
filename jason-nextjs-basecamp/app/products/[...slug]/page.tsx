"use client";

import React from 'react';
import {usePathname} from "next/navigation";

function ProductLeafPage() {
    const pathname = usePathname();
    return (
        <div>
            <h1>This is a product leaf page with {pathname}</h1>
        </div>
    );
}

export default ProductLeafPage;