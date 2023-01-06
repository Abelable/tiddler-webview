import { RouteRecordRaw } from "vue-router";

const agreements: Array<RouteRecordRaw> = [
  {
    path: "/agreements/merchant_service",
    name: "merchant_service",
    meta: {
      title: "商家服务协议",
    },
    component: () => import("@/pages/agreements/merchantService.vue"),
  },
  {
    path: "/agreements/user_service",
    name: "user_service",
    meta: {
      title: "用户服务协议",
    },
    component: () => import("@/pages/agreements/userService.vue"),
  },
];

export default agreements;
