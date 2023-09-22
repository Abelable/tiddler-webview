import { ref } from "vue";
import { showToast } from "vant";
import { getRestaurantCategoryOptions } from "./api";

import type { Option } from "@/utils/type";
import type { RestaurantInfo } from "./type";

export const openStatusOptions = [
  { text: "正在营业", value: 1 },
  { text: "尚未营业", value: 0 },
];
export const monthOptions = [
  { text: "1月", value: 1 },
  { text: "2月", value: 2 },
  { text: "3月", value: 3 },
  { text: "4月", value: 4 },
  { text: "5月", value: 5 },
  { text: "6月", value: 6 },
  { text: "7月", value: 7 },
  { text: "8月", value: 8 },
  { text: "9月", value: 9 },
  { text: "10月", value: 10 },
  { text: "11月", value: 11 },
  { text: "12月", value: 12 },
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
    showToast("请设置营业时间");
    return false;
  }
  const incompleteOpenTimeIndex = restaurantInfo.openTimeList.findIndex(
    (item) =>
      !item.openMonth || !item.closeMonth || !item.openTime || !item.closeTime
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
