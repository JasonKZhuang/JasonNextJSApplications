import React from 'react';
import Link from "next/link";
import {AuthRouteConstants} from "@/app/_interface/IAppRoutesConstants";


export const BtnSignIn = () => {
    return (
        <Link href={AuthRouteConstants.LOGIN} className="button__login-common button__sign-in">
            <span>Sign In</span>
        </Link>
    );
};