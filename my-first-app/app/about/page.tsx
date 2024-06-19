import React from 'react';
import type {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "=>About Page"
};


function AboutPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] h-1.5 p-24">
            <Link href={"/"}>Home</Link>
            <h1>This about  page</h1>
        </div>
    );
}

export default AboutPage;