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

interface timeFrame {
  openTime: string;
  closeTime: string;
}
export interface OpenTime {
  startWeekDay: number | undefined;
  endWeekDay: number | undefined;
  timeFrameList: timeFrame[];
}

export interface OriginalRestaurantInfo {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  longitude: number;
  latitude: number;
  address: string;
  telList: string[];
  facilityList: string[];
  openTimeList: string[];
  video?: string;
  cover: string;
  foodImageList: string[];
  environmentImageList: string[];
  priceImageList: string[];
}

export interface RestaurantInfo
  extends Omit<
    OriginalRestaurantInfo,
    | "categoryId"
    | "price"
    | "longitude"
    | "latitude"
    | "openTimeList"
    | "video"
    | "cover"
    | "foodImageList"
    | "environmentImageList"
    | "priceImageList"
  > {
  categoryId: number | undefined;
  price: number | undefined;
  longitude: number | undefined;
  latitude: number | undefined;
  openTimeList: OpenTime[];
  video: UploaderFileListItem[];
  cover: UploaderFileListItem[];
  foodImageList: UploaderFileListItem[];
  environmentImageList: UploaderFileListItem[];
  priceImageList: UploaderFileListItem[];
}
