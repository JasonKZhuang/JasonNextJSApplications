import React from 'react';

/**
 * A template file is similar to a layout in that it wraps each child layout or page.
 * Unlike layouts that persist across routes and maintain state,
 * templates create a new instance for each of their children on navigation.
 * @param children
 * @constructor
 */
function UserTemplate({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className={"bg-amber-700 h-10 flex flex-col justify-center items-center"}>
                User Template.tsx Contents
            </div>
            {children}
        </>
    );
}

export default UserTemplate;