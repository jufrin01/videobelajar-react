import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/images/logo.png';
import { DesktopStepper, MobileStepper } from './CheckoutStepper';

const CheckoutNavbar = ({ step = "method" }) => { // Default "method"
    return (
        <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="px-5 py-4 md:px-10 md:py-6 flex justify-between items-center">
                <Link to="/home" className="hover:opacity-80 transition-opacity">
                    <img src={logoImage} alt="Videobelajar Logo" className="h-8 md:h-10 w-auto object-contain" />
                </Link>

                <button className="block md:hidden text-gray-600 focus:outline-none p-2">
                    <i className="fa-solid fa-bars text-2xl"></i>
                </button>

                <div className="hidden md:flex items-center gap-4 text-base">
                    {/* Kirim prop step ke component stepper */}
                    <DesktopStepper currentStep={step} />
                </div>
            </div>

            <div className="block md:hidden px-5 pb-4 w-full border-t border-gray-50 pt-4">
                <MobileStepper currentStep={step} />
            </div>
        </nav>
    );
};

export default CheckoutNavbar;