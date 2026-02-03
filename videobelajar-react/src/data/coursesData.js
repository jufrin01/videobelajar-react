export const coursesData = [
    {
        id: 1,
        title: "Foundations of User Experience Design",
        category: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600",
        progress: 25,
        totalModules: 12,
        completedModules: 3,
        instructor: {
            name: "Jenna Ortega",
            role: "Senior Product Designer",
            avatar: "https://ui-avatars.com/api/?name=Jenna+Ortega&background=random"
        },
        rating: 4.8,
        reviews: 86,
        description: "Pelajari dasar-dasar UX Design langsung dari kurikulum standar industri.",
        userReviews: [
            { id: 101, name: "Andi Saputra", role: "Mahasiswa", rating: 5, comment: "Videonya sangat jelas!", avatar: "https://ui-avatars.com/api/?name=Andi+S&background=random" }
        ],
        modules: [
            {
                title: "Introduction to UX Design",
                items: [
                    { id: 101, type: "video", title: "Intro to User Experience Design", time: "5 Menit", status: "completed", videoId: "2QQQtiFwXjU" },
                    { id: 102, type: "doc", title: "Rangkuman: Apa itu UX?", time: "10 Menit", status: "active" },
                    { id: 103, type: "video", title: "Basics of UX Design", time: "15 Menit", status: "locked", videoId: "S95qfA7qKCA" }
                ]
            },
            {
                title: "Understanding the User",
                items: [
                    { id: 104, type: "video", title: "User Research Basics", time: "12 Menit", status: "locked", videoId: "bixR-KIJKYM" },
                    {
                        id: 105,
                        type: "quiz",
                        title: "Quiz: User Research",
                        time: "5 Pertanyaan",
                        status: "locked",
                        questions: [
                            {
                                id: 1,
                                question: "Memikirkan dan mengantisipasi secara teliti adanya user secara tidak sengaja mengutak-atik konfigurasi, namun dapat diatasi dengan membuat default yang mengurangi kepanikan pada user adalah pengertian dari ...",
                                options: ["Memikirkan tentang default", "Layout tujuan", "Sistem berjalan", "Konsistensi UI"],
                                correctAnswer: 0
                            },
                            {
                                id: 2,
                                question: "Manakah yang BUKAN prinsip dasar UX Design?",
                                options: ["Usability", "Desirability", "Complexity", "Accessibility"],
                                correctAnswer: 2
                            },
                            {
                                id: 3,
                                question: "Tahapan pertama dalam Design Thinking adalah...",
                                options: ["Define", "Ideate", "Empathize", "Prototype"],
                                correctAnswer: 2
                            },
                            {
                                id: 4,
                                question: "Metode riset untuk memahami perilaku user secara kualitatif adalah...",
                                options: ["A/B Testing", "In-depth Interview", "Survey Online", "Analytics"],
                                correctAnswer: 1
                            },
                            {
                                id: 5,
                                question: "Apa tujuan utama dari Wireframe?",
                                options: ["Menentukan warna", "Membuat struktur layout", "Coding frontend", "Testing database"],
                                correctAnswer: 1
                            }
                        ]
                    },
                ]
            }
        ]
    },
    {
        id: 2,
        title: "React Modern Mastery 2024",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600",
        progress: 0,
        totalModules: 15,
        completedModules: 0,
        instructor: {
            name: "Alex Johnson",
            role: "Fullstack Developer",
            avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=random"
        },
        rating: 4.9,
        reviews: 120,
        description: "Kuasai React Hooks, Context API, hingga Next.js dalam satu kursus.",
        userReviews: [],
        modules: [
            {
                title: "Getting Started with React",
                items: [
                    { id: 201, type: "video", title: "Why React?", time: "8 Menit", status: "active", videoId: "Ke90Tje7VS0" }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Data Science with Python",
        category: "Data Science",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
        progress: 50,
        totalModules: 10,
        completedModules: 5,
        instructor: {
            name: "Sarah Lim",
            role: "Data Scientist at Meta",
            avatar: "https://ui-avatars.com/api/?name=Sarah+Lim&background=random"
        },
        rating: 4.7,
        reviews: 45,
        description: "Analisis data besar dan buat prediksi akurat menggunakan Python.",
        userReviews: [],
        modules: []
    },
    {
        id: 4,
        title: "Advanced Digital Marketing Strategy",
        category: "Marketing",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
        progress: 10,
        totalModules: 8,
        completedModules: 1,
        instructor: {
            name: "Michael Chen",
            role: "Marketing Director",
            avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=random"
        },
        rating: 4.6,
        reviews: 32,
        description: "Optimalkan SEO, SEM, dan Social Media Ads untuk bisnis Anda.",
        userReviews: [],
        modules: []
    },
    {
        id: 5,
        title: "Mobile App Dev with Flutter",
        category: "Mobile Development",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600",
        progress: 0,
        totalModules: 20,
        completedModules: 0,
        instructor: {
            name: "Budi Setiawan",
            role: "Mobile Engineer",
            avatar: "https://ui-avatars.com/api/?name=Budi+Setiawan&background=random"
        },
        rating: 4.9,
        reviews: 210,
        description: "Bangun aplikasi iOS dan Android dengan satu codebase.",
        userReviews: [],
        modules: []
    },
    {
        id: 6,
        title: "Graphic Design Masterclass",
        category: "Design",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600",
        progress: 80,
        totalModules: 10,
        completedModules: 8,
        instructor: {
            name: "Jessica Walsh",
            role: "Art Director",
            avatar: "https://ui-avatars.com/api/?name=Jessica+Walsh&background=random"
        },
        rating: 4.8,
        reviews: 95,
        description: "Dari Adobe Photoshop hingga Illustrator, pelajari semuanya.",
        userReviews: [],
        modules: []
    },
    {
        id: 7,
        title: "Cyber Security Fundamentals",
        category: "IT Security",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
        progress: 0,
        totalModules: 14,
        completedModules: 0,
        instructor: {
            name: "Kevin Mitnick",
            role: "Security Analyst",
            avatar: "https://ui-avatars.com/api/?name=Kevin+Mitnick&background=random"
        },
        rating: 4.9,
        reviews: 150,
        description: "Lindungi data dan jaringan dari serangan siber.",
        userReviews: [],
        modules: []
    },
    {
        id: 8,
        title: "Machine Learning A-Z",
        category: "Data Science",
        image: "https://images.unsplash.com/photo-1527477321055-cb9720ddb484?auto=format&fit=crop&q=80&w=600",
        progress: 5,
        totalModules: 25,
        completedModules: 1,
        instructor: {
            name: "Andrew Ng",
            role: "AI Researcher",
            avatar: "https://ui-avatars.com/api/?name=Andrew+Ng&background=random"
        },
        rating: 5.0,
        reviews: 500,
        description: "Belajar algoritma ML paling populer di industri.",
        userReviews: [],
        modules: []
    },
    {
        id: 9,
        title: "Business Communication Skills",
        category: "Business",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600",
        progress: 100,
        totalModules: 5,
        completedModules: 5,
        instructor: {
            name: "Dale Carnegie",
            role: "Communication Coach",
            avatar: "https://ui-avatars.com/api/?name=Dale+Carnegie&background=random"
        },
        rating: 4.5,
        reviews: 40,
        description: "Cara berkomunikasi profesional di lingkungan kerja.",
        userReviews: [],
        modules: []
    },
    {
        id: 10,
        title: "Photography for Beginners",
        category: "Photography",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600",
        progress: 15,
        totalModules: 12,
        completedModules: 2,
        instructor: {
            name: "Annie Leibovitz",
            role: "Professional Photographer",
            avatar: "https://ui-avatars.com/api/?name=Annie+Leibovitz&background=random"
        },
        rating: 4.7,
        reviews: 78,
        description: "Kuasai teknik kamera DSLR dan Mirrorless Anda.",
        userReviews: [],
        modules: []
    },
    {
        id: 11,
        title: "Node.js Backend Development",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1502942735232-173e7c731460?auto=format&fit=crop&q=80&w=600",
        progress: 0,
        totalModules: 18,
        completedModules: 0,
        instructor: {
            name: "Ryan Dahl",
            role: "Backend Engineer",
            avatar: "https://ui-avatars.com/api/?name=Ryan+Dahl&background=random"
        },
        rating: 4.8,
        reviews: 92,
        description: "Membangun API yang scalable dengan Express dan MongoDB.",
        userReviews: [],
        modules: []
    },
    {
        id: 12,
        title: "Copywriting for High Conversion",
        category: "Marketing",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600",
        progress: 40,
        totalModules: 6,
        completedModules: 2,
        instructor: {
            name: "David Ogilvy",
            role: "Copywriter Specialist",
            avatar: "https://ui-avatars.com/api/?name=David+Ogilvy&background=random"
        },
        rating: 4.6,
        reviews: 55,
        description: "Tulis kata-kata yang menjual dan meningkatkan omzet.",
        userReviews: [],
        modules: []
    },
    {
        id: 13,
        title: "Financial Planning 101",
        category: "Finance",
        image: "https://images.unsplash.com/photo-1454165833767-02a698d33147?auto=format&fit=crop&q=80&w=600",
        progress: 0,
        totalModules: 10,
        completedModules: 0,
        instructor: {
            name: "Raditya Dika",
            role: "Investor & Content Creator",
            avatar: "https://ui-avatars.com/api/?name=Raditya+Dika&background=random"
        },
        rating: 4.9,
        reviews: 340,
        description: "Atur keuangan pribadi untuk masa depan yang lebih baik.",
        userReviews: [],
        modules: []
    },
    {
        id: 14,
        title: "Introduction to Psychology",
        category: "Self Development",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
        progress: 20,
        totalModules: 15,
        completedModules: 3,
        instructor: {
            name: "Jordan Peterson",
            role: "Clinical Psychologist",
            avatar: "https://ui-avatars.com/api/?name=Jordan+Peterson&background=random"
        },
        rating: 4.7,
        reviews: 110,
        description: "Memahami perilaku manusia dan proses mental.",
        userReviews: [],
        modules: []
    },
    {
        id: 15,
        title: "Blockchain & Crypto 101",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=600",
        progress: 0,
        totalModules: 9,
        completedModules: 0,
        instructor: {
            name: "Vitalik Buterin",
            role: "Blockchain Developer",
            avatar: "https://ui-avatars.com/api/?name=Vitalik+Buterin&background=random"
        },
        rating: 4.8,
        reviews: 88,
        description: "Memahami cara kerja Web3 dan Smart Contracts.",
        userReviews: [],
        modules: []
    },
    {
        id: 16,
        title: "Public Speaking Excellence",
        category: "Soft Skills",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=600",
        progress: 60,
        totalModules: 10,
        completedModules: 6,
        instructor: {
            name: "Merry Riana",
            role: "Motivational Speaker",
            avatar: "https://ui-avatars.com/api/?name=Merry+Riana&background=random"
        },
        rating: 4.9,
        reviews: 215,
        description: "Tampil percaya diri di depan umum.",
        userReviews: [],
        modules: []
    },
    {
        id: 17,
        title: "Game Dev with Unity 3D",
        category: "Game Development",
        image: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?auto=format&fit=crop&q=80&w=600",
        progress: 0,
        totalModules: 22,
        completedModules: 0,
        instructor: {
            name: "Brackeys",
            role: "Game Developer",
            avatar: "https://ui-avatars.com/api/?name=Brackeys&background=random"
        },
        rating: 5.0,
        reviews: 420,
        description: "Buat game impian Anda dari nol.",
        userReviews: [],
        modules: []
    },
    {
        id: 18,
        title: "Excel for Business Analytics",
        category: "Office Productivity",
        image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=600",
        progress: 30,
        totalModules: 8,
        completedModules: 2,
        instructor: {
            name: "Bill Gates",
            role: "Tech Visionary",
            avatar: "https://ui-avatars.com/api/?name=Bill+Gates&background=random"
        },
        rating: 4.6,
        reviews: 130,
        description: "Kuasai Pivot Tables, VLOOKUP, hingga Macro.",
        userReviews: [],
        modules: []
    },
    {
        id: 19,
        title: "English for Professionals",
        category: "Language",
        image: "https://images.unsplash.com/photo-1520970314890-1f9eb74b64e1?auto=format&fit=crop&q=80&w=600",
        progress: 0,
        totalModules: 12,
        completedModules: 0,
        instructor: {
            name: "Lucy Bella",
            role: "Language Coach",
            avatar: "https://ui-avatars.com/api/?name=Lucy+Bella&background=random"
        },
        rating: 4.7,
        reviews: 64,
        description: "Tingkatkan kemampuan bahasa Inggris untuk karier global.",
        userReviews: [],
        modules: []
    },
    {
        id: 20,
        title: "Product Management Foundations",
        category: "Product",
        image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=600",
        progress: 0,
        totalModules: 10,
        completedModules: 0,
        instructor: {
            name: "Marty Cagan",
            role: "Author of Inspired",
            avatar: "https://ui-avatars.com/api/?name=Marty+Cagan&background=random"
        },
        rating: 4.9,
        reviews: 180,
        description: "Pelajari cara membangun produk yang dicintai pengguna.",
        userReviews: [],
        modules: []
    }
];

export const bankData = {
    BCA: {
        id: "BCA",
        name: "BCA",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg",
        vaCode: "11739",
        themeColor: "text-blue-600",
        instructions: {
            atm: [
                "Masukkan kartu ATM dan PIN BCA Anda",
                "Di menu utama, pilih \"Transaksi Lainnya\". Pilih \"Transfer\". Pilih \"Ke BCA Virtual Account\"",
                "Masukkan nomor Virtual Account",
                "Pastikan data Virtual Account Anda benar, kemudian masukkan angka yang perlu Anda bayarkan, kemudian pilih \"Benar\"",
                "Cek dan perhatikan konfirmasi pembayaran dari layar ATM, jika sudah benar pilih \"Ya\"",
                "Transaksi selesai"
            ],
            mobile: [
                "Buka Aplikasi BCA Mobile",
                "Pilih \"m-BCA\", kemudian pilih \"m-Transfer\"",
                "Pilih \"BCA Virtual Account\"",
                "Masukkan nomor Virtual Account, lalu pilih \"OK\"",
                "Klik tombol \"Send\", lalu Masukkan PIN Anda",
                "Transaksi selesai"
            ],
            internet: [
                "Login ke KlikBCA Individual",
                "Pilih \"Transfer\", kemudian pilih \"Transfer ke BCA Virtual Account\"",
                "Masukkan nomor Virtual Account",
                "Pilih \"Lanjutkan\" dan masukkan respon KeyBCA",
                "Pembayaran selesai"
            ]
        }
    },
    BNI: {
        id: "BNI",
        name: "BNI",
        logo: "https://upload.wikimedia.org/wikipedia/id/5/55/BNI_logo.svg",
        vaCode: "8808",
        themeColor: "text-orange-600",
        instructions: {
            atm: ["Masukkan kartu ATM BNI & PIN", "Pilih Menu Lain > Transfer > Virtual Account Billing", "Masukkan nomor VA", "Konfirmasi pembayaran", "Selesai"],
            mobile: ["Buka BNI Mobile Banking", "Pilih menu Transfer > Virtual Account Billing", "Masukkan nomor VA", "Masukkan Password Transaksi", "Selesai"],
            internet: ["Login BNI Internet Banking", "Pilih Transaksi > Virtual Account Billing", "Masukkan nomor VA", "Lanjutkan proses otorisasi"]
        }
    },
    BRI: {
        id: "BRI",
        name: "BRI",
        logo: "https://upload.wikimedia.org/wikipedia/commons/6/68/BANK_BRI_logo.svg",
        vaCode: "12345",
        themeColor: "text-blue-800",
        instructions: {
            atm: ["Masukkan kartu ATM BRI & PIN", "Pilih Transaksi Lain > Pembayaran > Lainnya > BRIVA", "Masukkan nomor VA", "Konfirmasi, pilih YA", "Selesai"],
            mobile: ["Buka aplikasi BRImo", "Pilih menu Pembayaran > BRIVA", "Masukkan nomor VA", "Masukkan PIN BRImo", "Selesai"],
            internet: ["Login IB BRI", "Pilih Pembayaran > BRIVA", "Masukkan Kode Bayar", "Masukkan Password & m-Token", "Kirim"]
        }
    },
    Mandiri: {
        id: "Mandiri",
        name: "Mandiri",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg",
        vaCode: "89898",
        themeColor: "text-blue-900",
        instructions: {
            atm: ["Masukkan kartu ATM Mandiri & PIN", "Pilih Bayar/Beli > Lainnya > Multi Payment", "Masukkan Kode Perusahaan lalu Nomor VA", "Konfirmasi", "Selesai"],
            mobile: ["Buka Livin' by Mandiri", "Pilih menu Bayar > Cari Penyedia Jasa > Masukkan No VA", "Lanjut Bayar dan masukkan PIN", "Selesai"],
            internet: ["Login Mandiri Online", "Pilih menu Bayar > Multi Payment", "Pilih Penyedia Jasa dan masukkan Nomor VA", "Lanjutkan"]
        }
    },
    Dana: {
        id: "Dana",
        name: "Dana",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg",
        vaCode: "3901",
        themeColor: "text-blue-500",
        instructions: {
            mobile: ["Buka aplikasi Dana", "Pilih Kirim ke Bank", "Pilih Bank Permata (sebagai perantara)", "Masukkan No VA", "Konfirmasi"]
        }
    }
};

export const getCourseWithModules = (id) => {
    const course = coursesData.find(c => c.id === parseInt(id));
    if (course && course.modules.length === 0) {
        // Inject dummy modules jika kosong
        return {
            ...course,
            modules: [
                {
                    title: "Module 1: Getting Started",
                    items: [
                        { id: 901, type: "video", title: "Introduction", time: "5 Menit", status: "active" },
                        { id: 902, type: "doc", title: "Course Syllabus", time: "10 Menit", status: "locked" }
                    ]
                }
            ]
        };
    }
    return course;
};
