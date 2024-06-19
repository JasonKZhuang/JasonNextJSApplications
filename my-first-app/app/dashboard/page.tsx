"use client"

import React, {useState} from 'react';
import Link from "next/link";


function DashboardHome() {

    const [message, setMessage] = useState("");

    const updateMessage = (newMessage: string) => {
        setMessage(newMessage + Math.random().toFixed(3));
    };

    return (
        <div className={"bg-amber-600 flex-col justify-start items-center w-full"}>
            <h1>This Dashboard Home</h1>
            <h2>{message}</h2>
            <button onClick={()=>updateMessage("A new Message")}>
                Update Message
            </button>
            <Link href={`/dashboard/settings`}>
                <button>Go to Nested Setting Page</button>
            </Link>
            <Link href={`/dashboard/products`}>
                <button>Go to Nested Product list Page</button>
            </Link>
        </div>
    );
}

export default DashboardHome;