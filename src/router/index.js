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
                children: [
                    {
                        path: "edit:id",
                        name: "reader.edit",
                        component: () => import("@/components/Reader/ReaderEdit.vue"),
                        props: true,
                    },
                    {
                        path: "add",
                        name: "reader.add",
                        component: () => import("@/components/Reader/ReaderAdd.vue"),
                        props: true,
                    }
                ]
            },
            {
                path: "book",
                name: "book",
                component: AdminBook,
                children: [
                    {
                        path: "edit:id",
                        name: "book.edit",
                        component: () => import("@/components/Book/BookEdit.vue"),
                        props: true,
                    },
                    {
                        path: "add",
                        name: "book.add",
                        component: () => import("@/components/Book/BookAdd.vue"),
                        props: true,
                    }

                ]
            },
            {
                path: "publisher",
                name: "publisher",
                component: AdminPublisher,
                children: [
                    {
                        path: "publisher:id",
                        name: "publisher.edit",
                        component: () => import("@/components/Publisher/PublisherEdit.vue"),
                        props: true,
                    },
                    {
                        path: "add",
                        name: "publisher.add",
                        component: () => import("@/components/Publisher/PublisherAdd.vue"),
                        props: true,
                    }
                ]
            },
            {
                path: "staff",
                name: "staff",
                component: AdminStaff,
                children: [
                    {
                        path: "staff:id",
                        name: "staff.edit",
                        component: () => import("@/components/Staff/StaffEdit.vue"),
                        props: true,
                    },
                    {
                        path: "add",
                        name: "staff.add",
                        component: () => import("@/components/Staff/StaffAdd.vue"),
                        props: true,
                    }
                ]
            },
            {
                path: "transaction",
                name: "transaction",
                component: AdminTransaction,
                children: [
                    {
                        path: "edit:id",
                        name: "transaction.edit",
                        component: () => import("@/components/Transaction/TransactionEdit.vue"),
                        props: true,
                    },
                    {
                        path: "add",
                        name: "transaction.add",
                        component: () => import("@/components/Transaction/TransactionAdd.vue"),
                        props: true,
                    }

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