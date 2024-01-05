import { ref } from "vue";
import { showToast } from "vant";
import { getRestaurantCategoryOptions } from "./api";

import type { ApiOption } from "@/utils/type";
import type { RestaurantInfo } from "./type";

export const categoryOptions = ref<ApiOption[]>([]);
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
  if (!restaurantInfo.cover.length) {
    showToast("请上传门店封面");
    return false;
  }
  return true;
};
