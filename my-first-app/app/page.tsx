"use client"

import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter()
    return (
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] h-1.5 p-24">
            <h1>Nothing in the / home page</h1>
        </main>
    );
}
