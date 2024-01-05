import { ref } from "vue";
import { showToast } from "vant";
import { getScenicCategoryOptions } from "./api";

import type { Option } from "@/utils/type";
import type { ScenicInfo } from "./type";

export const categoryOptions = ref<Option[]>([]);
export const setCategoryOptions = async () => {
  categoryOptions.value = await getScenicCategoryOptions();
};

export const checkScenicInfo = (
  scenicInfo: ScenicInfo | Omit<ScenicInfo, "id">
) => {
  if (!scenicInfo.imageList.length) {
    showToast("请上传景点封面");
    return false;
  }
  if (!scenicInfo.name) {
    showToast("请输入景点名称");
    return false;
  }
  if (!scenicInfo.categoryId) {
    showToast("请选择景点分类");
    return false;
  }
  if (!scenicInfo.longitude || !scenicInfo.latitude) {
    showToast("请选择经纬度");
    return false;
  }
  if (!scenicInfo.address) {
    showToast("请输入景点具体位置");
    return false;
  }
  if (!scenicInfo.hotlineList.length) {
    showToast("请添加联系电话");
    return false;
  }
  if (!scenicInfo.openTimeList.length) {
    showToast("请添加营业时间");
    return false;
  }
  // const incompleteOpenTimeIndex = scenicInfo.openTimeList.findIndex(
  //   (item) =>
  //     !item.startWeekDay || !item.endWeekDay || !item.timeFrameList.length
  // );
  // if (incompleteOpenTimeIndex !== -1) {
  //   showToast("请完善营业时间必填项");
  //   return false;
  // }
  return true;
};
