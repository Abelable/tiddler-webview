import { RouteRecordRaw } from "vue-router";

const scenic: Array<RouteRecordRaw> = [
  {
    path: "/scenic/agreements/merchant_service",
    name: "scenic_merchant_service",
    meta: {
      title: "景区服务商服务协议",
    },
    component: () => import("@/pages/scenic/agreements/merchantService.vue"),
  },
  {
    path: "/scenic/merchant/settle_in",
    name: "scenic_merchant_settle_in",
    meta: {
      title: "景区服务商入驻",
    },
    component: () => import("@/pages/scenic/merchant/settleIn.vue"),
  },
];

export default scenic;
