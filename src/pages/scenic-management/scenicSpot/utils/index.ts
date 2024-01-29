import { ref } from "vue";
import { showToast } from "vant";
import { getScenicCategoryOptions } from "./api";

import type { ApiOption } from "@/utils/type";
import type { FormScenicInfo } from "./type";

export const facilityOptions = [
  { value: 1, text: "停车场" },
  { value: 2, text: "卫生间" },
  { value: 3, text: "商店" },
  { value: 4, text: "餐厅" },
];

export const initialScenicInfo = {
  name: "",
  level: "",
  categoryId: undefined,
  video: [],
  imageList: [],
  longitude: undefined,
  latitude: undefined,
  address: "",
  brief: "",
  openTimeList: [],
  policyList: [],
  hotlineList: [],
  facilityList: [],
  projectList: [],
  tipsList: [],
};

export const categoryOptions = ref<ApiOption[]>([]);
export const setCategoryOptions = async () => {
  categoryOptions.value = await getScenicCategoryOptions();
};

export const checkScenicInfo = (scenicInfo: FormScenicInfo) => {
  if (!scenicInfo.imageList.length) {
    showToast("请上传景点照片");
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
  if (!scenicInfo.brief) {
    showToast("请输入景点简介");
    return false;
  }
  if (!scenicInfo.hotlineList.length) {
    showToast("请添加质询热线");
    return false;
  }
  if (!scenicInfo.openTimeList.length) {
    showToast("请添加营业时间");
    return false;
  }
  const incompleteOpenTimeIndex = scenicInfo.openTimeList.findIndex(
    (item) =>
      !item.openMonth || !item.closeMonth || !item.openTime || !item.closeTime
  );
  if (incompleteOpenTimeIndex !== -1) {
    showToast("请完善开放时间必填项");
    return false;
  }
  const incompletePolicyIndex = scenicInfo.policyList.findIndex(
    (item) => !item.condition || !item.content || !item.crowd
  );
  if (incompletePolicyIndex !== -1) {
    showToast("请完善优待政策必填项");
    return false;
  }
  const incompleteProjectIndex = scenicInfo.projectList.findIndex(
    (item) => !item.image || !item.name
  );
  if (incompleteProjectIndex !== -1) {
    showToast("请完善景区项目必填项");
    return false;
  }
  const incompleteFacilityIndex = scenicInfo.facilityList.findIndex(
    (item) => !item.facilityId || !item.content
  );
  if (incompleteFacilityIndex !== -1) {
    showToast("请完善景区设施必填项");
    return false;
  }
  const incompleteTipsIndex = scenicInfo.tipsList.findIndex(
    (item) => !item.title || !item.content
  );
  if (incompleteTipsIndex !== -1) {
    showToast("请完善游玩贴士必填项");
    return false;
  }
  return true;
};
