import React, {Suspense } from 'react';
import ModalDialog from "@/app/components/dialog/modal-dialog.tsx";
import Link from "next/link";
import UserList from "@/app/components/user/user-list.tsx";
import UserLoading from "@/app/users/loading.tsx";

function UserHomePage() {

    const onClose = async () => {
        "use server"
        console.log("you clicked onClose");
    }

    const onOk = async () => {
        "use server"
        console.log("you clicked  onOk");
    }

    return (
        <div className={"flex flex-col justify-start items-center p-10 bg-gray-400 w-full"}>
            <ModalDialog title={"Example Modal"}
                         onClose={onClose}
                         onOK={onOk}>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </ModalDialog>
            <h1 className="text-5xl">User Home Page</h1>
            <Link href="/" className="text-3xl underline">Go to Home</Link>
            <section className="text-2xl flex flex-col gap-4 p-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident error nemo dolores sunt. Natus
                    numquam hic praesentium nihil accusamus quis magni vero, debitis vitae libero. Dignissimos
                    repudiandae necessitatibus modi repellat.</p>
                <p>Modi laborum nam odio accusantium non eius? Aliquam, inventore suscipit? Quibusdam consequuntur autem
                    voluptates magni, tenetur eos ea aliquid, assumenda, voluptas atque voluptatum iste odit magnam
                    necessitatibus dolorum excepturi odio?</p>
            </section>
            <Suspense fallback={<UserLoading/>}>
                <UserList/>
            </Suspense>
        </div>
    );
}

export default UserHomePage;