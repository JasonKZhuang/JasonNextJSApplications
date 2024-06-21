"use client"

import Link from "next/link";
import React from "react";
import {usePathname} from "next/navigation";

const navLinks = [
    {
        name: "Register",
        href: "/auth/register"
    },
    {
        name: "Login",
        href: "/auth/login"
    },
    {
        name: "Forgot Password",
        href: "/auth/forgotPassword"
    }
]


function AuthLayout(
    {children,}: { children: React.ReactNode }
) {

    const pathName = usePathname();

    return (<section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav className={"flex-row p-1 bg-yellow-600"}>
            <ul className={"flex flex-row space-x-4"}>
                {
                    navLinks && navLinks.map((link) => {
                        const isActive = pathName ? pathName.startsWith(link.href) : false;
                        return (
                            <Link href={link.href} key={link.name}
                                  className={isActive ? "font-bold mx-2 text-blue-500" : "text-gray-500 mx-2"}
                            >
                                {link.name}
                            </Link>
                        );
                    })
                }

            </ul>
        </nav>
        {children}
    </section>);
}

export default AuthLayout;