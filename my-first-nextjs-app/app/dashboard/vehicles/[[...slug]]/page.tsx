import React from 'react';

function VehiclePage(
    {params}: { params: { slug: string[] } }
) {
    // http://localhost:3000/dashboard/vehicles
    if (!params.slug) {
        return (
            <div className="flex flex-col items-center justify-start min-h-[calc(100vh-140px)] h-1.5 p-24">
                Vehicle List Page</div>
        );
    }

    //http://localhost:3000/dashboard/vehicles/car1
    if (params.slug.length === 1) {
        return (
            <div className="flex flex-col items-center justify-start min-h-[calc(100vh-140px)] h-1.5 p-24">
                Vehicle Detail Page: {params.slug[0]}
            </div>);
    }

    //http://localhost:3000/dashboard/vehicles/car1/color2
    if (params.slug.length === 2) {
        return <div>Vehicle Detail Page {params.slug[0]} with color id {params.slug[1]} </div>
    }

    //http://localhost:3000/dashboard/vehicles/car1/color2/model3
    return (
        <div>
            <h1>Final Vehicle Detail Page</h1>
        </div>
    );
}

export default VehiclePage;