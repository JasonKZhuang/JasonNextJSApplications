import {CalendarIcon} from '@heroicons/react/24/outline';
import {generateYAxis} from "@/app/_lib/utils/utils";
import {lusitana} from "@/app/_components/fonts";
import {Revenue} from "@prisma/client";
import {fetchRevenueByPrisma} from "@/app/_lib/service/revenue-service";

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export interface IRevenue {
    revenueProp?: Revenue[];
}

export default async function RevenueChart({revenueProp}: IRevenue) {

    const revenue = await fetchRevenueByPrisma(); // need 3 seconds to fetch revenue data

    const chartHeight = 350;
    const {yAxisLabels, topLabel} = generateYAxis(revenue);

    if (!revenue || revenue.length === 0) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    }

    return (
        <div className="w-full md:col-span-4">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Recent Revenue
            </h2>
            <div className="rounded-xl bg-gray-50 p-4 w-full">
                <div className={"sm:flex sm:flex-row flex-col gap-1"}>
                    <div className={"sm:flex flex-col hidden justify-between mb-6 text-sm text-gray-400 "}
                         style={{height: `${chartHeight}px`}}
                    >
                        {yAxisLabels.map((label) => (
                            <p key={label}>{label}</p>
                        ))}
                    </div>
                    <div className={"grid sm:grid-cols-12 grid-cols-1 items-end w-full gap-1"}>
                        {revenue.map((month) => (
                            <div key={month.month} className="flex flex-col items-center gap-2 w-full min-w-3">
                                {/* bars */}
                                <div
                                    className="w-full rounded-md bg-blue-300"
                                    style={{
                                        height: `${(chartHeight / topLabel) * month.revenue}px`,
                                    }}
                                ></div>
                                {/* x-axis */}
                                <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                                    {month.month}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center pb-2 pt-6">
                    <CalendarIcon className="h-5 w-5 text-gray-500"/>
                    <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
                </div>
            </div>
        </div>
    );
}
