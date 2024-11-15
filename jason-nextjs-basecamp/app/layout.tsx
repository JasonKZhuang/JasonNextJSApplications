import type {Metadata} from "next";
import "@/app/_styles/globals.css";
import {inter} from '@/app/_components/fonts';
import {UserProvider} from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body suppressContentEditableWarning={true}
                  className={`${inter.className} antialiased`}
            >
                <UserProvider>
                    {/*Tailwind antialiased class which smooths out the font.*/}
                    {children}
                </UserProvider>
            </body>
        </html>
    );
}
