import { RouteRecordRaw } from "vue-router";

const agreements: Array<RouteRecordRaw> = [
  {
    path: "/agreements/user_service",
    name: "user_service",
    meta: {
      title: "用户服务协议",
    },
    component: () => import("@/pages/agreements/userService.vue"),
  },
  {
    path: "/agreements/withdraw_rules",
    name: "withdraw_rules",
    meta: {
      title: "提现规则",
    },
    component: () => import("@/pages/agreements/withdrawRules.vue"),
  },
];

export default agreements;
