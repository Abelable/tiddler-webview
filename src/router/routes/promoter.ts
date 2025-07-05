import { RouteRecordRaw } from "vue-router";

const agreements: Array<RouteRecordRaw> = [
  {
    path: "/promoter/achievement",
    name: "promoter_achievement",
    meta: {
      title: "我的荣誉值",
    },
    component: () => import("@/pages/promoter/achievement.vue"),
  },
  {
    path: "/promoter/withdrawal_record",
    name: "promoter_withdrawal_record",
    meta: {
      title: "提现明细",
    },
    component: () => import("@/pages/promoter/withdrawalRecord.vue"),
  },
];

export default agreements;
