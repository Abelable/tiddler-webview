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
    path: "/protocol/scenic_merchant",
    name: "scenic_merchant_protocol",
    meta: {
      title: "景区商家服务协议",
    },
    component: () => import("@/pages/protocol/scenicMerchantProtocol.vue"),
  },
  {
    path: "/protocol/hotel_merchant",
    name: "hotel_merchant_protocol",
    meta: {
      title: "酒店商家服务协议",
    },
    component: () => import("@/pages/protocol/hotelMerchantProtocol.vue"),
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
    path: "/protocol/withdraw",
    name: "withdraw_protocol",
    meta: {
      title: "提现规则",
    },
    component: () => import("@/pages/protocol/withdrawProtocol.vue"),
  },
];

export default protocol;
