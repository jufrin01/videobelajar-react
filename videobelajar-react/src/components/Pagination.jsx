import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Jika halaman hanya 1, tidak perlu menampilkan pagination
    if (totalPages <= 1) return null;

    // Helper untuk membuat array nomor halaman
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center items-center gap-2 mt-12">
            {/* Tombol Previous */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                <i className="fa-solid fa-chevron-left text-xs"></i>
            </button>

            {/* Nomor Halaman */}
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all shadow-sm ${
                        currentPage === number
                            ? 'bg-[#FF5722] text-white border border-[#FF5722] shadow-md transform scale-105' // Active Style
                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#FF5722]'
                    }`}
                >
                    {number}
                </button>
            ))}

            {/* Tombol Next */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
        </div>
    );
};

export default Pagination;