"use client";

import React, {useEffect} from 'react';

function ErrorBoundary({
                           error,
                           reset
                       }: {
                           error: Error,
                           reset: () => void
                       }
) {

    useEffect(() => {
        // Log the error to an error reporting service
        console.info("====================================================");
        console.error(error);
        console.info("====================================================");
    }, [error])

    return (
        <div className="flex flex-col items-center justify-start min-h-[calc(100vh-200px)] h-1.5 p-24">
            <h2>
                This Error information will be presented when reviews page.tsx throw any error.
            </h2>
            <h3 className={"text-red-500"}>{error.message}</h3>
            <button onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
            }>
                Try again - this will reload the reviews.page.tsx
            </button>

        </div>
    );
}

export default ErrorBoundary;