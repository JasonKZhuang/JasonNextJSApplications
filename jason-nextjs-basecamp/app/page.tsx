import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start bg-gray-400 p-10">
            <h1>this is home page</h1>
            <Link href={"/users?showDialog=y"} className="text-3xl underline">Go to Products with Modal</Link>
            <Link href={"/users"} className="text-3xl underline">Go to Products without Modal</Link>
        </main>
    );
}
