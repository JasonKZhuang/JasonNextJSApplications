import type {Metadata} from "next";
import "./globals.css";
import Link from "next/link";

// this metadata is good for SEO
export const metadata: Metadata = {
    title: "**Home Page**",
    description: "Generated by create next app",
};

export default function RootLayout(
    {children,}: Readonly<{ children: React.ReactNode; }>
) {
    return (
        <html lang="en">
        <body>
        <header className={"flex flex-row justify-center items-center bg-blue-300 w-full h-10"}>
            <Link href={"/"} className={"flex flex-row justify-center items-center h-full p-4 mx-2 "}>
                Home
            </Link>
            <Link href={"/about"} className={"flex flex-row justify-center items-center h-full p-4 mx-2 "}>
                About
            </Link>
            <Link href={"/blog"} className={"flex flex-row justify-center items-center h-full p-4 mx-2 "}>
                Blog
            </Link>
            <Link href={"/dashboard"} className={"flex flex-row justify-center items-center h-full p-4 mx-2 "}>
                Dashboard
            </Link>
            <Link href={"/profile"} className={"flex flex-row justify-center items-center h-full p-4 mx-2 "}>
                Profile
            </Link>
        </header>
        {children}
        <footer className={"flex flex-row justify-center items-center bg-blue-300 w-full h-24"}>
            this is footer
        </footer>
        </body>
        </html>
    );
}
