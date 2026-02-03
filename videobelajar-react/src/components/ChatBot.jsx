import React, { useState, useRef, useEffect } from 'react';
import userPhoto from '../assets/images/user.png';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Foto Bot (Bisa ganti dengan import gambar lokal jika punya)
    const botPhoto = "https://ui-avatars.com/api/?name=Jufrin+Bot&background=fff&color=3ECF4C&size=128";

    // Config Link WA
    const phoneNumber = "6287853625295";
    const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Halo Admin, saya butuh bantuan.")}`;

    const faqOptions = [
        { id: 1, label: "Cara beli kelas?", answer: "Pilih kelas > Klik 'Beli Sekarang' > Pilih metode pembayaran > Selesai." },
        { id: 2, label: "Sertifikat?", answer: "Sertifikat otomatis terbuka setelah progres kelas mencapai 100%." },
        { id: 3, label: "Metode Bayar?", answer: "Bisa via Transfer Bank (BCA, BNI, Mandiri) atau E-Wallet (Gopay, OVO)." },
        {
            id: 5,
            label: "Hubungi Admin",
            answer: (
                <div className="flex flex-col gap-2">
                    <span>Klik tombol di bawah untuk chat WhatsApp Admin:</span>
                    <a href={waLink} target="_blank" rel="noreferrer" className="bg-green-600 text-white py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-md">
                        <i className="fa-brands fa-whatsapp text-lg"></i> Chat Admin
                    </a>
                </div>
            )
        },
    ];

    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: "Halo! 👋 Saya JufrinBot. Ada yang bisa dibantu?" }
    ]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleOptionClick = (option) => {
        const userMsg = { id: Date.now(), sender: 'user', text: option.label };
        setMessages((prev) => [...prev, userMsg]);
        setIsTyping(true);

        setTimeout(() => {
            const botMsg = { id: Date.now() + 1, sender: 'bot', text: option.answer };
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-poppins">

            {/* WINDOW CHAT */}
            {isOpen && (
                <div className="bg-white w-[350px] h-[500px] rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden mb-4 animate-fade-in-up">

                    {/* Header */}
                    <div className="bg-[#3ECF4C] p-4 flex items-center justify-between text-white shadow-md z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full p-0.5 relative">
                                <img src={botPhoto} alt="Bot" className="w-full h-full rounded-full object-cover" />
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">JufrinBot AI</h4>
                                <p className="text-[10px] opacity-90 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> Online
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                            <i className="fa-solid fa-xmark text-lg"></i>
                        </button>
                    </div>

                    {/* Body Chat */}
                    <div className="flex-1 bg-[#f8f9fa] p-4 overflow-y-auto custom-scrollbar space-y-4">

                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                                {/* 2. AVATAR (User / Bot) DI SAMPING PESAN */}
                                <img
                                    src={msg.sender === 'user' ? userPhoto : botPhoto}
                                    alt={msg.sender}
                                    className="w-8 h-8 rounded-full object-cover border border-gray-200 shadow-sm mb-1"
                                />

                                {/* Bubble Chat */}
                                <div
                                    className={`max-w-[75%] p-3 text-sm shadow-sm ${
                                        msg.sender === 'user'
                                            ? 'bg-[#3ECF4C] text-white rounded-2xl rounded-tr-none' // Style User
                                            : 'bg-white text-gray-700 border border-gray-100 rounded-2xl rounded-tl-none' // Style Bot
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Indikator Mengetik (Bot Avatar + Animasi) */}
                        {isTyping && (
                            <div className="flex items-end gap-2">
                                <img src={botPhoto} alt="Bot" className="w-8 h-8 rounded-full border border-gray-200 mb-1" />
                                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Footer Options */}
                    <div className="p-3 bg-white border-t border-gray-100">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {faqOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleOptionClick(option)}
                                    disabled={isTyping}
                                    className="text-[11px] bg-white hover:bg-green-50 text-gray-600 hover:text-[#3ECF4C] hover:border-[#3ECF4C] px-3 py-1.5 rounded-full border border-gray-200 transition-all active:scale-95 shadow-sm"
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* FLOAT BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${isOpen ? 'rotate-90 scale-0 opacity-0' : 'scale-100 opacity-100'} transition-all duration-300 absolute bottom-0 right-0 w-14 h-14 bg-[#3ECF4C] hover:bg-green-600 text-white rounded-full shadow-[0_4px_20px_rgba(62,207,76,0.4)] flex items-center justify-center group`}
            >
                <i className="fa-solid fa-robot text-2xl group-hover:scale-110 transition-transform"></i>
                {/* Badge Notif */}
                <span className="absolute top-0 right-0 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </button>

            {/* CLOSE BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 rotate-90'} transition-all duration-300 absolute bottom-0 right-0 w-14 h-14 bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-900`}
            >
                <i className="fa-solid fa-xmark text-xl"></i>
            </button>

        </div>
    );
};

export default ChatBot;