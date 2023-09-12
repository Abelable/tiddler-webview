import { RouteRecordRaw } from "vue-router";

const restaurant: Array<RouteRecordRaw> = [
  {
    path: "/restaurant/agreements/provider_service",
    name: "restaurant_provider_service",
    meta: {
      title: "餐馆服务商服务协议",
    },
    component: () =>
      import("@/pages/restaurant-management/agreements/providerService.vue"),
  },
  {
    path: "/restaurant/provider/settle_in",
    name: "restaurant_provider_settle_in",
    meta: {
      title: "餐馆服务商入驻",
    },
    component: () =>
      import("@/pages/restaurant-management/provider/settleIn.vue"),
  },
  {
    path: "/restaurant/list",
    name: "restaurant_list",
    meta: {
      title: "餐馆列表",
    },
    component: () =>
      import("@/pages/restaurant-management/restaurant/list.vue"),
  },
  {
    path: "/restaurant/list",
    name: "room_list",
    meta: {
      title: "餐馆列表",
    },
    component: () =>
      import("@/pages/restaurant-management/restaurant/list.vue"),
  },
  {
    path: "/restaurant/create",
    name: "room_create",
    meta: {
      title: "新增餐馆",
    },
    component: () =>
      import("@/pages/restaurant-management/restaurant/create.vue"),
  },
  {
    path: "/restaurant/edit",
    name: "room_edit",
    meta: {
      title: "编辑餐馆",
    },
    component: () =>
      import("@/pages/restaurant-management/restaurant/edit.vue"),
  },
];

export default restaurant;
