import { createWebHistory, createRouter } from "vue-router";
import AdminHome from "@/views/admin/AdminHome.vue";
import UserLogin from "@/views/login/UserLogin.vue";
import AdminLogin from "@/views/login/AdminLogin.vue";
import AdminUI from "@/views/admin/AdminUI.vue";
import ReaderUI from "@/views/reader/ReaderUI.vue";
import StaffUI from "@/views/staff/StaffUI.vue";
import NotFound from "@/views/NotFound.vue";
import StaffTracking from "@/views/staff/StaffTracking.vue"
import ReaderBorrowing from "@/views/reader/ReaderBorrowing.vue";
import StaffAccount from "@/views/staff/StaffAccount.vue";
import ReaderAccount from "@/views/reader/ReaderAccount.vue";

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
                component: () => import("@/components/PageAdmin.vue"),
            },
            {
                path: "book",
                name: "book",
                component: () => import("@/components/PageAdmin.vue"),
            },
            {
                path: "publisher",
                name: "publisher",
                component: () => import("@/components/PageAdmin.vue"),
            },
            {
                path: "staff",
                name: "staff",
                component: () => import("@/components/PageAdmin.vue"),
            },
            {
                path: "transaction",
                name: "transaction",
                component: () => import("@/components/PageAdmin.vue"),
            },
            // Khi thêm dữ liệu
            {
                path: "add-entity",
                name: "entity.add",
                component: () => import("@/components/entities/AddEntity.vue"),
                props: true,
            },
            // Khi chỉnh dữ liệu
            {
                path: "edit-entity:id",
                name: "entity.edit",
                component: () => import("@/components/entities/EditEntity.vue"),
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