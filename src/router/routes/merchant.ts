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
];

export default merchant;
