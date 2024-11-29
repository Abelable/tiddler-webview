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
    path: "/gift_goods",
    name: "gift_goods",
    meta: {
      title: "家乡推广",
    },
    component: () => import("@/pages/gift-goods/index.vue"),
  },
  ...agreements,
  ...shop,
  ...scenic,
  ...hotel,
  ...catering,
];

export default routes;
