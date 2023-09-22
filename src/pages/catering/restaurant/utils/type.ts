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

interface OpenTime {
  openMonth: number | undefined;
  closeMonth: number | undefined;
  openTime: string;
  closeTime: string;
  tips: string;
}

export interface RestaurantInfo {
  id: number;
  name: string;
  categoryId: number | undefined;
  openStatus: number | undefined;
  price: number | undefined;
  longitude: number | undefined;
  latitude: number | undefined;
  address: string;
  telList: string[];
  facilityList: string[];
  openTimeList: OpenTime[];
  logo: UploaderFileListItem[];
  video: UploaderFileListItem[];
  cover: UploaderFileListItem[];
  foodImageList: UploaderFileListItem[];
  environmentImageList: UploaderFileListItem[];
  priceImageList: UploaderFileListItem[];
}

export interface OriginalRestaurantInfo {
  id: number;
  name: string;
  categoryId: number;
  openStatus: number;
  price: number;
  longitude: number;
  latitude: number;
  address: string;
  telList: string[];
  facilityList: string[];
  openTimeList: OpenTime[];
  logo: string;
  video?: string;
  cover: string;
  foodImageList: string[];
  environmentImageList: string[];
  priceImageList: string[];
}
