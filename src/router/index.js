import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Reader from "@/views/Reader.vue";
import Book from "@/views/Book.vue";
import Publisher from "@/views/Publisher.vue";
import Staff from "@/views/Staff.vue";
import Track from "@/views/Track.vue";
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
                component: () => import("@/views/ReaderEdit.vue"),
                props: true,
            },
            {
                path: "add",
                name: "reader.add",
                component: () => import("@/views/ReaderAdd.vue"),
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
    },
    {
        path: "/track",
        name: "track",
        component: Track,
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