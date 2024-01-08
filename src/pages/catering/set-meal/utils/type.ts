import type { UploaderFileListItem } from "vant";

export interface SetMealListItem {
  id: number;
  restaurantIds: number[];
  cover: string;
  name: string;
  price: number;
  originalPrice: number;
  salesVolume: number;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
}

interface FoodItem {
  name: string;
  num: number | undefined;
  price: number | undefined;
}
interface PackageDetail {
  name: string;
  foodList: FoodItem[];
}

interface timeFrame {
  startTime: string;
  endTime: string;
}
interface UseTime {
  startWeekDay: number | undefined;
  endWeekDay: number | undefined;
  timeFrameList: timeFrame[];
}

interface BaseInfo {
  restaurantIds: number[];
  name: string;
  packageDetails: PackageDetail[];
  useTimeList: UseTime[];
  validityDays: number | undefined;
  validityStartTime: string;
  validityEndTime: string;
  buyLimit: number | undefined;
  perTableUsageLimit: number | undefined;
  useRules: string[];
}

export interface SetMealInfo extends BaseInfo {
  id: number;
  cover: string;
  price: number;
  originalPrice: number;
  salesCommissionRate: number;
  promotionCommissionRate: number;
  needPreBook: 0 | 1;
}

export interface FormSetMealInfo extends BaseInfo {
  cover: UploaderFileListItem[];
  price: number | undefined;
  originalPrice: number | undefined;
  salesCommissionRate: number | undefined;
  promotionCommissionRate: number | undefined;
  needPreBook: boolean;
}
