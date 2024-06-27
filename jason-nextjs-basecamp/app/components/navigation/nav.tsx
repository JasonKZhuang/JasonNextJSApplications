import React from 'react';
import Link from "next/link";

function NavBar() {
    return (
        <nav className={"sticky top-0 bg-black h-10 shadow-[0_35px_60px_-15px_rgba(255,0,0,0.3)] hover:shadow-lg"}>
            <ul className={"flex flex-row justify-center items-center"}>
                <li className={"mx-1 p-2"}><Link href={"/"}>Home</Link></li>
                <li className={"mx-1 p-2"}><Link href={"/users"}>Users</Link></li>
                <li className={"mx-1 p-2"}><Link href={"/posts"}>Posts</Link></li>
                <li className={"mx-1 p-2"}><Link href={"/products"}>Products</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;