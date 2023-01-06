import { RouteRecordRaw } from "vue-router";

const merchant: Array<RouteRecordRaw> = [
  {
    path: "/merchant/settle_in",
    name: "merchant_settle_in",
    meta: {
      title: "商家入驻",
    },
    component: () => import("@/pages/merchant/settleIn.vue"),
  },
  {
    path: "/merchant/status",
    name: "merchant_status",
    meta: {
      title: "商家入驻",
    },
    component: () => import("@/pages/merchant/status.vue"),
  },
];

export default merchant;
