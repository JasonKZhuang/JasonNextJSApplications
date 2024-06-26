import React from 'react';

function NavBar() {
    return (
        <nav className={"sticky top-0 bg-black h-10 shadow-[0_35px_60px_-15px_rgba(255,0,0,0.3)] hover:shadow-lg"}>
            <ul className={"flex flex-row justify-center items-center"}>
                <li className={"mx-1 p-2"}><a href="/">Home</a></li>
                <li className={"mx-1 p-2"}><a href="/users">Users</a></li>
                <li className={"mx-1 p-2"}><a href="/posts">Posts</a></li>
                <li className={"mx-1 p-2"}><a href="/products">Products</a></li>
            </ul>
        </nav>
    );
}

export default NavBar;