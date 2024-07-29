import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import MenuView from "@/views/MenuView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/awakening",
        },
        {
            path: "/awakening",
            name: "/awakening",
            component: HomeView,
        },
        {
            path: "/end",
            name: "/end",
            component: MenuView,
        },
    ],
});

export default router;