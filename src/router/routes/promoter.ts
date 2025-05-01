import { RouteRecordRaw } from "vue-router";

const agreements: Array<RouteRecordRaw> = [
  {
    path: "/promoter/performance",
    name: "promoter_performance",
    meta: {
      title: "升级数据",
    },
    component: () => import("@/pages/promoter/performance.vue"),
  },
  {
    path: "/promoter/certification",
    name: "promoter_certification",
    meta: {
      title: "升级认证",
    },
    component: () => import("@/pages/promoter/certification.vue"),
  },
];

export default agreements;
