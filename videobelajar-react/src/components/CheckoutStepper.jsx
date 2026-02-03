import React from 'react';

// 1. Helper: Tentukan status langkah
const getStatus = (stepName, currentStep) => {
    const steps = ["method", "payment", "done"];
    const currentIndex = steps.indexOf(currentStep);
    const stepIndex = steps.indexOf(stepName);

    if (stepIndex < currentIndex) return "done"; // Sudah lewat
    if (stepIndex === currentIndex) return "active"; // Sedang aktif
    return "inactive"; // Belum
};

// 2. Sub-component: Item
export const StepItem = ({ label, status, isMobile }) => {
    let borderColor = 'border-gray-300';
    let bgColor = 'bg-transparent';
    let content = null;
    let textColor = 'text-gray-500';

    if (status === 'active') {
        borderColor = 'border-green-500';
        content = <div className="w-full h-full bg-green-500 rounded-full" />; // Titik Hijau
        textColor = 'text-gray-900';
    } else if (status === 'done') {
        borderColor = 'border-green-500';
        bgColor = 'bg-green-500';
        // Ganti titik dengan Icon Centang Putih
        content = <i className="fa-solid fa-check text-white text-[10px] md:text-xs"></i>;
        textColor = 'text-green-600';
    } else {
        content = <div className="w-full h-full bg-gray-300 rounded-full" />; // Titik Abu
    }

    return (
        <div className={`flex items-center gap-2 ${status === 'active' ? 'animate-pulse-slow' : ''}`}>
            <div className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} rounded-full border-2 ${borderColor} ${bgColor} flex items-center justify-center p-0.5`}>
                {content}
            </div>
            <span className={`font-bold ${textColor} whitespace-nowrap`}>
                {label}
            </span>
        </div>
    );
};

// 3. Sub-component: Garis
export const StepLine = ({ isMobile, status }) => (
    <div className={`${isMobile ? 'flex-1 h-[1px]' : 'w-12 h-[2px]'} rounded-full ${status === 'done' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
);

// 4. Component Utama: Desktop
export const DesktopStepper = ({ currentStep }) => (
    <>
        <StepItem label="Pilih Metode" status={getStatus("method", currentStep)} />
        <StepLine status={getStatus("method", currentStep) === 'done' ? 'done' : 'inactive'} />

        <StepItem label="Bayar" status={getStatus("payment", currentStep)} />
        <StepLine status={getStatus("payment", currentStep) === 'done' ? 'done' : 'inactive'} />

        <StepItem label="Selesai" status={getStatus("done", currentStep)} />
    </>
);

// 5. Component Utama: Mobile
export const MobileStepper = ({ currentStep }) => (
    <div className="flex justify-between items-center gap-2 text-xs">
        <StepItem label="Pilih Metode" status={getStatus("method", currentStep)} isMobile />
        <StepLine isMobile status={getStatus("method", currentStep) === 'done' ? 'done' : 'inactive'} />

        <StepItem label="Bayar" status={getStatus("payment", currentStep)} isMobile />
        <StepLine isMobile status={getStatus("payment", currentStep) === 'done' ? 'done' : 'inactive'} />

        <StepItem label="Selesai" status={getStatus("done", currentStep)} isMobile />
    </div>
);