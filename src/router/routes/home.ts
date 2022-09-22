import { RouteRecordRaw } from "vue-router";

const home: Array<RouteRecordRaw> = [
  {
    path: "/mall",
    name: "mall",
    component: () => import("@/pages/home/subpages/mall/index.vue"),
  },
];

export default home;
