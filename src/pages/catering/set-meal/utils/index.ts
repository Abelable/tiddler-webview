import { ref } from "vue";
import { showToast } from "vant";
import { getRestaurantOptions } from "./api";

import type { ApiOption } from "@/utils/type";
import type { SetMealInfo } from "./type";

export const validityTypeOptions = [
  { text: "购买后有效天数", value: 1 },
  { text: "范围有效期", value: 2 },
];

export const restaurantOptions = ref<ApiOption[]>([]);
export const setRestaurantOptions = async () =>
  (restaurantOptions.value = await getRestaurantOptions());

export const checkSetMealInfo = (
  setMealInfo: SetMealInfo | Omit<SetMealInfo, "id">
) => {
  if (!setMealInfo.restaurantIds.length) {
    showToast("请选择关联门店");
    return false;
  }
  if (!setMealInfo.cover.length) {
    showToast("请上传套餐封面");
    return;
  }
  if (!setMealInfo.name) {
    showToast("请输入套餐名称");
    return false;
  }
  if (!setMealInfo.price) {
    showToast("请输入套餐价格");
    return false;
  }
  if (!setMealInfo.originalPrice) {
    showToast("请输入套餐原价");
    return false;
  }
  if (
    !setMealInfo.salesCommissionRate ||
    setMealInfo.salesCommissionRate < 10 ||
    setMealInfo.salesCommissionRate > 70
  ) {
    showToast("请输入范围为10%~70%的销售佣金比例");
    return false;
  }
  if (
    !setMealInfo.promotionCommissionRate ||
    setMealInfo.promotionCommissionRate < 2 ||
    setMealInfo.promotionCommissionRate > 70
  ) {
    showToast("请输入范围为2%~70%的推广佣金比例");
    return false;
  }
  if (!setMealInfo.packageDetails.length) {
    showToast("请完善套餐详情");
    return false;
  }
  if (!setMealInfo.validityDays && !setMealInfo.validityStartTime) {
    showToast("请设置有效期");
    return false;
  }
  if (setMealInfo.useTimeList.length) {
    const incompleteOpenTimeIndex = setMealInfo.useTimeList.findIndex(
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
