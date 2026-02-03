import { coursesData } from './coursesData';

// Helper untuk mengambil data kursus berdasarkan ID
const getCourse = (id) => {
    return coursesData.find(c => c.id === id);
};

export const ordersData = [
    {
        id: "ORD-20231001-001",
        courseId: 1, // ID Course dari coursesData (Foundations of UX)
        invoice: "INV/X/2023/1001",
        date: "10 Oktober 2023, 14:30 WIB",
        status: "Berhasil", // User sudah beli -> Arahkan ke Belajar
        totalPaid: 300000,
        courseDetails: getCourse(1)
    },
    {
        id: "ORD-20231005-002",
        courseId: 2, // ID Course (Data Science)
        invoice: "INV/X/2023/1005",
        date: "12 Oktober 2023, 09:15 WIB",
        status: "Menunggu Pembayaran", // Belum bayar -> Arahkan ke Payment
        totalPaid: 307000, // + Admin Fee
        courseDetails: getCourse(2)
    },
    {
        id: "ORD-20231008-003",
        courseId: 3, // ID Course (Digital Marketing)
        invoice: "INV/X/2023/1008",
        date: "15 Oktober 2023, 19:45 WIB",
        status: "Gagal", // Gagal -> Arahkan ke Checkout ulang
        totalPaid: 307000,
        courseDetails: getCourse(3)
    },
    {
        id: "ORD-20231010-004",
        courseId: 10, // ID Course (Next.js)
        invoice: "INV/X/2023/1010",
        date: "20 Oktober 2023, 08:00 WIB",
        status: "Berhasil",
        totalPaid: 300000,
        courseDetails: getCourse(10)
    },{
        id: "ORD-20231012-005",
        courseId: 5,
        invoice: "INV/X/2023/1012",
        date: "22 Oktober 2023, 10:20 WIB",
        status: "Berhasil",
        totalPaid: 250000,
        courseDetails: getCourse(5)
    },
    {
        id: "ORD-20231015-006",
        courseId: 12,
        invoice: "INV/X/2023/1015",
        date: "25 Oktober 2023, 13:45 WIB",
        status: "Berhasil",
        totalPaid: 200000,
        courseDetails: getCourse(12)
    },
    {
        id: "ORD-20231018-007",
        courseId: 20,
        invoice: "INV/X/2023/1018",
        date: "28 Oktober 2023, 16:00 WIB",
        status: "Menunggu Pembayaran",
        totalPaid: 357000,
        courseDetails: getCourse(20)
    },
    {
        id: "ORD-20231102-008",
        courseId: 9,
        invoice: "INV/XI/2023/1102",
        date: "02 November 2023, 11:30 WIB",
        status: "Berhasil",
        totalPaid: 150000,
        courseDetails: getCourse(9)
    },
    {
        id: "ORD-20231105-009",
        courseId: 15,
        invoice: "INV/XI/2023/1105",
        date: "05 November 2023, 20:10 WIB",
        status: "Gagal",
        totalPaid: 457000,
        courseDetails: getCourse(15)
    },
    {
        id: "ORD-20231110-010",
        courseId: 25,
        invoice: "INV/XI/2023/1110",
        date: "10 November 2023, 09:00 WIB",
        status: "Berhasil",
        totalPaid: 300000,
        courseDetails: getCourse(25)
    },
    {
        id: "ORD-20231115-011",
        courseId: 18,
        invoice: "INV/XI/2023/1115",
        date: "15 November 2023, 14:25 WIB",
        status: "Menunggu Pembayaran",
        totalPaid: 287000,
        courseDetails: getCourse(18)
    },
    {
        id: "ORD-20231120-012",
        courseId: 6,
        invoice: "INV/XI/2023/1120",
        date: "20 November 2023, 18:50 WIB",
        status: "Berhasil",
        totalPaid: 400000,
        courseDetails: getCourse(6)
    },
    {
        id: "ORD-20231125-013",
        courseId: 23,
        invoice: "INV/XI/2023/1125",
        date: "25 November 2023, 07:15 WIB",
        status: "Gagal",
        totalPaid: 157000,
        courseDetails: getCourse(23)
    },
    {
        id: "ORD-20231201-014",
        courseId: 4,
        invoice: "INV/XII/2023/1201",
        date: "01 Desember 2023, 12:00 WIB",
        status: "Berhasil",
        totalPaid: 350000,
        courseDetails: getCourse(4)
    }
];
