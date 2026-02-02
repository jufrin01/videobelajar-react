import React from 'react';

const PaymentOption = ({ id, logo, name, selected, onSelect }) => {
    const isSelected = selected === id;

    return (
        <div
            onClick={() => onSelect(id)}
            className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all border mb-2 ${
                isSelected ? 'border-orange bg-orange/5' : 'border-transparent hover:bg-gray-50'
            }`}
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-8 flex items-center justify-center bg-white rounded border border-gray-100 p-1">
                    <img src={logo} alt={name} className="max-h-full max-w-full object-contain" />
                </div>
                <span className={`font-medium ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                {name}
            </span>
            </div>

            {isSelected && (
                <i className="fa-solid fa-circle-check text-orange text-xl"></i>
            )}
        </div>
    );
};

export default PaymentOption;