import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    // Set waktu awal (Misal 23 jam 59 menit 59 detik)
    const [time, setTime] = useState({ hours: 23, minutes: 59, seconds: 59 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => {
                const { hours, minutes, seconds } = prevTime;

                // Logika hitung mundur
                if (seconds > 0) return { ...prevTime, seconds: seconds - 1 };
                if (minutes > 0) return { ...prevTime, minutes: minutes - 1, seconds: 59 };
                if (hours > 0) return { ...prevTime, hours: hours - 1, minutes: 59, seconds: 59 };

                clearInterval(timer); // Berhenti jika waktu habis
                return prevTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Helper untuk menambah nol di depan (01, 05, dll)
    const format = (num) => num.toString().padStart(2, '0');

    return (
        <div className="flex items-center gap-1 font-bold text-white">
            <span className="bg-[#FF5722] px-2 py-1 rounded text-sm">{format(time.hours)}</span>
            <span className="text-[#FF5722] font-bold">:</span>
            <span className="bg-[#FF5722] px-2 py-1 rounded text-sm">{format(time.minutes)}</span>
            <span className="text-[#FF5722] font-bold">:</span>
            <span className="bg-[#FF5722] px-2 py-1 rounded text-sm">{format(time.seconds)}</span>
        </div>
    );
};

export default CountdownTimer;