import React from 'react';

const FilterGroup = ({ title, children, defaultOpen = false }) => {
    return (
        <details className="group mb-2" open={defaultOpen}>
            <summary className="flex justify-between items-center font-semibold text-gray-700 cursor-pointer list-none py-2 select-none">
                <span className="flex items-center gap-2">{title}</span>
                <span className="transition group-open:rotate-180">
                <i className="fa-solid fa-chevron-down text-xs text-gray-400"></i>
            </span>
            </summary>
            <div className="text-sm text-gray-500 mt-2 mb-4 space-y-3 pl-1">
                {children}
            </div>
        </details>
    );
};

export default FilterGroup;