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

export const checkHotelInfo = (hotelInfo: FormHotel) => {
  if (!hotelInfo.name) {
    showToast("请输入酒店名称");
    return false;
  }
  if (!hotelInfo.englishName) {
    showToast("请输入酒店英文名称");
    return false;
  }
  if (!hotelInfo.grade) {
    showToast("请选择酒店档次");
    return false;
  }
  if (!hotelInfo.categoryId) {
    showToast("请选择酒店类型");
    return false;
  }
  if (!hotelInfo.price) {
    showToast("请输入房间最低价格");
    return false;
  }
  if (!hotelInfo.openingYear) {
    showToast("请输入开业年份");
    return false;
  }
  if (!hotelInfo.roomNum) {
    showToast("请输入房间数量");
    return false;
  }
  if (!hotelInfo.tel || !/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(hotelInfo.tel)) {
    showToast("请输入正确联系电话");
    return false;
  }
  if (!hotelInfo.longitude || !hotelInfo.latitude) {
    showToast("请选择经纬度");
    return false;
  }
  if (!hotelInfo.address) {
    showToast("请输入酒店具体位置");
    return false;
  }
  if (!hotelInfo.cover) {
    showToast("请上传酒店封面照片");
    return false;
  }
  return true;
};
