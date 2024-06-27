import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start bg-gray-400 p-10">
            <h1>this is home page</h1>
            <section className={"grid grid-cols-3 gap-3"}>
                <div className={"flex flex-col justify-center items-center w-max-[30%] bg-green-700 p-3"}>
                    <h2 className={"text-center"}>Users</h2>
                    <Link href={"/users"} className="text-xl underline">Go to Users</Link>
                </div>
                <div className={"flex flex-col justify-center items-center w-max-[30%] bg-green-700 p-3"}>
                    <h2 className={"text-center"}>Posts</h2>
                </div>
                <div className={"flex flex-col justify-center items-center w-max-[30%] bg-green-700 p-3"}>
                    <h2 className={"text-center"}>Products</h2>
                </div>
            </section>

        </main>
    );
}
