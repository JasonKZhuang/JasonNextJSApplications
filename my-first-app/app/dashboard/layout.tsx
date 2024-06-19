// A layout is UI that is shared between routes.
// This layout wraps the dashboard routes.
export default function DashboardLayout(
    {children,}: { children: React.ReactNode }
) {
    return (<section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav className={"flex-row p-5 bg-blue-600"}>
            <ul className={"flex flex-row space-x-4"}>
                <li className={"hover:bg-blue-400"}>
                    <a href="/dashboard">Dashboard</a>
                </li>
                <li className={"hover:bg-blue-400"}>
                    <a href="/dashboard/products">Products</a>
                </li>
                <li className={"hover:bg-blue-400"}>
                    <a href="/dashboard/vehicles">Vehicles</a>
                </li>
                <li className={"hover:bg-blue-400"}>
                    <a href="/dashboard/settings">Settings</a>
                </li>

            </ul>
        </nav>
        {children}
    </section>);
}