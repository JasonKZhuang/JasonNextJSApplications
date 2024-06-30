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
            <div className={"bg-green-400 h-10 flex flex-col justify-center items-center"}>
                User Layout.tsx Contents
            </div>
            {children}
        </>
    );
}
