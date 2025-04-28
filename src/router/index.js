import { createWebHistory, createRouter } from "vue-router";
import AdminHome from "@/views/AdminHome.vue";
import AdminReader from "@/views/AdminReader.vue";
import AdminBook from "@/views/AdminBook.vue";
import AdminPublisher from "@/views/AdminPublisher.vue";
import AdminStaff from "@/views/AdminStaff.vue";
import AdminTransaction from "@/views/AdminTransaction.vue";
import UserLogin from "@/views/UserLogin.vue";
import AdminLogin from "@/views/AdminLogin.vue";
import AdminUI from "@/views/AdminUI.vue";
import ReaderUI from "@/views/ReaderUI.vue";
import StaffUI from "@/views/StaffUI.vue";
import NotFound from "@/views/NotFound.vue";
import StaffTracking from "@/views/StaffTracking.vue"
import ReaderBorrowing from "@/views/ReaderBorrowing.vue";
import StaffAccount from "@/views/StaffAccount.vue";
import ReaderAccount from "@/views/ReaderAccount.vue";

const routes = [
    // User- Login
    {
        path: "/",
        name: "loginUser",
        component: UserLogin,
    },
    // User- Reader
    {
        path: "/user/reader",
        name: "interfaceReader",
        component: ReaderUI,
        // Hiển thị thêm trang chủ khi vừa truy cập
        redirect: { name: "readerHome" },
        children: [
            {
                path: "home",
                name: "readerHome",
                component: AdminHome,
            },
            {
                path: "borrowing",
                name: "borrowingBook",
                component: ReaderBorrowing,
            },
            {
                path: "account",
                name: "readerAccount",
                component: ReaderAccount,
            }

        ]
    },
    // User- Staff
    {
        path: "/user/staff",
        name: "interfaceStaff",
        component: StaffUI,
        // Hiển thị thêm trang chủ khi vừa truy cập
        redirect: { name: "staffHome" },
        children: [
            {
                path: "home",
                name: "staffHome",
                component: AdminHome,
            },
            {
                path: "tracking",
                name: "trackingBook",
                component: StaffTracking,
            },
            {
                path: "account",
                name: "staffAccount",
                component: StaffAccount,
            }
        ]
    },
    // Admin
    {
        path: "/loginAdmin",
        name: "loginAdmin",
        component: AdminLogin,
    },
    {
        path: "/admin",
        name: "interfaceAdmin",
        component: AdminUI,
        // Hiển thị thêm trang chủ khi vừa truy cập
        redirect: { name: "home" },
        children: [
            {
                path: "",
                name: "home",
                component: AdminHome,
            },
            {
                path: "reader",
                name: "reader",
                component: AdminReader,
            },
            {
                path: "book",
                name: "book",
                component: AdminBook,
            },
            {
                path: "publisher",
                name: "publisher",
                component: AdminPublisher,
            },
            {
                path: "staff",
                name: "staff",
                component: AdminStaff,
            },
            {
                path: "transaction",
                name: "transaction",
                component: AdminTransaction,
            },
            // Khi thêm dữ liệu
            {
                path: "add-entity",
                name: "entity.add",
                component: () => import("@/entities/AddEntity.vue"),
                props: true,
            },
            // Khi chỉnh dữ liệu
            {
                path: "edit-entity:id",
                name: "entity.edit",
                component: () => import("@/entities/EditEntity.vue"),
                props: true,
            },
        ]
    },

    // Đón các đường dẫn không tồn tại để thông báo
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: NotFound,
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;