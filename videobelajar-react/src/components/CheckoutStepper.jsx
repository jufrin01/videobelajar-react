import React from 'react';

// 1. Sub-component: Item (Bulatan + Teks)
export const StepItem = ({ label, status, isMobile }) => {
    const isActive = status === 'active';
    return (
        <div className={`flex items-center gap-2 ${isActive ? 'animate-pulse-slow' : 'opacity-50'}`}>
            <div className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} rounded-full border-2 ${isActive ? 'border-green-500' : 'border-gray-300'} flex items-center justify-center p-0.5`}>
                <div className="w-full h-full bg-current rounded-full" style={{ color: isActive ? '#22C55E' : '#D1D5DB' }}></div>
            </div>
            <span className={`font-bold ${isActive ? 'text-gray-900' : 'text-gray-500'} whitespace-nowrap`}>
                {label}
            </span>
        </div>
    );
};

// 2. Sub-component: Garis Penghubung
export const StepLine = ({ isMobile }) => (
    <div className={`${isMobile ? 'flex-1 h-[1px]' : 'w-12 h-[2px]'} bg-gray-200 rounded-full`}></div>
);

// 3. Component Utama: Versi Desktop
export const DesktopStepper = () => (
    <>
        <StepItem label="Pilih Metode" status="active" />
        <StepLine />
        <StepItem label="Bayar" status="inactive" />
        <StepLine />
        <StepItem label="Selesai" status="inactive" />
    </>
);

// 4. Component Utama: Versi Mobile
export const MobileStepper = () => (
    <div className="flex justify-between items-center gap-2 text-xs">
        <StepItem label="Pilih Metode" status="active" isMobile />
        <StepLine isMobile />
        <StepItem label="Bayar" status="inactive" isMobile />
        <StepLine isMobile />
        <StepItem label="Selesai" status="inactive" isMobile />
    </div>
);