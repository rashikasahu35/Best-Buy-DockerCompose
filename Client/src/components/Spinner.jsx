import React from "react";

const Spinner = () => {
    return (
        <div className="h-[100vh] flex items-center justify-center">
            <div className="flex gap-2">
                <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-600"></div>
                <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-600"></div>
                <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-600"></div>
            </div>
        </div>
    );
};

export default Spinner;
