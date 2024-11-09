import Link from "next/link";
import React from "react";
import {PrivateDashboardRouteConstants} from "@/app/_interface/IAppRoutesConstants";

export const BtnDashboard = () => {
    return (
        <Link href={PrivateDashboardRouteConstants.DASHBOARD} className="button__login-common button__dashboard">
            <span>Dashboard</span>
        </Link>
    );
};