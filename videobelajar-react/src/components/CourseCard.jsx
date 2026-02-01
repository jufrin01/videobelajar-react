import React from 'react';

const CourseCard = (
        {
            img,
            title,
            desc,
            authorName,
            authorRole,
            authorImg,
            rating,
            reviews,
            price}) => {

    return (
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer">

            {/* 1. Thumbnail Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* 2. Content Body */}
            <div className="p-5 flex flex-col flex-1">

                {/* Title & Desc */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                    {desc}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 mb-5">
                    <img src={authorImg} alt={authorName} className="w-9 h-9 rounded-lg object-cover" />
                    <div>
                        <p className="text-sm font-bold text-gray-800 leading-none">{authorName}</p>
                        <p className="text-xs text-gray-400 mt-1">{authorRole}</p>
                    </div>
                </div>

                {/* Footer (Rating & Price) */}
                <div className="mt-auto flex justify-between items-end pt-3">
                    <div className="flex items-center gap-1">
                        <div className="flex text-yellow-400 text-xs">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star-half-stroke"></i>
                            <i className="fa-regular fa-star"></i>
                        </div>
                        <span className="text-xs text-gray-400 ml-1 underline">{rating} ({reviews})</span>
                    </div>
                    <span className="text-xl font-bold text-primary">{price}</span>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;