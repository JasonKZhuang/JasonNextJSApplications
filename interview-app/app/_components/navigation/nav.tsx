import React from 'react';

function NavBar() {
    return (
        <nav>
            <ul className={"flex flex-row justify-center items-center"} >
                <li className={"mx-1 p-2"}><a href="/">Home</a></li>
                <li className={"mx-1 p-2"}><a href="/user">User</a></li>
                <li className={"mx-1 p-2"}><a href="/product">Product</a></li>
            </ul>
        </nav>
    );
}

export default NavBar;