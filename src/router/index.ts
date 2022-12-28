import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes/index";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  if (to.query.token) {
    localStorage.setItem("token", to.query.token as string);
  }
  next();
});

export default router;
