import { RouteRecordRaw } from "vue-router";
import protocol from "./protocol";
import goods from "./goods";
import scenic from "./scenic";
import hotel from "./hotel";
import catering from "./catering";
import promoter from "./promoter";

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
  ...protocol,
  ...goods,
  ...scenic,
  ...hotel,
  ...catering,
  ...promoter,
];

export default routes;
