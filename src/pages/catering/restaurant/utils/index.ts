import { ref } from "vue";
import { showToast } from "vant";
import { getRestaurantCategoryOptions } from "./api";

import type { Option } from "@/utils/type";
import type { RestaurantInfo } from "./type";

export const openStatusOptions = [
  { text: "正在营业", value: 1 },
  { text: "尚未营业", value: 0 },
];
export const weekDayOptions = [
  { text: "周一", value: 1 },
  { text: "周二", value: 2 },
  { text: "周三", value: 3 },
  { text: "周四", value: 4 },
  { text: "周五", value: 5 },
  { text: "周六", value: 6 },
  { text: "周日", value: 7 },
];

export const categoryOptions = ref<Option[]>([]);
export const setCategoryOptions = async () => {
  categoryOptions.value = await getRestaurantCategoryOptions();
};

export const checkRestaurantInfo = (
  restaurantInfo: RestaurantInfo | Omit<RestaurantInfo, "id">
) => {
  if (!restaurantInfo.name) {
    showToast("请输入门店名称");
    return false;
  }
  if (!restaurantInfo.categoryId) {
    showToast("请选择门店分类");
    return false;
  }
  if (restaurantInfo.openStatus === undefined) {
    showToast("请选择营业状态");
    return false;
  }
  if (!restaurantInfo.price) {
    showToast("请输入人均价格");
    return false;
  }
  if (!restaurantInfo.longitude || !restaurantInfo.latitude) {
    showToast("请选择经纬度");
    return false;
  }
  if (!restaurantInfo.address) {
    showToast("请输入门店具体位置");
    return false;
  }
  if (!restaurantInfo.telList.length) {
    showToast("请添加联系电话");
    return false;
  }
  if (!restaurantInfo.openTimeList.length) {
    showToast("请添加营业时间");
    return false;
  }
  const incompleteOpenTimeIndex = restaurantInfo.openTimeList.findIndex(
    (item) =>
      !item.startWeekDay || !item.endWeekDay || !item.timeFrameList.length
  );
  if (incompleteOpenTimeIndex !== -1) {
    showToast("请完善营业时间必填项");
    return false;
  }
  if (!restaurantInfo.logo.length) {
    showToast("请上传门店logo");
    return false;
  }
  if (!restaurantInfo.cover.length) {
    showToast("请上传门店封面");
    return false;
  }
  return true;
};
