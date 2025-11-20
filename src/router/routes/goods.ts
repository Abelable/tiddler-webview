import { RouteRecordRaw } from "vue-router";

const goods: Array<RouteRecordRaw> = [
  {
    path: "/goods/merchant/settle_in",
    name: "merchant_settle_in",
    meta: {
      title: "电商商家入驻",
    },
    component: () => import("@/pages/goods/merchant/settleIn.vue"),
  },
  {
    path: "/goods/merchant/settle_status",
    name: "merchant_settle_status",
    meta: {
      title: "电商商家入驻",
    },
    component: () => import("@/pages/goods/merchant/settleStatus.vue"),
  },
  {
    path: "/goods/shop/deposit",
    name: "shop_deposit",
    meta: {
      title: "保证金记录",
    },
    component: () => import("@/pages/goods/shop/deposit/index.vue"),
  },
  {
    path: "/goods/shop/info",
    name: "shop_info",
    meta: {
      title: "店铺信息",
    },
    component: () => import("@/pages/goods/shop/info/index.vue"),
  },
  {
    path: "/goods/shop/manager/list",
    name: "shop_manager_list",
    meta: {
      title: "人员管理",
    },
    component: () => import("@/pages/goods/shop/manager/list.vue"),
  },
  {
    path: "/goods/shop/manager/create",
    name: "shop_manager_create",
    meta: {
      title: "新增人员",
    },
    component: () => import("@/pages/goods/shop/manager/create.vue"),
  },
  {
    path: "/goods/shop/manager/edit",
    name: "shop_manager_edit",
    meta: {
      title: "编辑人员",
    },
    component: () => import("@/pages/goods/shop/manager/edit.vue"),
  },
  {
    path: "/goods/shop/freight_template/list",
    name: "shop_freight_template_list",
    meta: {
      title: "运费模板",
    },
    component: () => import("@/pages/goods/shop/freightTemplate/list.vue"),
  },
  {
    path: "/goods/shop/freight_template/create",
    name: "shop_freight_template_create",
    meta: {
      title: "新增运费模板",
    },
    component: () => import("@/pages/goods/shop/freightTemplate/create.vue"),
  },
  {
    path: "/goods/shop/freight_template/edit",
    name: "shop_freight_template_edit",
    meta: {
      title: "编辑运费模板",
    },
    component: () => import("@/pages/goods/shop/freightTemplate/edit.vue"),
  },
  {
    path: "/goods/shop/refund_address/list",
    name: "shop_refund_address_list",
    meta: {
      title: "退货地址列表",
    },
    component: () => import("@/pages/goods/shop/refundAddress/list.vue"),
  },
  {
    path: "/goods/shop/refund_address/create",
    name: "shop_refund_address_create",
    meta: {
      title: "新增退货地址",
    },
    component: () => import("@/pages/goods/shop/refundAddress/create.vue"),
  },
  {
    path: "/goods/shop/refund_address/edit",
    name: "shop_refund_address_edit",
    meta: {
      title: "编辑退货地址",
    },
    component: () => import("@/pages/goods/shop/refundAddress/edit.vue"),
  },
  {
    path: "/goods/shop/pickup_address/list",
    name: "shop_pickup_address_list",
    meta: {
      title: "提货地点列表",
    },
    component: () => import("@/pages/goods/shop/pickupAddress/list.vue"),
  },
  {
    path: "/goods/shop/pickup_address/create",
    name: "shop_pickup_address_create",
    meta: {
      title: "新增提货地点",
    },
    component: () => import("@/pages/goods/shop/pickupAddress/create.vue"),
  },
  {
    path: "/goods/shop/pickup_address/edit",
    name: "shop_pickup_address_edit",
    meta: {
      title: "编辑提货地点",
    },
    component: () => import("@/pages/goods/shop/pickupAddress/edit.vue"),
  },
  {
    path: "/goods/shop/goods/list",
    name: "shop_goods_list",
    meta: {
      title: "商品列表",
    },
    component: () => import("@/pages/goods/shop/goods/list.vue"),
  },
  {
    path: "/goods/shop/goods/create",
    name: "shop_goods_create",
    meta: {
      title: "新增商品",
    },
    component: () => import("@/pages/goods/shop/goods/create.vue"),
  },
  {
    path: "/goods/shop/goods/edit",
    name: "shop_goods_edit",
    meta: {
      title: "编辑商品",
    },
    component: () => import("@/pages/goods/shop/goods/edit.vue"),
  },
  {
    path: "/goods/shop/order_ship",
    name: "shop_order_ship",
    meta: {
      title: "订单发货",
    },
    component: () => import("@/pages/goods/shop/orderShip/index.vue"),
  },
];

export default goods;
