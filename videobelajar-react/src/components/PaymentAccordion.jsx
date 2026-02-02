import React from 'react';

const PaymentAccordion = ({ title, isOpen, onToggle, children }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl mb-4 overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition-colors focus:outline-none"
            >
                <span className="font-bold text-gray-800">{title}</span>
                <i className={`fa-solid fa-chevron-down text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {isOpen && (
                <div className="border-t border-gray-100 p-2 animate-fade-in">
                    {children}
                </div>
            )}
        </div>
    );
};

export default PaymentAccordion;