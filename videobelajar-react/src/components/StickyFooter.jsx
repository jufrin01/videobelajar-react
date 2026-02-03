import React from 'react';

const StickyFooter = ({
                          onPrev,
                          onNext,
                          prevTitle,
                          nextTitle,
                          prevDisabled = false,
                          nextDisabled = false,
                          middleContent,
                          customRightButton,
                          className = ""
                      }) => {
    // Mode "Title Only" (Misal saat Quiz berlangsung, tidak ada tombol nav)
    const isTitleOnly = !onPrev && !onNext && !customRightButton;

    return (
        <div className={`fixed bottom-0 w-full h-[60px] md:h-[70px] bg-[#3ECF4C] border-t border-[#3ECF4C] flex justify-between px-4 md:px-8 items-center shadow-[0_-5px_20px_rgba(0,0,0,0.15)] z-50 font-poppins ${className}`}>

            {/* --- KIRI: TOMBOL PREV --- */}
            <div className="flex-1 min-w-0 flex justify-start relative z-10">
                {onPrev ? (
                    <button
                        onClick={onPrev}
                        disabled={prevDisabled}
                        className="text-white font-bold flex items-center gap-2 px-2 py-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed group max-w-full text-left"
                    >
                        <i className="fa-solid fa-chevron-left text-lg shrink-0 group-hover:-translate-x-1 transition-transform"></i>
                        {prevTitle && (
                            <span className="truncate text-sm font-bold text-white max-w-[100px] sm:max-w-[150px] md:max-w-xs block leading-tight">
                                {prevTitle}
                            </span>
                        )}
                    </button>
                ) : <div className="w-8" />}
            </div>

            {/* --- TENGAH: JUDUL / KONTEN --- */}
            {/* PERBAIKAN DI SINI: */}
            {/* Jika 'isTitleOnly' (Quiz) -> Tampil (flex) */}
            {/* Jika Normal (Ada tombol Nav) -> Sembunyi di Mobile (hidden), Tampil di Desktop (md:flex) */}
            <div className={`${isTitleOnly ? 'flex' : 'hidden md:flex'} flex-col items-center justify-center w-full md:w-1/3 text-white text-center absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 pointer-events-none md:pointer-events-auto`}>
                {middleContent}
            </div>

            {/* --- KANAN: TOMBOL NEXT --- */}
            <div className="flex-1 min-w-0 flex justify-end relative z-10">
                {customRightButton ? (
                    customRightButton
                ) : (
                    onNext ? (
                        <button
                            onClick={onNext}
                            disabled={nextDisabled}
                            className="text-white font-bold flex items-center gap-2 px-2 py-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-right group max-w-full justify-end"
                        >
                            {nextTitle && (
                                <span className="truncate text-sm font-bold text-white max-w-[100px] sm:max-w-[150px] md:max-w-xs block leading-tight">
                                    {nextTitle}
                                </span>
                            )}
                            <i className="fa-solid fa-chevron-right text-lg shrink-0 group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    ) : null
                )}
            </div>
        </div>
    );
};

export default StickyFooter;