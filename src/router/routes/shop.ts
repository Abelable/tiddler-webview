import { RouteRecordRaw } from "vue-router";

const shop: Array<RouteRecordRaw> = [
  {
    path: "shop/agreements/merchant_service",
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
    path: "/shop/goods_return_address/list",
    name: "goods_return_address_list",
    meta: {
      title: "退货地址列表",
    },
    component: () => import("@/pages/shop/goodsReturnAddress/list.vue"),
  },
  {
    path: "/shop/goods_return_address/create",
    name: "goods_return_address_create",
    meta: {
      title: "新增退货地址",
    },
    component: () => import("@/pages/shop/goodsReturnAddress/create.vue"),
  },
  {
    path: "/shop/goods_return_address/edit",
    name: "goods_return_address_edit",
    meta: {
      title: "编辑退货地址",
    },
    component: () => import("@/pages/shop/goodsReturnAddress/edit.vue"),
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
