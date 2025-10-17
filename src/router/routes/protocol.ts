import { RouteRecordRaw } from "vue-router";

const protocol: Array<RouteRecordRaw> = [
  {
    path: "/protocol/user",
    name: "user_protocol",
    meta: {
      title: "用户服务协议",
    },
    component: () => import("@/pages/protocol/userProtocol.vue"),
  },
  {
    path: "/protocol/user_auth",
    name: "user_auth_protocol",
    meta: {
      title: "个人信息授权声明",
    },
    component: () => import("@/pages/protocol/userAuthProtocol.vue"),
  },
  {
    path: "/protocol/scenic_merchant",
    name: "scenic_merchant_protocol",
    meta: {
      title: "景区服务商服务协议",
    },
    component: () => import("@/pages/protocol/scenicMerchantProtocol.vue"),
  },
  {
    path: "/protocol/scenic_deposit",
    name: "scenic_deposit_protocol",
    meta: {
      title: "景区服务商保证金协议",
    },
    component: () => import("@/pages/protocol/scenicDepositProtocol.vue"),
  },
  {
    path: "/protocol/hotel_merchant",
    name: "hotel_merchant_protocol",
    meta: {
      title: "酒店服务商服务协议",
    },
    component: () => import("@/pages/protocol/hotelMerchantProtocol.vue"),
  },
  {
    path: "/protocol/hotel_deposit",
    name: "hotel_deposit_protocol",
    meta: {
      title: "酒店服务商保证金协议",
    },
    component: () => import("@/pages/protocol/hotelDepositProtocol.vue"),
  },
  {
    path: "/protocol/hotel_order",
    name: "hotel_order_protocol",
    meta: {
      title: "酒店预订条款",
    },
    component: () => import("@/pages/protocol/hotelOrderProtocol.vue"),
  },
  {
    path: "/protocol/catering_merchant",
    name: "catering_merchant_protocol",
    meta: {
      title: "餐饮商家服务协议",
    },
    component: () => import("@/pages/protocol/cateringMerchantProtocol.vue"),
  },
  {
    path: "/protocol/catering_deposit",
    name: "catering_deposit_protocol",
    meta: {
      title: "餐饮商家保证金协议",
    },
    component: () => import("@/pages/protocol/cateringDepositProtocol.vue"),
  },
  {
    path: "/protocol/merchant",
    name: "merchant_protocol",
    meta: {
      title: "电商商家服务协议",
    },
    component: () => import("@/pages/protocol/merchantProtocol.vue"),
  },
  {
    path: "/protocol/deposit",
    name: "deposit_protocol",
    meta: {
      title: "电商商家保证金协议",
    },
    component: () => import("@/pages/protocol/depositProtocol.vue"),
  },
  {
    path: "/protocol/withdraw",
    name: "withdraw_protocol",
    meta: {
      title: "提现规则",
    },
    component: () => import("@/pages/protocol/withdrawProtocol.vue"),
  },
];

export default protocol;
