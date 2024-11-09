import React from 'react';
import {logout} from "@/app/_lib/users/user-auth-service";
import {redirect} from "next/navigation";

function SignOut() {
    return (
        <div className={"p-1 mt-2 w-1/2"}>
            <h1 className={"text-2xl"}>User logout</h1>
            <form action={async () => {
                "use server";
                await logout();
                redirect("/");
            }}
            >
                <button
                    type="submit"
                    className="mt-4 w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                >Logout
                </button>
            </form>
        </div>
    );
}

export default SignOut;
