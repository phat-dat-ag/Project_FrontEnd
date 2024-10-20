import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Reader from "@/views/Reader.vue";
import Book from "@/views/Book.vue";
import Publisher from "@/views/Publisher.vue";
import Staff from "@/views/Staff.vue";
import Transaction from "@/views/Transaction.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/reader",
        name: "reader",
        component: Reader,
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
        path: "/book",
        name: "book",
        component: Book,
    },
    {
        path: "/publisher",
        name: "publisher",
        component: Publisher,
    },
    {
        path: "/staff",
        name: "staff",
        component: Staff,
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
        path: "/transaction",
        name: "transaction",
        component: Transaction,
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