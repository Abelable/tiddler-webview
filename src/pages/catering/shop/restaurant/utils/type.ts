import type { UploaderFileListItem } from "vant";

export interface ProviderRestaurant {
  id: number;
  status: number;
  failureReason: string;
  restaurantId: number;
  restaurantImage: string;
  restaurantName: string;
  restaurantAddress: string;
  createdAt: string;
  updatedAt: string;
}

interface TimeFrame {
  openTime: string;
  closeTime: string;
}
interface OpenTime {
  startWeekDay: number | undefined;
  endWeekDay: number | undefined;
  timeFrameList: TimeFrame[];
}

export interface RestaurantInfo {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  longitude: number;
  latitude: number;
  address: string;
  telList: string[];
  facilityList: string[];
  openTimeList: OpenTime[];
  video: string;
  cover: string;
  foodImageList: string[];
  environmentImageList: string[];
  priceImageList: string[];
}

export interface FormRestaurantInfo {
  name: string;
  categoryId: number | undefined;
  price: number | undefined;
  longitude: number | undefined;
  latitude: number | undefined;
  address: string;
  telList: string[];
  facilityList: string[];
  openTimeList: OpenTime[];
  video: UploaderFileListItem[];
  cover: UploaderFileListItem[];
  foodImageList: UploaderFileListItem[];
  environmentImageList: UploaderFileListItem[];
  priceImageList: UploaderFileListItem[];
}
