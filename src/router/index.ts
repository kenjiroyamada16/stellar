import { createRouter, createWebHistory } from "vue-router";
import MenuView from "@/views/MenuView.vue";
import MemoriesView from "@/views/MemoriesView.vue";
import StoryView from "@/views/StoryView.vue";
import { useCodeStore } from "@/store/code";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/awakening',
    },
    {
      path: '/awakening/:initialStoryLineId?',
      name: '/awakening',
      component: StoryView,
      props: true,
    },
    {
      path: '/end',
      name: '/end',
      component: MenuView,
    },
    {
      path: '/memories',
      name: '/memories',
      component: MemoriesView,
      meta: { requiresCode: true }
    }
  ],
});

router.beforeEach((to, from, next) => {
  const codeStore = useCodeStore();

  codeStore.fetchSavedCode();

  if (to.meta.requiresCode && !codeStore.hasCode) {
    return next({ name: '/awakening' });
  } else {
    next();
  }
});

export default router;