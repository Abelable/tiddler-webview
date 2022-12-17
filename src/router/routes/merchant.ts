import { RouteRecordRaw } from "vue-router";

const merchant: Array<RouteRecordRaw> = [
  {
    path: "/merchant/settle_in",
    name: "merchant_settle_in",
    meta: {
      title: "商家入驻",
    },
    component: () => import("@/pages/merchant/SettleIn.vue"),
  },
  {
    path: "/merchant/freight_template",
    name: "merchant_freight_template",
    meta: {
      title: "运费模板",
    },
    component: () => import("@/pages/merchant/FreightTemplates.vue"),
  },
  {
    path: "/merchant/create_freight_template",
    name: "merchant_create_freight_template",
    meta: {
      title: "新增运费模板",
    },
    component: () => import("@/pages/merchant/CreateFreightTemplate.vue"),
  },
  {
    path: "/merchant/edit_freight_template",
    name: "merchant_edit_freight_template",
    meta: {
      title: "编辑运费模板",
    },
    component: () => import("@/pages/merchant/EditFreightTemplate.vue"),
  },
];

export default merchant;
