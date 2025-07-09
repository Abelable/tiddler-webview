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
    path: "/scenic/shop/deposit",
    name: "scenic_shop_deposit",
    meta: {
      title: "保证金记录",
    },
    component: () => import("@/pages/scenic/shop/deposit/index.vue"),
  },
  {
    path: "/scenic/shop/withdrawal_record",
    name: "scenic_shop_withdrawal_record",
    meta: {
      title: "收益提现记录",
    },
    component: () => import("@/pages/scenic/shop/withdrawal/record.vue"),
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
    path: "/scenic/shop/spot/list",
    name: "scenic_shop_spot_list",
    meta: {
      title: "景点列表",
    },
    component: () => import("@/pages/scenic/shop/spot/list.vue"),
  },
  {
    path: "/scenic/shop/spot/create",
    name: "scenic_shop_spot_create",
    meta: {
      title: "新增景点",
    },
    component: () => import("@/pages/scenic/shop/spot/create.vue"),
  },
  {
    path: "/scenic/shop/spot/edit",
    name: "scenic_shop_spot_edit",
    meta: {
      title: "编辑景点",
    },
    component: () => import("@/pages/scenic/shop/spot/edit.vue"),
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
