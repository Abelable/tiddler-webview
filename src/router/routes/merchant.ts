import { RouteRecordRaw } from "vue-router";

const merchant: Array<RouteRecordRaw> = [
  {
    path: "/merchant/settle_in",
    name: "merchant_settle_in",
    meta: {
      title: "入驻申请",
    },
    component: () => import("@/pages/merchant/SettleIn.vue"),
  },
  {
    path: "/merchant/settle_in_status",
    name: "merchant_settle_in_status",
    meta: {
      title: "入驻申请",
    },
    component: () => import("@/pages/merchant/SettleInStatus.vue"),
  },
];

export default merchant;
