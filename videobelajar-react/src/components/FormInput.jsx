import React from 'react';

const FormInput = ({ label, type = "text", placeholder, value, onChange, required = false }) => {
    return (
        <div className="mb-5 text-left">
            {/* Label Input */}
            <label className="block text-sm font-medium text-gray-600 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {/* Kolom Input */}
            <input
                type={type}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
};

export default FormInput;