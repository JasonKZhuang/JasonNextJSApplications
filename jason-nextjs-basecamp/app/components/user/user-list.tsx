"use client"

import React, {useEffect} from 'react';
import UserDataService from "@/app/_lib/service/user-data-service.tsx";
import {IUser} from "@/app/interface/user-interface.ts";


function UserList() {

    const [users, setUsers] = React.useState<IUser[]>([]);

    const handleLoadUsersByAwait = async () => {
        const data = await UserDataService.getInstance().myGetUserDataByFetch();
        if (data) {
            setUsers(data);
        }
    }

    useEffect(() => {
        console.log(users);
        if (!users || users.length===0) {
            handleLoadUsersByAwait().then();
        }

    }, [users]);

    return (
        <>
            <button className={"bg-green-900 text-white w-[200px] h-10"}
                    onClick={handleLoadUsersByAwait}>
                Load
            </button>

            <div className={"grid grid-cols-4 gap-4"}>
                {
                    users && users.map((it, index) => {
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
        </>
    );
}

export default UserList;