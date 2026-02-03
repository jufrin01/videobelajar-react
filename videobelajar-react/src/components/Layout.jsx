import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatBot from './ChatBot';

// Layout menerima 'children', yaitu konten halaman (Home, Profile, dll)
const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-cream"> {/* min-h-screen agar full tinggi layar */}

            {/* 1. Navbar selalu ada di atas */}
            <Navbar />

            {/* 2. Main Content (children) akan mengisi ruang tengah */}
            <main className="flex-1 relative">
                {children}
            </main>

            {/* 3. Footer selalu ada di bawah */}
            <Footer />
            <ChatBot />

        </div>
    );
};

export default Layout;