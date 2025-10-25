import { RouteRecordRaw } from "vue-router";

const hotel: Array<RouteRecordRaw> = [
  {
    path: "/hotel/merchant/settle_in",
    name: "hotel_merchant_settle_in",
    meta: {
      title: "酒店服务商入驻",
    },
    component: () => import("@/pages/hotel/merchant/settleIn.vue"),
  },
  {
    path: "/hotel/merchant/settle_status",
    name: "hotel_merchant_settle_status",
    meta: {
      title: "酒店服务商入驻",
    },
    component: () => import("@/pages/hotel/merchant/settleStatus.vue"),
  },
  {
    path: "/hotel/shop/deposit",
    name: "hotel_shop_deposit",
    meta: {
      title: "保证金记录",
    },
    component: () => import("@/pages/hotel/shop/deposit/index.vue"),
  },
  {
    path: "/hotel/shop/info",
    name: "hotel_shop_info",
    meta: {
      title: "店铺信息",
    },
    component: () => import("@/pages/hotel/shop/info/index.vue"),
  },
  {
    path: "/hotel/shop/manager/list",
    name: "hotel_shop_manager_list",
    meta: {
      title: "人员管理",
    },
    component: () => import("@/pages/hotel/shop/manager/list.vue"),
  },
  {
    path: "/hotel/shop/manager/create",
    name: "hotel_manager_create",
    meta: {
      title: "新增人员",
    },
    component: () => import("@/pages/hotel/shop/manager/create.vue"),
  },
  {
    path: "/hotel/shop/manager/edit",
    name: "hotel_shop_manager_edit",
    meta: {
      title: "编辑人员",
    },
    component: () => import("@/pages/hotel/shop/manager/edit.vue"),
  },
  {
    path: "/hotel/shop/hotel/list",
    name: "hotel_list",
    meta: {
      title: "酒店列表",
    },
    component: () => import("@/pages/hotel/shop/hotel/list.vue"),
  },
  {
    path: "/hotel/shop/hotel/create",
    name: "hotel_create",
    meta: {
      title: "新增酒店",
    },
    component: () => import("@/pages/hotel/shop/hotel/create.vue"),
  },
  {
    path: "/hotel/shop/hotel/edit",
    name: "hotel_edit",
    meta: {
      title: "编辑酒店",
    },
    component: () => import("@/pages/hotel/shop/hotel/edit.vue"),
  },
  {
    path: "/hotel/shop/room/list",
    name: "hotel_room_list",
    meta: {
      title: "房间列表",
    },
    component: () => import("@/pages/hotel/shop/room/list.vue"),
  },
  {
    path: "/hotel/shop/room/create",
    name: "hotel_room_create",
    meta: {
      title: "新增房间",
    },
    component: () => import("@/pages/hotel/shop/room/create.vue"),
  },
  {
    path: "/hotel/shop/room/edit",
    name: "hotel_room_edit",
    meta: {
      title: "编辑房间",
    },
    component: () => import("@/pages/hotel/shop/room/edit.vue"),
  },
  {
    path: "/hotel/shop/room_type/list",
    name: "hotel_room_type_list",
    meta: {
      title: "房间类型列表",
    },
    component: () => import("@/pages/hotel/shop/roomType/list.vue"),
  },
  {
    path: "/hotel/shop/room_type/create",
    name: "hotel_room_type_create",
    meta: {
      title: "新增房间类型",
    },
    component: () => import("@/pages/hotel/shop/roomType/create.vue"),
  },
  {
    path: "/hotel/shop/room_type/edit",
    name: "hotel_room_type_edit",
    meta: {
      title: "编辑房间类型",
    },
    component: () => import("@/pages/hotel/shop/roomType/edit.vue"),
  },
];

export default hotel;
