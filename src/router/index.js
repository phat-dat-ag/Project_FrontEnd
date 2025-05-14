import { createWebHistory, createRouter } from "vue-router";
import AdminHome from "@/views/admin/AdminHome.vue";
import UserLogin from "@/views/login/UserLogin.vue";
import AdminLogin from "@/views/login/AdminLogin.vue";
import AdminUI from "@/views/admin/AdminUI.vue";
import ReaderUI from "@/views/reader/ReaderUI.vue";
import StaffUI from "@/views/staff/StaffUI.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
    // Sign up: Dùng chung cho admin, reader, staff
    {
        path: "/reader/signup",
        name: "reader.signup",
        component: () => import("@/views/signup/ReaderSignUp.vue"),
    },
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
                component: () => import("@/components/TransactionTracking.vue"),
            },
            {
                path: "account",
                name: "readerAccount",
                component: () => import("@/components/MyAccount.vue"),
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
                component: () => import("@/components/TransactionTracking.vue"),
            },
            {
                path: "account",
                name: "staffAccount",
                component: () => import("@/components/MyAccount.vue"),
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
                children: [
                    {
                        path: "add",
                        name: "reader.add",
                        component: () => import("@/components/entities/AddEntity.vue"),
                        props: true,
                    },
                    {
                        path: "edit/:id",
                        name: "reader.edit",
                        component: () => import("@/components/entities/EditEntity.vue"),
                        props: true,
                    },
                ]
            },
            {
                path: "book",
                name: "book",
                component: () => import("@/components/PageAdmin.vue"),
                children: [
                    {
                        path: "add",
                        name: "book.add",
                        component: () => import("@/components/entities/AddEntity.vue"),
                        props: true,
                    },
                    {
                        path: "edit/:id",
                        name: "book.edit",
                        component: () => import("@/components/entities/EditEntity.vue"),
                        props: true,
                    },
                ]
            },
            {
                path: "publisher",
                name: "publisher",
                component: () => import("@/components/PageAdmin.vue"),
                children: [
                    {
                        path: "add",
                        name: "publisher.add",
                        component: () => import("@/components/entities/AddEntity.vue"),
                        props: true,
                    },
                    {
                        path: "edit/:id",
                        name: "publisher.edit",
                        component: () => import("@/components/entities/EditEntity.vue"),
                        props: true,
                    },
                ]
            },
            {
                path: "staff",
                name: "staff",
                component: () => import("@/components/PageAdmin.vue"),
                children: [
                    {
                        path: "add",
                        name: "staff.add",
                        component: () => import("@/components/entities/AddEntity.vue"),
                        props: true,
                    },
                    {
                        path: "edit/:id",
                        name: "staff.edit",
                        component: () => import("@/components/entities/EditEntity.vue"),
                        props: true,
                    },
                ]
            },
            {
                path: "transaction",
                name: "transaction",
                component: () => import("@/components/PageAdmin.vue"),
                children: [
                    {
                        path: "add",
                        name: "transaction.add",
                        component: () => import("@/components/entities/AddEntity.vue"),
                        props: true,
                    },
                    {
                        path: "edit/:id",
                        name: "transaction.edit",
                        component: () => import("@/components/entities/EditEntity.vue"),
                        props: true,
                    },
                ]
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