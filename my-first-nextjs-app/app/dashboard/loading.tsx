import React from 'react';

// https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming
// SSR with React and Next.js helps improve the perceived loading performance by showing a non-interactive page to the user as soon as possible.
function DashboardLoading() {
    return (
        <div>Loading ... </div>
    );
}

export default DashboardLoading;