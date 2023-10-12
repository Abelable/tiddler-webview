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
  num: number;
  price: number;
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

export interface OriginalSetMealInfo {
  id: number;
  restaurantIds: number[];
  cover: string;
  name: string;
  price: number;
  originalPrice: number;
  salesCommissionRate: number;
  promotionCommissionRate: number;
  packageDetails: PackageDetail[];
  validityDays: number;
  validityStartTime: string;
  validityEndTime: string;
  buyLimit: number;
  perTableUsageLimit: number;
  useTimeList: UseTime[];
  needPreBook: number;
  useRules: string[];
}

export interface SetMealInfo {
  id: number;
  restaurantIds: number[];
  cover: UploaderFileListItem[];
  name: string;
  price: number | undefined;
  originalPrice: number | undefined;
  salesCommissionRate: number | undefined;
  promotionCommissionRate: number | undefined;
  packageDetails: PackageDetail[];
  validityDays: number | undefined;
  validityStartTime: string;
  validityEndTime: string;
  buyLimit: number | undefined;
  perTableUsageLimit: number | undefined;
  useTimeList: UseTime[];
  needPreBook: boolean;
  useRules: string[];
}

export interface CreateSetMealInfo {
  restaurantIds: number[];
  cover: string;
  name: string;
  price: number;
  originalPrice: number;
  salesCommissionRate: number;
  promotionCommissionRate: number;
  packageDetails: PackageDetail[];
  validityDays?: number;
  validityStartTime?: string;
  validityEndTime?: string;
  buyLimit?: number;
  perTableUsageLimit?: number;
  overlayUsageLimit?: number;
  useTimeList: UseTime[];
  needPreBook: 0 | 1;
  useRules: string[];
}

export interface EditSetMealInfo extends CreateSetMealInfo {
  id: number;
}
