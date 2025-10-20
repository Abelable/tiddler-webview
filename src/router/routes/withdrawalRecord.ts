import { RouteRecordRaw } from "vue-router";

const withdrawalRecord: Array<RouteRecordRaw> = [
  {
    path: "/withdrawal_record/commission",
    name: "commission_withdrawal_record",
    meta: {
      title: "佣金提现明细",
    },
    component: () => import("@/pages/withdrawalRecord/commission.vue"),
  },
  {
    path: "/withdrawal_record/income",
    name: "income_withdrawal_record",
    meta: {
      title: "收益提现明细",
    },
    component: () => import("@/pages/withdrawalRecord/income.vue"),
  },
  {
    path: "/withdrawal_record/reward",
    name: "reward_withdrawal_record",
    meta: {
      title: "奖励提现明细",
    },
    component: () => import("@/pages/withdrawalRecord/reward.vue"),
  },
];

export default withdrawalRecord;
