import { ref } from "vue";
import { showToast } from "vant";
import { getRestaurantOptions } from "./api";

import type { Option } from "@/utils/type";
import type { TicketInfo } from "./type";

export const refundStatusOptions = [
  { text: "随时可退", value: 1 },
  { text: "有条件退", value: 2 },
  { text: "不可退", value: 3 },
];

export const restaurantOptions = ref<Option[]>([]);
export const setRestaurantOptions = async () =>
  (restaurantOptions.value = await getRestaurantOptions());

export const checkTicketInfo = (
  ticketInfo: TicketInfo | Omit<TicketInfo, "id">
) => {
  if (!ticketInfo.restaurantIds.length) {
    showToast("请选择关联门店");
    return false;
  }
  if (!ticketInfo.name) {
    showToast("请输入代金券名称");
    return false;
  }
  if (!ticketInfo.price) {
    showToast("请输入代金券价格");
    return false;
  }
  if (
    !ticketInfo.salesCommissionRate ||
    ticketInfo.salesCommissionRate < 10 ||
    ticketInfo.salesCommissionRate > 70
  ) {
    showToast("请输入范围为10%~70%的销售佣金比例");
    return false;
  }
  if (
    !ticketInfo.promotionCommissionRate ||
    ticketInfo.promotionCommissionRate < 2 ||
    ticketInfo.promotionCommissionRate > 70
  ) {
    showToast("请输入范围为2%~70%的推广佣金比例");
    return false;
  }
  return true;
};
