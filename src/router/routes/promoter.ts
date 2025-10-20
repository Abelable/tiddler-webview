import { RouteRecordRaw } from "vue-router";

const promoter: Array<RouteRecordRaw> = [
  {
    path: "/promoter/achievement",
    name: "promoter_achievement",
    meta: {
      title: "我的荣誉值",
    },
    component: () => import("@/pages/promoter/achievement.vue"),
  },
];

export default promoter;
