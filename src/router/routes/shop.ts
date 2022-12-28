import { RouteRecordRaw } from "vue-router";

const shop: Array<RouteRecordRaw> = [
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
    path: "/shop/upload_goods",
    name: "upload_goods",
    meta: {
      title: "上传商品",
    },
    component: () => import("@/pages/shop/uploadGoods.vue"),
  },
];

export default shop;
