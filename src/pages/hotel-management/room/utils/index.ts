import { ref } from "vue";
import { showToast } from "vant";
import { getHotelOptions, getRoomTypeOptions } from "./api";

import type { ApiOption } from "@/utils/type";
import type { FormRoomInfo } from "./type";

export const hotelOptions = ref<ApiOption[]>([]);
export const typeOptions = ref<ApiOption[]>([]);

export const initialRoomInfo = {
  hotelId: undefined,
  typeId: undefined,
  price: undefined,
  salesCommissionRate: undefined,
  promotionCommissionRate: undefined,
  priceList: [],
  breakfastNum: 0,
  guestNum: undefined,
  cancellable: true,
};

export const setTypeOptions = async (hotelId: number) => {
  typeOptions.value = await getRoomTypeOptions(hotelId);
};
export const setHotelOptions = async () =>
  (hotelOptions.value = await getHotelOptions());

export const checkRoomInfo = (roomInfo: FormRoomInfo) => {
  if (!roomInfo.hotelId) {
    showToast("请选择关联酒店");
    return false;
  }
  if (!roomInfo.typeId) {
    showToast("请选择房间类型");
    return false;
  }
  if (!roomInfo.price) {
    showToast("请输入房间起始价格");
    return false;
  }
  if (
    !roomInfo.salesCommissionRate ||
    roomInfo.salesCommissionRate < 10 ||
    roomInfo.salesCommissionRate > 70
  ) {
    showToast("请输入范围为10%~70%的销售佣金比例");
    return false;
  }
  if (
    !roomInfo.promotionCommissionRate ||
    roomInfo.promotionCommissionRate < 2 ||
    roomInfo.promotionCommissionRate > 70
  ) {
    showToast("请输入范围为2%~70%的推广佣金比例");
    return false;
  }
  if (!roomInfo.priceList.length) {
    showToast("请完善房间规格信息");
    return false;
  }
  const incompletePriceItemIndex = roomInfo.priceList.findIndex(
    (item) => !item.startDate || !item.endDate || !item.price || !item.price
  );
  if (incompletePriceItemIndex !== -1) {
    showToast("部分价格列表未选择日期范围或未填写价格");
    return false;
  }
  if (roomInfo.breakfastNum === undefined) {
    showToast("请输入早餐数量");
    return false;
  }
  if (!roomInfo.guestNum) {
    showToast("请输入入住人数");
    return false;
  }
  return true;
};
