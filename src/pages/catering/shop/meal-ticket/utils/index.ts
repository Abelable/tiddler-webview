import { showToast } from "vant";

import { ref } from "vue";
import { getShopRestaurantOptions } from "../../restaurant/utils/api";

import type { ApiOption } from "@/utils/type";
import type { FormTicketInfo } from "./type";

export const validityTypeOptions = [
  { text: "购买后有效天数", value: 1 },
  { text: "范围有效期", value: 2 },
];

export const initialTicketInfo = {
  restaurantIds: [],
  price: undefined,
  originalPrice: undefined,
  salesCommissionRate: undefined,
  validityDays: undefined,
  validityStartTime: "",
  validityEndTime: "",
  buyLimit: undefined,
  perTableUsageLimit: undefined,
  overlayUsageLimit: undefined,
  useTimeList: [],
  inapplicableProducts: [],
  boxAvailable: false,
  needPreBook: false,
  useRules: [
    "本单发票由商家提供，详情请咨询商家",
    "仅限堂食",
    "团购用户不可同时享受商家其他优惠",
    "酒水饮料等问题，请致电商家咨询，以商家反馈为准",
    "使用优惠券购买团单，有效期以优惠券规则为准",
  ],
};

export const restaurantOptions = ref<ApiOption[]>([]);
export const setRestaurantOptions = async (shopId: number) =>
  (restaurantOptions.value = await getShopRestaurantOptions(shopId));

export const checkTicketInfo = (ticketInfo: FormTicketInfo) => {
  if (!ticketInfo.restaurantIds.length) {
    showToast("请选择关联门店");
    return false;
  }
  if (!ticketInfo.price) {
    showToast("请输入代金券价格");
    return false;
  }
  if (!ticketInfo.originalPrice) {
    showToast("请输入抵扣价格");
    return false;
  }
  if (
    !ticketInfo.salesCommissionRate ||
    ticketInfo.salesCommissionRate < 10 ||
    ticketInfo.salesCommissionRate > 70
  ) {
    showToast("请输入范围为10%~70%的佣金比例");
    return false;
  }
  if (!ticketInfo.validityDays && !ticketInfo.validityStartTime) {
    showToast("请设置有效期");
    return false;
  }
  if (ticketInfo.useTimeList.length) {
    const incompleteOpenTimeIndex = ticketInfo.useTimeList.findIndex(
      (item) =>
        !item.startWeekDay || !item.endWeekDay || !item.timeFrameList.length
    );
    if (incompleteOpenTimeIndex !== -1) {
      showToast("请完善使用时间必填项");
      return false;
    }
  }
  return true;
};
