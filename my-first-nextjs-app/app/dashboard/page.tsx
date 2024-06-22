"use client"

import React, {useState} from 'react';
import {getRandomInt} from "@/app/_lib/math";


function DashboardHome() {

    const [message, setMessage] = useState("");

    const updateMessage = (newMessage: string) => {
        setMessage(newMessage + getRandomInt(1, 100));
    };

    const handleError = () => {
        console.log("=========================================================");
        throw new Error("Test Error");
    };

    return (
        <div className="flex flex-row items-center justify-start p-4">
            <h1>This Dashboard Home Page </h1>
            <h2>{message}</h2>
            <button onClick={() => updateMessage("A Random Integer : ")}>
                Update Message
            </button>
            <button onClick={handleError}>
                Test Error not works
            </button>
        </div>
    );
}

export default DashboardHome;