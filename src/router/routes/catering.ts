import { RouteRecordRaw } from "vue-router";

const catering: Array<RouteRecordRaw> = [
  {
    path: "/catering/merchant/settle_in",
    name: "catering_merchant_settle_in",
    meta: {
      title: "餐饮商家入驻",
    },
    component: () => import("@/pages/catering/merchant/settleIn.vue"),
  },
  {
    path: "/catering/merchant/settle_status",
    name: "catering_merchant_settle_status",
    meta: {
      title: "餐饮商家入驻",
    },
    component: () => import("@/pages/catering/merchant/settleStatus.vue"),
  },
  {
    path: "/catering/shop/deposit",
    name: "catering_shop_deposit",
    meta: {
      title: "保证金记录",
    },
    component: () => import("@/pages/catering/shop/deposit/index.vue"),
  },
  {
    path: "/catering/shop/info",
    name: "catering_shop_info",
    meta: {
      title: "店铺信息",
    },
    component: () => import("@/pages/catering/shop/info/index.vue"),
  },
  {
    path: "/catering/shop/manager/list",
    name: "catering_shop_manager_list",
    meta: {
      title: "人员管理",
    },
    component: () => import("@/pages/catering/shop/manager/list.vue"),
  },
  {
    path: "/catering/shop/manager/create",
    name: "catering_manager_create",
    meta: {
      title: "新增人员",
    },
    component: () => import("@/pages/catering/shop/manager/create.vue"),
  },
  {
    path: "/catering/shop/manager/edit",
    name: "catering_shop_manager_edit",
    meta: {
      title: "编辑人员",
    },
    component: () => import("@/pages/catering/shop/manager/edit.vue"),
  },
  {
    path: "/catering/shop/restaurant/list",
    name: "restaurant_list",
    meta: {
      title: "餐厅列表",
    },
    component: () => import("@/pages/catering/shop/restaurant/list.vue"),
  },
  {
    path: "/catering/shop/restaurant/create",
    name: "restaurant_create",
    meta: {
      title: "新增餐厅",
    },
    component: () => import("@/pages/catering/shop/restaurant/create.vue"),
  },
  {
    path: "/catering/shop/restaurant/edit",
    name: "restaurant_edit",
    meta: {
      title: "编辑餐厅",
    },
    component: () => import("@/pages/catering/shop/restaurant/edit.vue"),
  },
  {
    path: "/catering/shop/meal_ticket/list",
    name: "meal_ticket_list",
    meta: {
      title: "餐饮代金券列表",
    },
    component: () => import("@/pages/catering/shop/meal-ticket/list.vue"),
  },
  {
    path: "/catering/shop/meal_ticket/create",
    name: "meal_ticket_create",
    meta: {
      title: "新增餐饮代金券",
    },
    component: () => import("@/pages/catering/shop/meal-ticket/create.vue"),
  },
  {
    path: "/catering/shop/meal_ticket/edit",
    name: "meal_ticket_edit",
    meta: {
      title: "编辑餐饮代金券",
    },
    component: () => import("@/pages/catering/shop/meal-ticket/edit.vue"),
  },
  {
    path: "/catering/shop/set_meal/list",
    name: "set_meal_list",
    meta: {
      title: "餐饮套餐列表",
    },
    component: () => import("@/pages/catering/shop/set-meal/list.vue"),
  },
  {
    path: "/catering/shop/set_meal/create",
    name: "set_meal_create",
    meta: {
      title: "新增餐饮套餐",
    },
    component: () => import("@/pages/catering/shop/set-meal/create.vue"),
  },
  {
    path: "/catering/shop/set_meal/edit",
    name: "set_meal_edit",
    meta: {
      title: "编辑餐饮套餐",
    },
    component: () => import("@/pages/catering/shop/set-meal/edit.vue"),
  },
];

export default catering;
