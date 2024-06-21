"use client";

import React from 'react';

function ErrorBoundary({error}:{
    error: Error
}) {
    return (
        <div>
            Error in Reviews with {error.message}
        </div>
    );
}

export default ErrorBoundary;