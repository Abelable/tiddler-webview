import { RouteRecordRaw } from "vue-router";

const common: Array<RouteRecordRaw> = [
  {
    path: "/agreement/merchant_service",
    name: "merchant_service_agreement",
    meta: {
      title: "商家服务协议",
    },
    component: () => import("@/pages/common/agreements/MerchantService.vue"),
  },
];

export default common;
