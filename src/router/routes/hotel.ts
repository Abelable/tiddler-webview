import { RouteRecordRaw } from "vue-router";

const hotel: Array<RouteRecordRaw> = [
  {
    path: "/hotel/agreements/provider_service",
    name: "hotel_provider_service",
    meta: {
      title: "酒店服务商服务协议",
    },
    component: () =>
      import("@/pages/hotel-management/agreements/providerService.vue"),
  },
  {
    path: "/hotel/provider/settle_in",
    name: "hotel_provider_settle_in",
    meta: {
      title: "酒店服务商入驻",
    },
    component: () => import("@/pages/hotel-management/provider/settleIn.vue"),
  },
  {
    path: "/hotel/list",
    name: "hotel_list",
    meta: {
      title: "酒店列表",
    },
    component: () => import("@/pages/hotel-management/hotel/list.vue"),
  },
  {
    path: "/hotel/room/list",
    name: "room_list",
    meta: {
      title: "房间列表",
    },
    component: () => import("@/pages/hotel-management/room/list.vue"),
  },
  {
    path: "/hotel/room/create",
    name: "room_create",
    meta: {
      title: "新增房间",
    },
    component: () => import("@/pages/hotel-management/room/create.vue"),
  },
  {
    path: "/hotel/room/edit",
    name: "room_edit",
    meta: {
      title: "编辑房间",
    },
    component: () => import("@/pages/hotel-management/room/edit.vue"),
  },
];

export default hotel;
