'use client'

// https://nextjs.org/docs/app/api-reference/file-conventions/error
import React, {useEffect} from 'react';

export default function Error({
                           error,
                           reset
                       }: {
                           error: Error
                           reset: () => void
                       }
) {

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-start min-h-[calc(100vh-200px)] h-1.5 p-24">
            <h2>
                Jason - This Customized Error information will be presented when reviews page.tsx throw any error.
            </h2>
            <h3 className={"text-red-500"}>{error.message}</h3>
            <button className={"bg-blue-500 text-white m-2 p-2 rounded-md"}
                onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
            }>
                Jason - Try again - this will reload the page.tsx
            </button>
        </div>
    );
}

