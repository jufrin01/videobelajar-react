import React, { useState, useMemo, useEffect } from 'react';
import LearningNavbar from '../components/LearningNavbar';
import StickyFooter from '../components/StickyFooter';
import Modal from '../components/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseWithModules } from '../data/coursesData';

const ClassDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // 1. GET DATA
    const course = getCourseWithModules(id);

    // Handle Data Not Found
    if (!course) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
                <h2 className="text-xl font-bold text-gray-700">Data kelas tidak ditemukan.</h2>
                <button onClick={() => navigate('/kelas-saya')} className="text-white bg-[#3ECF4C] px-6 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors">
                    Kembali ke Kelas Saya
                </button>
            </div>
        );
    }

    // 2. SETUP ITEMS
    const allItems = useMemo(() => {
        return course.modules.flatMap(group => group.items);
    }, [course]);

    const [activeItemId, setActiveItemId] = useState(() => {
        const active = allItems.find(i => i.status === 'active');
        return active ? active.id : allItems[0]?.id;
    });
    const [openModuleIndex, setOpenModuleIndex] = useState(0);

    const currentIndex = allItems.findIndex(item => item.id === activeItemId);
    const activeItem = allItems[currentIndex] || allItems[0];
    const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
    const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

    // --- STATE QUIZ ---
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    // --- STATE MODAL & HASIL ---
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);

    // --- STATE REVIEW (BARU) ---
    const [showReviewModal, setShowReviewModal] = useState(false); // <--- State Modal Review
    const [userRating, setUserRating] = useState(0);               // <--- State Bintang

    const [score, setScore] = useState(0);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [isPassed, setIsPassed] = useState(false);

    // Reset saat ganti materi
    useEffect(() => {
        setQuizStarted(false);
        setQuizFinished(false);
        setShowConfirmModal(false);
        setShowReviewModal(false); // Reset modal review
        setCurrentQuestionIndex(0);
        setAnswers({});
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeItemId]);

    const currentQuestions = activeItem?.questions || [];

    // --- HANDLERS ---
    const handleFinishButton = () => setShowConfirmModal(true);

    const calculateResult = () => {
        setShowConfirmModal(false);

        let correctCount = 0;
        currentQuestions.forEach((q, idx) => {
            if (answers[idx] === q.correctAnswer) correctCount++;
        });

        const finalScore = Math.round((correctCount / currentQuestions.length) * 100);
        setScore(finalScore);
        setCorrectAnswersCount(correctCount);
        setIsPassed(finalScore >= 60);

        // Tampilkan Halaman Hasil
        setQuizFinished(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRetryQuiz = () => {
        setAnswers({});
        setCurrentQuestionIndex(0);
        setQuizFinished(false);
        setQuizStarted(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handler Submit Review
    const handleSubmitReview = () => {
        // Logika kirim review ke backend bisa ditaruh di sini
        alert(`Terima kasih! Anda memberi rating ${userRating} Bintang.`);
        setShowReviewModal(false);
        setUserRating(0);
    };

    // --- HELPERS ---
    const getIcon = (type, status) => {
        const isCompleted = status === 'completed' || course.progress === 100 || (activeItem.id === activeItemId && quizFinished && isPassed);
        if (isCompleted) return <i className="fa-solid fa-circle-check text-[#3ECF4C] text-lg"></i>;
        const iconColor = status === 'active' ? 'text-[#3ECF4C]' : 'text-gray-400';
        switch(type) {
            case 'video': return <i className={`fa-solid fa-circle-play ${iconColor} text-lg`}></i>;
            case 'doc': return <i className={`fa-solid fa-file-lines ${iconColor} text-lg`}></i>;
            case 'quiz': return <i className={`fa-solid fa-clipboard-question ${iconColor} text-lg`}></i>;
            default: return <i className={`fa-solid fa-circle-play ${iconColor} text-lg`}></i>;
        }
    };

    const getItemStatus = (item) => {
        if (item.id === activeItemId && quizFinished && isPassed) return 'completed';
        return course.progress === 100 ? 'completed' : item.status;
    };

    const handleItemClick = (item) => { setActiveItemId(item.id); };
    const toggleModule = (idx) => setOpenModuleIndex(openModuleIndex === idx ? -1 : idx);
    const handleAnswerSelect = (optionIndex) => setAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
    const handleNextQuestion = () => { if (currentQuestionIndex < currentQuestions.length - 1) setCurrentQuestionIndex(prev => prev + 1); };
    const handlePrevQuestion = () => { if (currentQuestionIndex > 0) setCurrentQuestionIndex(prev => prev - 1); };

    // --- FOOTER CONFIG ---
    const footerConfig = useMemo(() => {
        if (quizStarted) {
            return {
                onPrev: prevItem ? () => handleItemClick(prevItem) : null,
                onNext: nextItem ? () => handleItemClick(nextItem) : null,
                prevTitle: null,
                nextTitle: null,
                customRightButton: null,
                middleContent: (
                    <div className="w-full text-center font-bold text-white text-sm md:text-lg truncate px-4 flex items-center justify-center gap-2">
                        <i className={`fa-solid ${quizFinished ? 'fa-trophy' : 'fa-clipboard-question'} text-white/80`}></i>
                        {course.title}
                    </div>
                )
            };
        } else {
            return {
                onPrev: prevItem ? () => handleItemClick(prevItem) : null,
                onNext: nextItem ? () => handleItemClick(nextItem) : null,
                prevTitle: prevItem?.title,
                nextTitle: nextItem?.title,
                middleContent: (
                    <div className="hidden md:flex flex-col items-center w-full">
                        <span className="text-xs font-semibold mb-1 opacity-90">{currentIndex + 1} dari {allItems.length} Materi Selesai</span>
                        <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                            <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }}></div>
                        </div>
                    </div>
                ),
                customRightButton: !nextItem ? (
                    <button onClick={() => window.location.reload()} className="bg-white text-[#3ECF4C] font-bold px-6 py-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                        Selesai Kelas <i className="fa-solid fa-check"></i>
                    </button>
                ) : null
            };
        }
    }, [quizStarted, quizFinished, currentQuestionIndex, currentQuestions, prevItem, nextItem, course.progress, course.title, currentIndex, allItems.length]);

    const todayDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    return (
        <div className="min-h-screen bg-white font-poppins flex flex-col relative">

            <LearningNavbar title={course.title} progress={course.progress} currentModule={currentIndex + 1} totalModules={allItems.length} courseId={course.id} />

            {/* --- MODAL 1: KONFIRMASI QUIZ --- */}
            <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
                <div className="text-center flex flex-col items-center">
                    <div className="w-48 h-48 mb-4"><img src="https://img.freepik.com/free-vector/business-decisions-concept-illustration_114360-4107.jpg" alt="Confirm" className="w-full h-full object-contain mix-blend-multiply"/></div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Selesaikan Quiz</h3>
                    <p className="text-gray-500 mb-8 text-sm md:text-base">Apakah kamu yakin untuk menyelesaikan quiz ini?</p>
                    <div className="flex gap-4 w-full">
                        <button onClick={() => setShowConfirmModal(false)} className="flex-1 py-3 rounded-xl border border-[#3ECF4C] text-[#3ECF4C] font-bold hover:bg-green-50 transition-colors">Batal</button>
                        <button onClick={calculateResult} className="flex-1 py-3 rounded-xl bg-[#3ECF4C] text-white font-bold hover:bg-green-600 transition-colors shadow-md">Selesai</button>
                    </div>
                </div>
            </Modal>

            {/* --- MODAL 2: REVIEW & RATING --- */}
            <Modal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)}>
                <div className="text-center flex flex-col items-center pt-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Tulis Review Terbaikmu!</h3>
                    <p className="text-gray-500 mb-6 text-sm">Berikan penilaian jujur Anda tentang materi ini.</p>

                    {/* Bintang Rating Interaktif */}
                    <div className="flex gap-3 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <i
                                key={star}
                                className={`fa-solid fa-star text-3xl cursor-pointer transition-transform hover:scale-110 ${star <= userRating ? 'text-[#FFC107]' : 'text-gray-300'}`}
                                onClick={() => setUserRating(star)}
                            ></i>
                        ))}
                    </div>

                    {/* Text Area Review */}
                    <textarea
                        className="w-full border border-gray-300 rounded-xl p-4 mb-8 focus:outline-none focus:border-[#3ECF4C] focus:ring-1 focus:ring-[#3ECF4C] text-sm resize-none"
                        rows="4"
                        placeholder="Masukkan Review"
                    ></textarea>

                    {/* Tombol Aksi */}
                    <div className="flex gap-4 w-full">
                        <button
                            onClick={() => setShowReviewModal(false)}
                            className="flex-1 py-3 rounded-xl border border-[#3ECF4C] text-[#3ECF4C] font-bold hover:bg-green-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleSubmitReview}
                            className="flex-1 py-3 rounded-xl bg-[#3ECF4C] text-white font-bold hover:bg-green-600 transition-colors shadow-md"
                        >
                            Selesai
                        </button>
                    </div>
                </div>
            </Modal>

            {/* --- MODAL 3: HASIL QUIZ (Modal Kecil tidak dipakai, diganti Full Page) --- */}
            {/* ... (Kode Modal Hasil Opsional jika ingin tetap ada, tapi logic sekarang pakai full page) ... */}

            <div className="flex-1 max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row pb-[80px]">

                {/* KOLOM KIRI (CONTENT) */}
                <div className="flex-1 w-full lg:w-[70%] bg-white min-h-0 border-r border-gray-100 flex flex-col">
                    {activeItem?.type === 'quiz' && (
                        <>
                            {!quizStarted ? (
                                // 1. TAMPILAN RULES
                                <div className="w-full flex flex-col flex-1">
                                    <div className="relative w-full h-[220px] md:h-[300px] bg-[#4ECDC4] overflow-hidden flex items-center justify-center">
                                        <div className="absolute inset-0 bg-[#00A99D]"></div><img src="https://img.freepik.com/free-vector/summer-background-with-palm-leaves_23-2147820066.jpg" alt="BG" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"/><h1 className="relative z-10 text-6xl md:text-8xl font-black text-white tracking-widest drop-shadow-md">RULES</h1>
                                    </div>
                                    <div className="p-8 md:p-12 bg-white text-gray-900 flex-1">
                                        <h2 className="text-2xl font-bold mb-4">Aturan: {activeItem.title}</h2>
                                        <div className="space-y-3 text-gray-500 mb-8 text-base">
                                            <p>Kerjakan ujian dengan teliti.</p>
                                            <div className="flex gap-6 mt-4"><div><p className="text-xs text-gray-400 font-bold uppercase">Passing</p><p className="font-bold text-lg">60%</p></div><div><p className="text-xs text-gray-400 font-bold uppercase">Soal</p><p className="font-bold text-lg">{currentQuestions.length}</p></div><div><p className="text-xs text-gray-400 font-bold uppercase">Durasi</p><p className="font-bold text-lg">10 Mnt</p></div></div>
                                        </div>
                                        <button onClick={() => setQuizStarted(true)} className="bg-[#3ECF4C] hover:bg-green-600 text-white font-bold py-3 px-10 rounded-lg shadow-md w-full md:w-auto mt-6">Mulai Ujian</button>
                                    </div>
                                </div>
                            ) : quizFinished ? (
                                // 2. TAMPILAN CONGRATS
                                <div className="w-full flex flex-col flex-1 bg-white animate-fade-in">
                                    <div className="relative w-full h-[220px] md:h-[300px] bg-[#4ECDC4] overflow-hidden flex items-center justify-center">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#2ab5a8] to-[#4ECDC4]"></div>
                                        <img src="https://img.freepik.com/free-vector/flat-design-mountain-landscape_23-2149156327.jpg" alt="BG" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"/>
                                        <h1 className="relative z-10 text-5xl md:text-8xl font-black text-white tracking-widest drop-shadow-[0_4px_0_rgba(0,0,0,0.2)]" style={{fontFamily: 'Impact, sans-serif'}}>
                                            {isPassed ? 'CONGRATS' : 'NICE TRY'}
                                        </h1>
                                    </div>
                                    <div className="p-6 md:p-10">
                                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Tanggal Ujian Akhir:</h2>
                                        <p className="text-gray-500 mb-8">{todayDate}</p>
                                        <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-200 rounded-xl overflow-hidden mb-8 text-center">
                                            <div className="p-4 bg-[#3ECF4C] text-white flex flex-col items-center justify-center"><span className="text-xs font-bold uppercase opacity-90 mb-1">Nilai</span><span className="text-3xl font-black">{score}</span></div>
                                            <div className="p-4 bg-white border-l border-gray-100 flex flex-col items-center justify-center"><span className="text-xs font-bold text-gray-400 uppercase mb-1">Soal</span><span className="text-2xl font-bold text-gray-800">{currentQuestions.length}</span></div>
                                            <div className="p-4 bg-white border-l border-gray-100 flex flex-col items-center justify-center"><span className="text-xs font-bold text-gray-400 uppercase mb-1">Benar</span><div className="flex items-center gap-2"><i className="fa-solid fa-circle-check text-[#3ECF4C]"></i><span className="text-2xl font-bold text-gray-800">{correctAnswersCount}</span></div></div>
                                            <div className="p-4 bg-white border-l border-gray-100 flex flex-col items-center justify-center"><span className="text-xs font-bold text-gray-400 uppercase mb-1">Salah</span><div className="flex items-center gap-2"><i className="fa-solid fa-circle-xmark text-red-500"></i><span className="text-2xl font-bold text-gray-800">{currentQuestions.length - correctAnswersCount}</span></div></div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{isPassed ? 'Selesai!' : 'Belum Lulus'}</h3>
                                        <p className="text-gray-500 leading-relaxed mb-8">{isPassed ? "Selamat! Pretest sudah selesai dan kamu sudah mengetahui progresmu. Saatnya melanjutkan ke materi berikutnya." : "Nilai kamu belum memenuhi passing grade. Jangan menyerah, pelajari materi lagi dan coba ulangi ujiannya."}</p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {isPassed ? (nextItem && (<button onClick={() => handleItemClick(nextItem)} className="bg-[#3ECF4C] hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2">Lanjut Materi <i className="fa-solid fa-arrow-right"></i></button>)) : (<button onClick={handleRetryQuiz} className="bg-[#FF5722] hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"><i className="fa-solid fa-rotate-right"></i> Ulangi Ujian</button>)}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // 3. TAMPILAN QUIZ
                                <div className="flex flex-col md:flex-row h-full">
                                    <div className="w-full md:w-[240px] p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-100 flex-shrink-0 bg-white">
                                        <h3 className="font-bold text-gray-900 mb-3">List Soal</h3>
                                        <div className="grid grid-cols-5 gap-2 md:gap-3">
                                            {currentQuestions.map((_, idx) => {
                                                const isActive = currentQuestionIndex === idx;
                                                const isAnswered = answers[idx] !== undefined;
                                                let btnClass = isActive ? "bg-[#FFF8E1] border-[#FFC107] text-[#FFC107] font-bold shadow-md ring-1 ring-[#FFC107]" : isAnswered ? "bg-[#F0FDF4] border-[#3ECF4C] text-[#3ECF4C] font-bold" : "bg-white border-gray-200 text-gray-600";
                                                return <button key={idx} onClick={() => setCurrentQuestionIndex(idx)} className={`h-9 w-full text-sm rounded-lg border flex items-center justify-center transition-all ${btnClass}`}>{idx + 1}</button>;
                                            })}
                                        </div>
                                        <div className="hidden md:block mt-6"><button onClick={handleFinishButton} className="w-full py-2 border border-blue-400 text-blue-500 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors">Selesaikan Ujian</button></div>
                                    </div>
                                    <div className="flex-1 p-5 md:p-10 flex flex-col bg-white">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Pertanyaan {currentQuestionIndex + 1}</h3>
                                        <p className="text-gray-600 leading-relaxed mb-6">{currentQuestions[currentQuestionIndex].question}</p>
                                        <div className="space-y-3 mb-8">
                                            {currentQuestions[currentQuestionIndex].options.map((opt, optIdx) => {
                                                const isSelected = answers[currentQuestionIndex] === optIdx;
                                                return (
                                                    <div key={optIdx} onClick={() => handleAnswerSelect(optIdx)} className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${isSelected ? 'border-[#3ECF4C] bg-[#F0FDF4]' : 'border-gray-200 hover:bg-gray-50'}`}>
                                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-[#3ECF4C]' : 'border-gray-300'}`}>{isSelected && <div className="w-2.5 h-2.5 bg-[#3ECF4C] rounded-full"></div>}</div>
                                                        <span className={`text-sm ${isSelected ? 'font-semibold text-[#3ECF4C]' : 'text-gray-600'}`}>{opt}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="flex justify-between gap-3 mt-auto pt-6 border-t border-gray-50">
                                            <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0} className="flex-1 md:flex-none px-6 py-3 rounded-lg border border-[#3ECF4C] text-[#3ECF4C] font-bold text-sm hover:bg-green-50 disabled:opacity-50 flex items-center justify-center gap-2"><i className="fa-solid fa-arrow-left"></i> Sebelumnya</button>
                                            {currentQuestionIndex === currentQuestions.length - 1 ? (<button onClick={handleFinishButton} className="flex-1 md:flex-none px-6 py-3 rounded-lg bg-[#3ECF4C] text-white font-bold text-sm hover:bg-green-600 flex items-center justify-center gap-2 shadow-md">Selesai <i className="fa-solid fa-check"></i></button>) : (<button onClick={handleNextQuestion} className="flex-1 md:flex-none px-6 py-3 rounded-lg bg-[#3ECF4C] text-white font-bold text-sm hover:bg-green-600 flex items-center justify-center gap-2 shadow-md">Selanjutnya <i className="fa-solid fa-arrow-right"></i></button>)}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* B. VIDEO & DOC (TETAP SAMA) */}
                    {activeItem?.type === 'video' && (
                        <>
                            <div className="w-full aspect-video bg-black flex items-center justify-center relative group">{activeItem.videoId ? <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${activeItem.videoId}?rel=0`} title={activeItem.title} frameBorder="0" allowFullScreen></iframe> : <div className="text-white text-center"><p>Video tidak tersedia</p></div>}</div>
                            <div className="p-6 bg-white"><h1 className="text-xl font-bold">{activeItem.title}</h1><p className="text-gray-500 text-sm mt-2">{course.description}</p></div>
                        </>
                    )}
                    {activeItem?.type === 'doc' && (<div className="p-10 text-center h-[400px] flex flex-col justify-center items-center"><i className="fa-regular fa-file-pdf text-5xl text-[#3ECF4C] mb-4"></i><h2 className="text-xl font-bold">{activeItem.title}</h2><button className="mt-4 bg-[#3ECF4C] text-white px-6 py-2 rounded-lg">Download PDF</button></div>)}

                    {/* MOBILE MODUL LIST (Dengan Review Button) */}
                    <div className="lg:hidden bg-white p-5 pt-6 pb-20 border-t border-gray-100">
                        <h3 className="font-bold mb-4 text-gray-900 text-lg">Daftar Modul</h3>
                        <div className="space-y-3">{course.modules.map((mod, idx) => (
                            <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden">
                                <div className="flex justify-between py-3 px-4 bg-gray-50 cursor-pointer items-center" onClick={()=>toggleModule(idx)}><h4 className="font-bold text-sm text-gray-800">{mod.title}</h4><i className={`fa-solid fa-chevron-up text-xs text-gray-500 transition-transform ${openModuleIndex===idx?'':'rotate-180'}`}></i></div>
                                {openModuleIndex===idx && (<div className="bg-white p-2 space-y-2">{mod.items.map(item => (<div key={item.id} onClick={()=>handleItemClick(item)} className={`flex gap-3 p-3 rounded-lg items-start transition-all cursor-pointer ${activeItemId===item.id ? 'bg-[#F0FDF4] border border-[#3ECF4C]' : 'hover:bg-gray-50 border border-transparent'}`}><div className="mt-0.5 shrink-0">{getIcon(item.type, getItemStatus(item))}</div><div className="flex-1"><p className={`text-sm font-semibold mb-1 ${activeItemId===item.id ? 'text-gray-900' : 'text-gray-600'}`}>{item.title}</p></div></div>))}</div>)}
                            </div>
                        ))}</div>
                        {/* BUTTON TRIGGER REVIEW (MOBILE) */}
                        <div className="mt-6 mb-4">
                            <button
                                onClick={() => setShowReviewModal(true)}
                                className="w-full bg-[#FFC107] hover:bg-yellow-500 text-white font-bold py-3 rounded-xl shadow-sm flex items-center justify-center gap-2"
                            >
                                <i className="fa-regular fa-star"></i> Beri Review & Rating
                            </button>
                        </div>
                    </div>
                </div>

                {/* KOLOM KANAN (DAFTAR MODUL DESKTOP) */}
                <div className="hidden lg:flex w-[30%] flex-col sticky top-[80px] h-[calc(100vh-80px)] bg-white border-l border-gray-100">
                    <div className="p-6 border-b border-gray-100 bg-white z-10"><h3 className="font-bold text-lg text-gray-900">Daftar Modul</h3></div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24 custom-scrollbar">
                        {course.modules.map((mod, idx) => (
                            <div key={idx} className="mb-2">
                                <div className="flex justify-between items-center py-2 px-3 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors mb-1 group" onClick={()=>toggleModule(idx)}>
                                    <h4 className="font-bold text-sm text-gray-800 group-hover:text-green-600 transition-colors">{mod.title}</h4>
                                    <i className={`fa-solid fa-chevron-up text-xs text-gray-400 transition-transform duration-300 ${openModuleIndex===idx?'':'rotate-180'}`}></i>
                                </div>
                                {openModuleIndex===idx && (
                                    <div className="space-y-1 px-1">
                                        {mod.items.map(item => (
                                            <div key={item.id} onClick={()=>handleItemClick(item)} className={`flex gap-3 p-3 rounded-xl border transition-all cursor-pointer items-start ${activeItemId===item.id ? 'bg-[#F0FDF4] border-[#3ECF4C] shadow-sm' : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-100'}`}>
                                                <div className="mt-0.5 shrink-0">{getIcon(item.type, getItemStatus(item))}</div>
                                                <div className="flex-1"><p className={`text-sm font-semibold mb-1 leading-snug ${activeItemId===item.id ? 'text-gray-900' : 'text-gray-600'}`}>{item.title}</p></div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* BUTTON TRIGGER REVIEW (DESKTOP) */}
                    <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0 z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.03)]">
                        <button
                            onClick={() => setShowReviewModal(true)}
                            className="w-full bg-[#FFC107] hover:bg-yellow-500 text-white font-bold py-3 rounded-xl shadow-sm transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                        >
                            <i className="fa-regular fa-star"></i> Beri Review & Rating
                        </button>
                    </div>
                </div>
            </div>

            <StickyFooter {...footerConfig} />
        </div>
    );
};

export default ClassDetail;