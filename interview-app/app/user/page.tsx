"use client";

import React from 'react';


interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    }
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }

}

const fetchingTimeout = 5000;

function UserHomePage(props) {
    const [users, setUsers] = React.useState<IUser[]>([])


    const handleLoadUsersByAwait = async () => {
        const abortController = new AbortController();
        setTimeout(()=>{abortController.signal}, fetchingTimeout);
        const tmpUsers = await fetch("https://jsonplaceholder.typicode.com/users",{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            signal: abortController.signal
        });

        if (tmpUsers){
            const data = await tmpUsers.json()
            setUsers(data)
        }

    }


    return (
        <div className={"flex flex-col justify-start items-center p-10 bg-gray-400 w-full"}>
            <button className={"bg-green-900 text-white w-[200px] h-10"} onClick={handleLoadUsersByAwait}>Load</button>
            <div className={"grid grid-cols-4 gap-4"}>
            {
                users && users.map((it,index)=>{
                    return (
                        <div key={`user-div-${index}`}
                             className={"flex flex-col justify-center items-center p-5 bg-blue-400 w-auto h-auto mx-2 my-2"}
                        >
                        <span>{it.id}</span>
                        <span>{it.name}</span>
                        <span>{it.email}</span>
                    </div>);
                })
            }
            </div>
        </div>
    );
}

export default UserHomePage;