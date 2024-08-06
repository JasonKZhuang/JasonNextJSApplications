"use server";
// since this is a server component, so we can use async/await here

import React from 'react';
import Link from "next/link";
import styles from '@/app/vehicles/vehicle.module.css';

type VehiclePageProps = {
    params: {
        slug: string[]
    },
    searchParams: URLSearchParams
}

function VehiclePage(
    {params, searchParams}: VehiclePageProps
) {
    console.log("=== Server side path parameters and clientQuery parameters ===")
    console.log(params);
    console.log(params.slug);
    console.log(searchParams);
    console.log("=========================================================")

    // http://localhost:3000/vehicles
    if (!params.slug) {
        return (
            <div className="flex flex-col items-center justify-start min-h-[calc(100vh-140px)] h-1.5 p-24">
                <h1 className={styles.h1}>Vehicle List Page</h1>
                <Link className={styles.link} href={"/vehicles/cars"}>Car List</Link>
                <Link className={styles.link} href={"/vehicles/trucks"}>Truck List</Link>
            </div>
        );
    }

    //http://localhost:3000/vehicles/car
    if (params.slug.length === 1) {

        return (
            <div className="flex flex-col items-center justify-start min-h-[calc(100vh-140px)] h-1.5 p-24">
                <h1 className={styles.h1}>
                    Vehicle - {params.slug[0]} - List Page
                </h1>
                <Link href={`/vehicles/${params.slug[0]}/brands`}>{params.slug[0]} Brand List</Link>
            </div>);
    }

    //http://localhost:3000/dashboard/vehicles/car/brand
    if (params.slug.length === 2) {
        return (
            <div className="flex flex-col items-center justify-start min-h-[calc(100vh-140px)] h-1.5 p-24">
                <h1 className={styles.h1}>
                    Vehicle {params.slug[0]} with {params.slug[1]}
                </h1>

            </div>
        )
    }

    //http://localhost:3000/dashboard/vehicles/car/model
    return (
        <div className="flex flex-col items-center justify-start min-h-[calc(100vh-140px)] h-1.5 p-24">
            <h1 className={styles.h1}>
                Final Vehicle Detail Page with
                [ {params.slug[0]} == model:{params.slug[1]} == color:{params.slug[2]} ]
            </h1>
        </div>
    );
}

export default VehiclePage;