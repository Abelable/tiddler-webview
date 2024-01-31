import { ref } from "vue";
import { showToast } from "vant";
import { getHotelCategoryOptions } from "./api";

import type { ApiOption } from "@/utils/type";
import type { FormHotel } from "./type";

export const gradeOptions = [
  { text: "经济酒店", value: 1 },
  { text: "舒适酒店", value: 2 },
  { text: "高档酒店", value: 3 },
  { text: "豪华酒店", value: 4 },
];

export const initialHotelInfo = {
  name: "",
  englishName: "",
  grade: undefined,
  categoryId: undefined,
  price: undefined,
  video: [],
  cover: [],
  appearanceImageList: [],
  interiorImageList: [],
  roomImageList: [],
  environmentImageList: [],
  restaurantImageList: [],
  longitude: undefined,
  latitude: undefined,
  address: "",
  featureTagList: [],
  openingYear: "",
  lastDecorationYear: "",
  roomNum: undefined,
  tel: "",
  brief: "",
  recreationFacility: [],
  healthFacility: [],
  childrenFacility: [],
  commonFacility: [],
  publicAreaFacility: [],
  trafficService: [],
  cateringService: [],
  receptionService: [],
  cleanService: [],
  businessService: [],
  otherService: [],
  remindList: [],
  checkInTipList: [],
  preorderTipList: [],
};

export const categoryOptions = ref<ApiOption[]>([]);
export const setCategoryOptions = async () => {
  categoryOptions.value = await getHotelCategoryOptions();
};

export const checkHotelInfo = (scenicInfo: FormHotel) => {
  if (!scenicInfo.cover) {
    showToast("请上传酒店照片");
    return false;
  }
  if (!scenicInfo.name) {
    showToast("请输入酒店名称");
    return false;
  }
  if (!scenicInfo.categoryId) {
    showToast("请选择酒店分类");
    return false;
  }
  if (!scenicInfo.longitude || !scenicInfo.latitude) {
    showToast("请选择经纬度");
    return false;
  }
  if (!scenicInfo.address) {
    showToast("请输入酒店具体位置");
    return false;
  }
  if (!scenicInfo.brief) {
    showToast("请输入酒店简介");
    return false;
  }
  // if (!scenicInfo.hotlineList.length) {
  //   showToast("请添加质询热线");
  //   return false;
  // }
  // if (!scenicInfo.openTimeList.length) {
  //   showToast("请添加营业时间");
  //   return false;
  // }
  // const incompleteOpenTimeIndex = scenicInfo.openTimeList.findIndex(
  //   (item) =>
  //     !item.openMonth || !item.closeMonth || !item.openTime || !item.closeTime
  // );
  // if (incompleteOpenTimeIndex !== -1) {
  //   showToast("请完善开放时间必填项");
  //   return false;
  // }
  // const incompletePolicyIndex = scenicInfo.policyList.findIndex(
  //   (item) => !item.condition || !item.content || !item.crowd
  // );
  // if (incompletePolicyIndex !== -1) {
  //   showToast("请完善优待政策必填项");
  //   return false;
  // }
  // const incompleteProjectIndex = scenicInfo.projectList.findIndex(
  //   (item) => !item.image || !item.name
  // );
  // if (incompleteProjectIndex !== -1) {
  //   showToast("请完善景区项目必填项");
  //   return false;
  // }
  // const incompleteFacilityIndex = scenicInfo.facilityList.findIndex(
  //   (item) => !item.facilityId || !item.content
  // );
  // if (incompleteFacilityIndex !== -1) {
  //   showToast("请完善景区设施必填项");
  //   return false;
  // }
  // const incompleteTipsIndex = scenicInfo.tipsList.findIndex(
  //   (item) => !item.title || !item.content
  // );
  // if (incompleteTipsIndex !== -1) {
  //   showToast("请完善游玩贴士必填项");
  //   return false;
  // }
  return true;
};
