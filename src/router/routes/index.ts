import { RouteRecordRaw } from "vue-router";
import agreements from "./agreements";
import shop from "./shop";
import scenic from "./scenic";
import hotel from "./hotel";
import catering from "./catering";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/auth",
    name: "auth",
    meta: {
      title: "实名认证",
    },
    component: () => import("@/pages/auth/index.vue"),
  },
  {
    path: "/promoter",
    name: "promoter",
    meta: {
      title: "家乡推广",
    },
    component: () => import("@/pages/promoter/index.vue"),
  },
  ...agreements,
  ...shop,
  ...scenic,
  ...hotel,
  ...catering,
];

export default routes;
