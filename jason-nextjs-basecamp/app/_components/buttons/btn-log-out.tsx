import React from 'react';
import Link from "next/link";
import {AuthRouteConstants} from "@/app/_interface/IAppRoutesConstants";

export const BtnLogOut = () => {
    return (
        <Link href={AuthRouteConstants.LOGOUT} className="button__login-common button__sign-out">
            <span>Logout</span>
        </Link>
    );
};
