import React from 'react';
import Link from "next/link";
import {AuthRouteConstants} from "@/app/_interface/IAppRoutesConstants";

export const BtnSignUp = () => {
    return (
        <Link href={AuthRouteConstants.SIGNUP} className="button__login-common button__sign-up">
            <span>Sign Up</span>
        </Link>
    );
};