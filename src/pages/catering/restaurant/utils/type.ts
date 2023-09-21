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

export interface RestaurantCategoryOption {
  id: number;
  name: string;
}

interface OpenTime {
  openMonth: string;
  closeMonth: string;
  openTime: string;
  closeTime: string;
  tips: string;
}

export interface OriginalRestaurantInfo {
  id: number;
  categoryId: number;
  name: string;
  price: number;
  telList: string[];
  logo: string;
  video: string;
  cover: string;
  foodImageList: string[];
  environmentImageList: string[];
  priceImageList: string;
  longitude: number;
  latitude: number;
  address: string;
  openTimeList: OpenTime[];
  facilityList: string[];
}

export interface RestaurantInfo {
  id: number;
  categoryId: number | undefined;
  name: string;
  openStatus: number | undefined;
  price: number | undefined;
  telList: string[];
  logo: UploaderFileListItem[];
  video: UploaderFileListItem[];
  cover: UploaderFileListItem[];
  foodImageList: UploaderFileListItem[];
  environmentImageList: UploaderFileListItem[];
  priceImageList: UploaderFileListItem[];
  longitude: number | undefined;
  latitude: number | undefined;
  address: string;
  openTimeList: OpenTime[];
  facilityList: string[];
}

export interface CreateRestaurantInfo
  extends Omit<
    RestaurantInfo,
    | "id"
    | "logo"
    | "video"
    | "cover"
    | "foodImageList"
    | "environmentImageList"
    | "priceImageList"
  > {
  logo: string;
  video?: string;
  cover: string;
  foodImageList: string;
  environmentImageList: string;
  priceImageList: string;
}

export interface EditRestaurantInfo extends CreateRestaurantInfo {
  id: number;
}
