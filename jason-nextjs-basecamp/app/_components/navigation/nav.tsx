import React from 'react';
import Link from "next/link";

function NavBar() {
    return (
        <nav className={"sticky top-0 bg-black h-10 shadow-[0_35px_60px_-15px_rgba(255,0,0,0.3)] hover:shadow-lg"}>
            <ul className={"flex flex-row justify-center items-center"}>
                <li className={"mx-1 p-2"}><Link href={"/"}>Home</Link></li>
                <li className={"mx-1 p-2"}><Link href={"/users"}>Users (Server Side)</Link></li>
                <li className={"mx-1 p-2"}><Link href={"/posts"}>Posts (Client Side)</Link></li>
                <li className={"mx-1 p-2"}><Link href={"/posts/clientQuery"}>Posts Query (Client Side)</Link></li>
                <li className={"mx-1 p-2"}><Link href={"/posts/serverQuery"}>Posts Query (Server Side)</Link></li>
                <li className={"mx-1 p-2"}><Link href={"/vehicles"}>Vehicles (Server Side)</Link></li>
                <li className={"mx-1 p-2"}><Link href={"/products"}>Products (Client Side)</Link></li>

            </ul>
        </nav>
    );
}

export default NavBar;