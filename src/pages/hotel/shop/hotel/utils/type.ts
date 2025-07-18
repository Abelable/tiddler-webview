import type { UploaderFileListItem } from "vant";

export interface ShopHotel {
  id: number;
  status: number;
  failureReason: string;
  hotelId: number;
  hotelCover: string;
  hotelName: string;
  hotelGrade: number;
  hotelAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface FormHotel {
  name: string;
  englishName: string;
  grade: number | undefined;
  categoryId: number | undefined;
  price: number | undefined;
  video: UploaderFileListItem[];
  cover: UploaderFileListItem[];
  appearanceImageList: UploaderFileListItem[];
  interiorImageList: UploaderFileListItem[];
  roomImageList: UploaderFileListItem[];
  environmentImageList: UploaderFileListItem[];
  restaurantImageList: UploaderFileListItem[];
  longitude: number | undefined;
  latitude: number | undefined;
  address: string;
  featureTagList: string[];
  openingYear: string;
  lastDecorationYear: string;
  roomNum: number | undefined;
  tel: string;
  brief: string;
  recreationFacility: string[];
  healthFacility: string[];
  childrenFacility: string[];
  commonFacility: string[];
  publicAreaFacility: string[];
  trafficService: string[];
  cateringService: string[];
  receptionService: string[];
  cleanService: string[];
  businessService: string[];
  otherService: string[];
  remindList: string[];
  checkInTipList: string[];
  preorderTipList: string[];
}

export interface Hotel {
  id: number;
  name: string;
  englishName: string;
  grade: number;
  categoryId: number;
  price: number;
  video: string;
  cover: string;
  appearanceImageList: string[];
  interiorImageList: string[];
  roomImageList: string[];
  environmentImageList: string[];
  restaurantImageList: string[];
  longitude: number;
  latitude: number;
  address: string;
  featureTagList: string[];
  openingYear: string;
  lastDecorationYear: string;
  roomNum: number;
  tel: string;
  brief: string;
  recreationFacility: string[];
  healthFacility: string[];
  childrenFacility: string[];
  commonFacility: string[];
  publicAreaFacility: string[];
  trafficService: string[];
  cateringService: string[];
  receptionService: string[];
  cleanService: string[];
  businessService: string[];
  otherService: string[];
  remindList: string[];
  checkInTipList: string[];
  preorderTipList: string[];
}
