// A layout is UI that is shared between routes.
// This layout wraps the dashboard routes.

import {Metadata} from "next";

export const metadata: Metadata = {
    title: '> Dashboard Layout <',
}

export default function DashboardLayout(
    {children,}: { children: React.ReactNode }
) {
    return (
        <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav className={"flex-row p-5 bg-gray-400"}>
            <ul className={"flex flex-row space-x-4"}>
                <li className={"hover:bg-blue-400"}>
                    <a href="/dashboard">Dashboard (Layout)</a>
                </li>
                <li className={"hover:bg-blue-400"}>
                    <a href="/dashboard/products">Products(Layout)</a>
                </li>
                <li className={"hover:bg-blue-400"}>
                    <a href="/dashboard/vehicles">Vehicles(Layout)</a>
                </li>
                <li className={"hover:bg-blue-400"}>
                    <a href="/dashboard/settings">Settings(Layout)</a>
                </li>
            </ul>
        </nav>
        {children}
        {/*the followings are Parallel Routes*/}
    </section>);
}