import React from 'react';

function DashboardTemplate({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className={"bg-amber-700 h-10 flex flex-col justify-center items-center"}>
                Next.js Template.tsx Contents
            </div>
            {children}
        </div>
    );
}

export default DashboardTemplate;