import { RouteRecordRaw } from "vue-router";

const shop: Array<RouteRecordRaw> = [
  {
    path: "/shop/agreements/merchant_service",
    name: "shop_merchant_service",
    meta: {
      title: "商家服务协议",
    },
    component: () => import("@/pages/shop/agreements/merchantService.vue"),
  },
  {
    path: "/shop/merchant/settle_in",
    name: "shop_merchant_settle_in",
    meta: {
      title: "商家入驻",
    },
    component: () => import("@/pages/shop/merchant/settleIn.vue"),
  },
  {
    path: "/shop/deposit",
    name: "shop_deposit",
    meta: {
      title: "保证金记录",
    },
    component: () => import("@/pages/shop/deposit/index.vue"),
  },
  {
    path: "/shop/withdrawal_record",
    name: "shop_withdrawal_record",
    meta: {
      title: "收益提现记录",
    },
    component: () => import("@/pages/shop/withdrawal/record.vue"),
  },
  {
    path: "/shop/shop_info",
    name: "shop_info",
    meta: {
      title: "店铺信息",
    },
    component: () => import("@/pages/shop/shopInfo/index.vue"),
  },
  {
    path: "/shop/staff/list",
    name: "shop_staff_list",
    meta: {
      title: "人员管理",
    },
    component: () => import("@/pages/shop/staff/list.vue"),
  },
  {
    path: "/shop/staff/create",
    name: "shop_staff_create",
    meta: {
      title: "新增人员",
    },
    component: () => import("@/pages/shop/staff/create.vue"),
  },
  {
    path: "/shop/staff/edit",
    name: "shop_staff_edit",
    meta: {
      title: "编辑人员",
    },
    component: () => import("@/pages/shop/staff/edit.vue"),
  },
  {
    path: "/shop/freight_template/list",
    name: "freight_template_list",
    meta: {
      title: "运费模板",
    },
    component: () => import("@/pages/shop/freightTemplate/list.vue"),
  },
  {
    path: "/shop/freight_template/create",
    name: "freight_template_create",
    meta: {
      title: "新增运费模板",
    },
    component: () => import("@/pages/shop/freightTemplate/create.vue"),
  },
  {
    path: "/shop/freight_template/edit",
    name: "freight_template_edit",
    meta: {
      title: "编辑运费模板",
    },
    component: () => import("@/pages/shop/freightTemplate/edit.vue"),
  },
  {
    path: "/shop/refund_address/list",
    name: "shop_refund_address_list",
    meta: {
      title: "退货地址列表",
    },
    component: () => import("@/pages/shop/refundAddress/list.vue"),
  },
  {
    path: "/shop/refund_address/create",
    name: "shop_refund_address_create",
    meta: {
      title: "新增退货地址",
    },
    component: () => import("@/pages/shop/refundAddress/create.vue"),
  },
  {
    path: "/shop/refund_address/edit",
    name: "shop_refund_address_edit",
    meta: {
      title: "编辑退货地址",
    },
    component: () => import("@/pages/shop/refundAddress/edit.vue"),
  },
  {
    path: "/shop/pickup_address/list",
    name: "shop_pickup_address_list",
    meta: {
      title: "提货地址列表",
    },
    component: () => import("@/pages/shop/pickupAddress/list.vue"),
  },
  {
    path: "/shop/pickup_address/create",
    name: "shop_pickup_address_create",
    meta: {
      title: "新增提货地址",
    },
    component: () => import("@/pages/shop/pickupAddress/create.vue"),
  },
  {
    path: "/shop/pickup_address/edit",
    name: "shop_pickup_address_edit",
    meta: {
      title: "编辑提货地址",
    },
    component: () => import("@/pages/shop/pickupAddress/edit.vue"),
  },
  {
    path: "/shop/goods/list",
    name: "goods_list",
    meta: {
      title: "商品列表",
    },
    component: () => import("@/pages/shop/goods/list.vue"),
  },
  {
    path: "/shop/goods/create",
    name: "goods_create",
    meta: {
      title: "新增商品",
    },
    component: () => import("@/pages/shop/goods/create.vue"),
  },
  {
    path: "/shop/goods/edit",
    name: "goods_edit",
    meta: {
      title: "编辑商品",
    },
    component: () => import("@/pages/shop/goods/edit.vue"),
  },
];

export default shop;
