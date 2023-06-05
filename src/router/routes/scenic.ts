import { RouteRecordRaw } from "vue-router";

const scenic: Array<RouteRecordRaw> = [
  {
    path: "/scenic/agreements/provider_service",
    name: "scenic_provider_service",
    meta: {
      title: "景区服务商服务协议",
    },
    component: () => import("@/pages/scenic/agreements/providerService.vue"),
  },
  {
    path: "/scenic/provider/settle_in",
    name: "scenic_provider_settle_in",
    meta: {
      title: "景区服务商入驻",
    },
    component: () => import("@/pages/scenic/provider/settleIn.vue"),
  },
];

export default scenic;
