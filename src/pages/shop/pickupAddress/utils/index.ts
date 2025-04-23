import { showToast } from "vant";

import type { FormPickupAddress } from "./type";

export const initialPickupAddress = {
  name: "",
  longitude: undefined,
  latitude: undefined,
  addressDetail: "",
  openTimeList: [],
};

export const checkPickupAddress = (pickupAddress: FormPickupAddress) => {
  if (!pickupAddress.name) {
    showToast("请输入门店名称");
    return false;
  }
  if (!pickupAddress.longitude || !pickupAddress.latitude) {
    showToast("请选择经纬度");
    return false;
  }
  if (!pickupAddress.addressDetail) {
    showToast("请输入门店具体位置");
    return false;
  }
  if (!pickupAddress.openTimeList.length) {
    showToast("请添加营业时间");
    return false;
  }
  const incompleteOpenTimeIndex = pickupAddress.openTimeList.findIndex(
    (item) =>
      !item.startWeekDay || !item.endWeekDay || !item.timeFrameList.length
  );
  if (incompleteOpenTimeIndex !== -1) {
    showToast("请完善营业时间必填项");
    return false;
  }
  return true;
};
