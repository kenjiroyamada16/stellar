import { createRouter, createWebHistory } from "vue-router";
import StoryView from "@/views/StoryView.vue";
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
      component: StoryView,
    },
    {
      path: "/end",
      name: "/end",
      component: MenuView,
    },
  ],
});

export default router;