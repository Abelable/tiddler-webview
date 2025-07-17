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
    path: "/catering/restaurant/list",
    name: "restaurant_list",
    meta: {
      title: "餐饮门店列表",
    },
    component: () => import("@/pages/catering/shop/restaurant/list.vue"),
  },
  {
    path: "/catering/restaurant/create",
    name: "restaurant_create",
    meta: {
      title: "新增餐饮门店",
    },
    component: () => import("@/pages/catering/shop/restaurant/create.vue"),
  },
  {
    path: "/catering/restaurant/edit",
    name: "restaurant_edit",
    meta: {
      title: "编辑餐饮门店",
    },
    component: () => import("@/pages/catering/shop/restaurant/edit.vue"),
  },
  {
    path: "/catering/meal_ticket/list",
    name: "meal_ticket_list",
    meta: {
      title: "餐饮代金券列表",
    },
    component: () => import("@/pages/catering/shop/meal-ticket/list.vue"),
  },
  {
    path: "/catering/meal_ticket/create",
    name: "meal_ticket_create",
    meta: {
      title: "新增餐饮代金券",
    },
    component: () => import("@/pages/catering/shop/meal-ticket/create.vue"),
  },
  {
    path: "/catering/meal_ticket/edit",
    name: "meal_ticket_edit",
    meta: {
      title: "编辑餐饮代金券",
    },
    component: () => import("@/pages/catering/shop/meal-ticket/edit.vue"),
  },
  {
    path: "/catering/set_meal/list",
    name: "set_meal_list",
    meta: {
      title: "餐饮套餐列表",
    },
    component: () => import("@/pages/catering/shop/set-meal/list.vue"),
  },
  {
    path: "/catering/set_meal/create",
    name: "set_meal_create",
    meta: {
      title: "新增餐饮套餐",
    },
    component: () => import("@/pages/catering/shop/set-meal/create.vue"),
  },
  {
    path: "/catering/set_meal/edit",
    name: "set_meal_edit",
    meta: {
      title: "编辑餐饮套餐",
    },
    component: () => import("@/pages/catering/shop/set-meal/edit.vue"),
  },
];

export default catering;
