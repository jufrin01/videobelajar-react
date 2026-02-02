import React from 'react';

const CheckboxItem = ({ label, checked, onChange }) => {
    return (
        <label className="flex items-center gap-3 cursor-pointer group select-none">
            <div className="relative flex items-center">
                <input
                    type="checkbox"
                    className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded checked:bg-primary checked:border-primary transition-colors"
                    checked={checked}
                    onChange={onChange}
                />
                <i className="fa-solid fa-check text-white text-xs absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none"></i>
            </div>
            <span className={`transition-colors ${checked ? 'text-primary font-medium' : 'group-hover:text-primary'}`}>
            {label}
        </span>
        </label>
    );
};

export default CheckboxItem;