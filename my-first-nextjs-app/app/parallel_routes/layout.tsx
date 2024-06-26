import React from 'react';
import UsersPage from "@/app/parallel_routes/@users/page";
import RevenuePage from "@/app/parallel_routes/@revenue/page";
import NotificationsPage from "@/app/parallel_routes/@notifications/page";

function ParallelRoutesLayout(
    {children}:{children: React.ReactNode},
) {
    return (
        <>
            {children}
            <UsersPage />
            <RevenuePage/>
            <NotificationsPage/>
        </>
    );
}

export default ParallelRoutesLayout;