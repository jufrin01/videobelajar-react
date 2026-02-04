import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
    return (
        <div className="max-w-6xl mx-auto mb-6 text-xs md:text-sm text-gray-500 print:hidden flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide font-poppins">

            {/* Loop semua items breadcrumb */}
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={index} className="flex items-center gap-2 shrink-0">
                        {/* Jika item memiliki link dan bukan item terakhir -> Render Link */}
                        {!isLast && item.path ? (
                            <Link
                                to={item.path}
                                className="hover:text-[#3ECF4C] transition-colors truncate max-w-[200px]"
                                title={item.label}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            /* Jika item terakhir atau tidak ada link -> Render Teks Biasa (Aktif) */
                            <span className={`${isLast ? 'text-gray-900 font-semibold border-b-2 border-[#3ECF4C]' : 'text-gray-500 cursor-default'} truncate max-w-[200px]`} title={item.label}>
                                {item.label}
                            </span>
                        )}

                        {/* Separator / (Jangan muncul di item terakhir) */}
                        {!isLast && (
                            <span className="text-gray-300">/</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Breadcrumb;