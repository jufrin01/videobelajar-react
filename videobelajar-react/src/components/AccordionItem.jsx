import React from 'react';

const AccordionItem = ({ title, isOpen, onClick, children }) => {
    return (
        <div className={`border rounded-lg overflow-hidden transition-all duration-300 ${isOpen ? 'border-primary shadow-sm' : 'border-gray-200'}`}>
            {/* Header Accordion - BISA DIKLIK */}
            <button
                onClick={onClick}
                className={`w-full flex justify-between items-center p-4 cursor-pointer text-left focus:outline-none transition-colors ${isOpen ? 'bg-green-50' : 'bg-white hover:bg-gray-50'}`}
            >
                <h4 className={`font-semibold text-sm ${isOpen ? 'text-primary' : 'text-gray-700'}`}>
                    {title}
                </h4>
                <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-gray-400'}`}></i>
            </button>

            {/* Isi Accordion (Animasi Sederhana) */}
            {isOpen && (
                <div className="p-4 bg-white border-t border-gray-100 animate-fade-in">
                    {children}
                </div>
            )}
        </div>
    );
};

export default AccordionItem;