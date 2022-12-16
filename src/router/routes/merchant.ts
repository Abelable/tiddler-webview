import { RouteRecordRaw } from "vue-router";

const merchant: Array<RouteRecordRaw> = [
  {
    path: "/merchant/settle_in",
    name: "merchant_settle_in",
    meta: {
      title: "商家入驻",
    },
    component: () => import("@/pages/merchant/SettleIn.vue"),
  },
  {
    path: "/merchant/freight_template",
    name: "merchant_freight_template",
    meta: {
      title: "运费模板",
    },
    component: () => import("@/pages/merchant/FreightTemplates.vue"),
  },
];

export default merchant;
