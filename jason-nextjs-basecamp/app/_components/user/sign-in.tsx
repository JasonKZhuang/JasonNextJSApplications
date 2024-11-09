"use client";

import React from 'react';
import {login} from "@/app/_lib/users/user-auth-service";
import {redirect} from "next/navigation";

function SignIn() {
    return (
        <div className={"p-1 mt-2 w-1/2"}>
            <h1 className={"text-2xl"}>User login</h1>
            <form action={async (formData) => {
                "use server";
                await login(formData);
                redirect("/users");
            }}
            >
                <input
                    id="email"
                    name={"email"}
                    type="email"
                    placeholder="you@example.com"
                    className="w-full my-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-gray-700"
                />
                <br/>
                <input
                    id="name"
                    name={"name"}
                    type={"text"}
                    placeholder="Jason Zhuang"
                    className="w-full my-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-gray-700"
                />
                <br/>
                <button
                    type="submit"
                    className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                >
                    Login
                </button>
            </form>

        </div>
    );
}

export default SignIn;