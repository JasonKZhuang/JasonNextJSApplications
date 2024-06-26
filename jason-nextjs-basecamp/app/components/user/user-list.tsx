"use client"

import React, {useEffect, useState} from 'react';
import {IUser} from "@/app/interface/user-interface";
import UserDataService from "@/app/_lib/service/user-data-service";


function UserList() {
    //
    const [users, setUsers] = React.useState<IUser[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    //
    const handleLoadUsersByAwait = async () => {
        setLoading(true);
        try {
            const data = await UserDataService.getInstance().myGetUserDataByFetch();
            if (data) {
                setUsers(data);
            }
        } catch (error) {
            if (error && (error as Error).message) {
                setError((error as Error).message);
            }
        } finally {
            setLoading(false);
        }
    }
    //
    useEffect(() => {

        if (!users || users.length === 0) {
            handleLoadUsersByAwait().then();
        }

    }, [users]);

    return (
        <>
            <button className={"bg-green-900 text-white w-[200px] h-10"}
                    onClick={handleLoadUsersByAwait}>
                Load
            </button>
            {
                loading &&
                <dialog className={"w-full h-full flex flex-col justify-center items-center bg-gray-400 bg-opacity-50"}>
                    <h1>Loading</h1>
                </dialog>
            }
            {
                error &&
                <div className={"w-full h-full flex flex-col justify-center items-center bg-red-300"}>
                    <span>{error}</span>
                </div>
            }
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