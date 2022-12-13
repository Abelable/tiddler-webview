import { RouteRecordRaw } from "vue-router";

const common: Array<RouteRecordRaw> = [
  {
    path: "/agreement/merchant_agreement",
    name: "merchant_agreement",
    meta: {
      title: "商家服务协议",
    },
    component: () => import("@/pages/common/agreements/MerchantAgreement.vue"),
  },
];

export default common;
