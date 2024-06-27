"use client";

import React from 'react';

type ButtonProps = {
    myOnClick: () => void;
    children: React.ReactNode;
}

function Button({myOnClick, children}: ButtonProps) {
    return (
        <button className={"bg-blue-500 text-white m-2 p-2 rounded-md"}
            onClick={myOnClick}>
            {children}
        </button>
    );
}

export default Button;