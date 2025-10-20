import { RouteRecordRaw } from "vue-router";

const scenic: Array<RouteRecordRaw> = [
  {
    path: "/scenic/merchant/settle_in",
    name: "scenic_merchant_settle_in",
    meta: {
      title: "景区服务商入驻",
    },
    component: () => import("@/pages/scenic/merchant/settleIn.vue"),
  },
  {
    path: "/scenic/merchant/settle_status",
    name: "scenic_merchant_settle_status",
    meta: {
      title: "景区服务商入驻",
    },
    component: () => import("@/pages/scenic/merchant/settleStatus.vue"),
  },
  {
    path: "/scenic/shop/deposit",
    name: "scenic_shop_deposit",
    meta: {
      title: "保证金记录",
    },
    component: () => import("@/pages/scenic/shop/deposit/index.vue"),
  },
  {
    path: "/scenic/shop/info",
    name: "scenic_shop_info",
    meta: {
      title: "店铺信息",
    },
    component: () => import("@/pages/scenic/shop/info/index.vue"),
  },
  {
    path: "/scenic/shop/manager/list",
    name: "scenic_shop_manager_list",
    meta: {
      title: "人员管理",
    },
    component: () => import("@/pages/scenic/shop/manager/list.vue"),
  },
  {
    path: "/scenic/shop/manager/create",
    name: "scenic_manager_create",
    meta: {
      title: "新增人员",
    },
    component: () => import("@/pages/scenic/shop/manager/create.vue"),
  },
  {
    path: "/scenic/shop/manager/edit",
    name: "scenic_shop_manager_edit",
    meta: {
      title: "编辑人员",
    },
    component: () => import("@/pages/scenic/shop/manager/edit.vue"),
  },
  {
    path: "/scenic/shop/scenic/list",
    name: "scenic_shop_scenic_list",
    meta: {
      title: "景点列表",
    },
    component: () => import("@/pages/scenic/shop/scenic/list.vue"),
  },
  {
    path: "/scenic/shop/scenic/create",
    name: "scenic_shop_scenic_create",
    meta: {
      title: "新增景点",
    },
    component: () => import("@/pages/scenic/shop/scenic/create.vue"),
  },
  {
    path: "/scenic/shop/scenic/edit",
    name: "scenic_shop_scenic_edit",
    meta: {
      title: "编辑景点",
    },
    component: () => import("@/pages/scenic/shop/scenic/edit.vue"),
  },
  {
    path: "/scenic/shop/ticket/list",
    name: "scenic_shop_ticket_list",
    meta: {
      title: "门票列表",
    },
    component: () => import("@/pages/scenic/shop/ticket/list.vue"),
  },
  {
    path: "/scenic/shop/ticket/create",
    name: "scenic_shop_ticket_create",
    meta: {
      title: "新增门票",
    },
    component: () => import("@/pages/scenic/shop/ticket/create.vue"),
  },
  {
    path: "/scenic/shop/ticket/edit",
    name: "scenic_shop_ticket_edit",
    meta: {
      title: "编辑门票",
    },
    component: () => import("@/pages/scenic/shop/ticket/edit.vue"),
  },
];

export default scenic;
