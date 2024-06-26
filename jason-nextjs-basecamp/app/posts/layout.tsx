import React, {Suspense} from 'react';
import Loading from "@/app/loading.tsx";

export default function PostLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Suspense fallback={<Loading/>}>
            {children}
        </Suspense>
    );
}
