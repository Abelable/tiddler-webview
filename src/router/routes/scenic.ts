import { RouteRecordRaw } from "vue-router";

const scenic: Array<RouteRecordRaw> = [
  {
    path: "/scenic/agreements/provider_service",
    name: "scenic_provider_service",
    meta: {
      title: "景区服务商服务协议",
    },
    component: () =>
      import("@/pages/scenic-management/agreements/providerService.vue"),
  },
  {
    path: "/scenic/provider/settle_in",
    name: "scenic_provider_settle_in",
    meta: {
      title: "景区服务商入驻",
    },
    component: () => import("@/pages/scenic-management/provider/settleIn.vue"),
  },
  {
    path: "/scenic/spot_list",
    name: "scenic_spot_list",
    meta: {
      title: "景点列表",
    },
    component: () => import("@/pages/scenic-management/scenicSpot/list.vue"),
  },
  {
    path: "/scenic/ticket/list",
    name: "ticket_list",
    meta: {
      title: "门票列表",
    },
    component: () => import("@/pages/scenic-management/ticket/list.vue"),
  },
  {
    path: "/scenic/ticket/create",
    name: "ticket_create",
    meta: {
      title: "新增门票",
    },
    component: () => import("@/pages/scenic-management/ticket/create.vue"),
  },
  {
    path: "/scenic/ticket/edit",
    name: "ticket_edit",
    meta: {
      title: "编辑门票",
    },
    component: () => import("@/pages/scenic-management/ticket/edit.vue"),
  },
];

export default scenic;
