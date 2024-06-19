"use client"

import React, {useState} from 'react';
import Link from "next/link";


function DashboardHome() {

    const [message, setMessage] = useState("");

    const updateMessage = (newMessage: string) => {
        setMessage(newMessage + Math.random().toFixed(3));
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-[calc(100vh-140px)] h-1.5 p-24">
            <div className={"flex flex-row justify-around items-center m-2"}>
                <h1>This Dashboard Home with message: {message}</h1>
                <button onClick={() => updateMessage("A new Message")}>
                    Update Message
                </button>
            </div>
            <div className={"flex flex-row justify-around items-center m-2"}>
                <div className={"w-[200px] h-[200px] mx-1 px-1 bg-amber-700"}>
                    Part one
                </div>
                <div className={"w-[200px] h-[200px] mx-1 px-1 bg-amber-700"}>
                    Part two
                </div>
            </div>
        </div>
    );
}

export default DashboardHome;