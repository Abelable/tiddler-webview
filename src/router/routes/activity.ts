import { RouteRecordRaw } from "vue-router";

const team: Array<RouteRecordRaw> = [
  {
    path: "/activity/xiajiang",
    name: "activity_xiajiang",
    meta: {
      title: "下姜村",
    },
    component: () => import("@/pages/activities/xiajiang/index.vue"),
  },
];

export default team;
