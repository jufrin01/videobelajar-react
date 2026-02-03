import React from 'react';
import { Link } from 'react-router-dom';

const UserSidebar = ({ activeMenu }) => {
    const menus = [
        { label: "Profil Saya", link: "/profile", icon: "fa-user" },
        { label: "Kelas Saya", link: "/kelas-saya", icon: "fa-book" },
        { label: "Pesanan Saya", link: "/pesanan-saya", icon: "fa-bag-shopping" },
    ];

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-fit sticky top-24">
            <ul className="space-y-2">
                {menus.map((menu, idx) => {
                    const isActive = activeMenu === menu.label;
                    return (
                        <li key={idx}>
                            <Link
                                to={menu.link}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                                    isActive
                                        ? 'bg-[#FFF2E2] text-[#FF5722] border border-[#FF5722]' // Warna Orange Aktif
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <i className={`fa-solid ${menu.icon} w-5 text-center`}></i>
                                {menu.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default UserSidebar;