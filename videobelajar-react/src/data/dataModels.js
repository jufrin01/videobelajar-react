export const CATEGORIES = {
    TEKNOLOGI: "Teknologi",
    BISNIS: "Bisnis",
    DESAIN: "Desain",
    PEMASARAN: "Pemasaran",
    PENGEMBANGAN_DIRI: "Pengembangan Diri",
    SOFT_SKILLS: "Soft Skills"
};

export const COURSE_STATUS = {
    ACTIVE: "active",
    DRAFT: "draft",
    ARCHIVED: "archived"
};

export const ORDER_STATUS = {
    PENDING: "Pending",
    PAID: "Paid",
    FAILED: "Failed",
    CANCELLED: "Cancelled"
};

export const InstructorModel = {
    name: "",
    role: "Senior Tutor",
    avatar: "",
    bio: ""
};

export const ModuleItemModel = {
    id: 0,
    type: "video",
    title: "",
    time: "0 Menit",
    url: "",
    isFree: false
};


export const ModuleModel = {
    title: "",
    items: []
};


export const CourseModel = {
    id: null,
    title: "",
    category: CATEGORIES.TEKNOLOGI,
    image: "",          // URL Thumbnail
    price: 0,
    discountPrice: 0,   // Opsional
    rating: 0,
    reviews: 0,
    description: "",
    instructor: { ...InstructorModel }, // Nested Object
    modules: [],        // Array of ModuleModel
    studentsCount: 0,
    createdAt: new Date().toISOString()
};


export const UserModel = {
    id: null,
    fullName: "",
    email: "",
    password: "",
    role: "student",
    avatar: "",
    myCourses: []
};


export const OrderModel = {
    id: null,
    userId: null,
    courseId: null,
    amount: 0,
    paymentMethod: "",
    status: ORDER_STATUS.PENDING,
    date: new Date().toISOString()
};