import { RouteRecordRaw } from "vue-router";

const supplier: Array<RouteRecordRaw> = [
  {
    path: "/supplier/settle_in",
    name: "supplier_settle_in",
    meta: {
      title: "商家入驻",
    },
    component: () => import("@/pages/supplier/SettleIn.vue"),
  },
];

export default supplier;
