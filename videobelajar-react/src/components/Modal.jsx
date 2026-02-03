import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        // Overlay Gelap (Backdrop)
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity animate-fade-in">

            {/* Kotak Modal Putih */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8 relative animate-scale-up">

                {/* Tombol Close (X) di pojok kanan atas (Opsional) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>

                {/* Konten Modal (Dinamis) */}
                {children}
            </div>
        </div>
    );
};

export default Modal;