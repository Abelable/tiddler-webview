import { RouteRecordRaw } from "vue-router";

const catering: Array<RouteRecordRaw> = [
  {
    path: "/catering/agreements/provider_service",
    name: "catering_provider_service",
    meta: {
      title: "餐饮商家服务协议",
    },
    component: () => import("@/pages/catering/agreements/providerService.vue"),
  },
  {
    path: "/catering/provider/settle_in",
    name: "catering_provider_settle_in",
    meta: {
      title: "餐饮商家入驻",
    },
    component: () => import("@/pages/catering/provider/settleIn.vue"),
  },
  {
    path: "/catering/restaurant/list",
    name: "restaurant_list",
    meta: {
      title: "餐饮门店列表",
    },
    component: () => import("@/pages/catering/restaurant/list.vue"),
  },
  {
    path: "/catering/restaurant/create",
    name: "restaurant_create",
    meta: {
      title: "新增餐饮门店",
    },
    component: () => import("@/pages/catering/restaurant/create.vue"),
  },
  {
    path: "/catering/restaurant/edit",
    name: "restaurant_edit",
    meta: {
      title: "编辑餐饮门店",
    },
    component: () => import("@/pages/catering/restaurant/edit.vue"),
  },
];

export default catering;
