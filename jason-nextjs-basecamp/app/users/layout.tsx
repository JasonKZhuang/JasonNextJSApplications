import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "User Home Page",
    description: "User Home Page",
    keywords: ["User", "Home", "Page"],
}

export default function UserLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
