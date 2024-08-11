import {lusitana} from "@/app/_components/fonts";
import RevenueChart from "@/app/_components/dashboard/revenue-chart";
import {fetchRevenueByPrisma} from "@/app/_lib/service/revenue-service";
import {fetchLatestInvoiceByPrisma} from "@/app/_lib/service/invoice-service";
import LatestInvoices from "@/app/_components/dashboard/latest-invoices";
import CardWrapper from "@/app/_components/dashboard/cards";
import {Suspense} from "react";
import {CardsSkeleton, InvoiceSkeleton, RevenueChartSkeleton} from "@/app/_components/dashboard/skeletons";

export default async function Page() {

    // const revenue = await fetchRevenueByPrisma(); // need 3 seconds to fetch revenue data
    // const latestInvoices = await fetchLatestInvoiceByPrisma(); // wait for fetchRevenue() to finish

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            {/* Streaming a component using Suspense */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton/>}>
                    <CardWrapper/>
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton/>}>
                    <RevenueChart/>
                </Suspense>
                <Suspense fallback={<InvoiceSkeleton/>}>
                    <LatestInvoices />
                </Suspense>
            </div>
        </main>
    );
}