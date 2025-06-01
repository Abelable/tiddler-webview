import { RouteRecordRaw } from "vue-router";

const agreements: Array<RouteRecordRaw> = [
  {
    path: "/promoter/performance",
    name: "promoter_performance",
    meta: {
      title: "我的荣誉值",
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
  {
    path: "/promoter/withdraw_record",
    name: "promoter_withdraw_record",
    meta: {
      title: "提现明细",
    },
    component: () => import("@/pages/promoter/withdrawRecord.vue"),
  },
];

export default agreements;
