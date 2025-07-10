import { ref } from "vue";
import { showToast } from "vant";
import { getScenicOptions, getTicketCategoryOptions } from "./api";

import type { ApiOption } from "@/utils/type";
import type { FormTicketInfo, TicketCategoryOption } from "./type";

export const typeOptions = [
  { text: "单景点门票", value: 1 },
  { text: "多景点联票", value: 2 },
];
export const refundStatusOptions = [
  { text: "随时可退", value: 1 },
  { text: "有条件退", value: 2 },
  { text: "不可退", value: 3 },
];

export const initialTicketInfo = {
  type: undefined,
  scenicIds: [],
  name: "",
  briefName: "",
  price: undefined,
  marketPrice: undefined,
  salesCommissionRate: undefined,
  specList: [],
  feeIncludeTips: "",
  feeNotIncludeTips: "",
  bookingTime: "",
  effectiveTime: undefined,
  validityTime: undefined,
  limitNumber: undefined,
  refundStatus: undefined,
  refundTips: "",
  needExchange: false,
  exchangeTips: "",
  exchangeTime: "",
  exchangeLocation: "",
  enterTime: "",
  enterLocation: "",
  invoiceTips: "",
  reminderTips: "",
};

export const scenicOptions = ref<ApiOption[]>([]);
export const categoryOptions = ref<TicketCategoryOption[]>([]);

export const setCategoryOptions = async () => {
  const options = await getTicketCategoryOptions();
  categoryOptions.value = options.map((item) => ({
    ...item,
    disabled: false,
  }));
};
export const setScenicOptions = async (shopId: number) =>
  (scenicOptions.value = await getScenicOptions(shopId));

export const checkTicketInfo = (ticketInfo: FormTicketInfo) => {
  if (!ticketInfo.type) {
    showToast("请选择门票类型");
    return false;
  }
  if (!ticketInfo.scenicIds.length) {
    showToast("请选择关联景点");
    return false;
  }
  if (!ticketInfo.name) {
    showToast("请输入门票名称");
    return false;
  }
  if (!ticketInfo.briefName) {
    showToast("请输入门票简称");
    return false;
  }
  if (!ticketInfo.price) {
    showToast("请输入门票起始价格");
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
  if (
    !ticketInfo.specList.length ||
    ticketInfo.specList.findIndex((item) => !item.priceList.length) !== -1
  ) {
    showToast("请完善门票规格信息");
    return false;
  }
  let incompletePriceItemIndex = -1;
  ticketInfo.specList.forEach((item) => {
    incompletePriceItemIndex = item.priceList.findIndex(
      (_item) => !_item.startDate || !_item.endDate || !_item.price
    );
  });
  if (incompletePriceItemIndex !== -1) {
    showToast("部分门票规格未选择日期范围或未填写价格");
    return false;
  }
  if (!ticketInfo.bookingTime) {
    showToast("请选择当前预定最晚时间");
    return false;
  }
  if (!ticketInfo.refundStatus) {
    showToast("请选择退票条件");
    return false;
  }
  return true;
};
