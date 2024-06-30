import React from 'react';

export default function PostLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className={"bg-yellow-500 h-10 flex flex-col justify-center items-center"}>
                Post layout.tsx Contents
            </div>
            {children}
        </>
    );
}
