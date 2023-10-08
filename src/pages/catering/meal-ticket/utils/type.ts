export interface TicketListItem {
  id: number;
  restaurantIds: number[];
  price: number;
  originalPrice: number;
  salesVolume: number;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
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

export interface OriginalTicketInfo {
  id: number;
  restaurantIds: number[];
  price: number;
  originalPrice: number;
  salesCommissionRate: number;
  promotionCommissionRate: number;
  validityDays: number;
  validityStartTime: string;
  validityEndTime: string;
  buyLimit: number;
  perTableUsageLimit: number;
  overlayUsageLimit: number;
  useTimeList: UseTime[];
  includingDrink: number;
  boxAvailable: number;
  needPreBook: number;
  useRules: string[];
}

export interface TicketInfo {
  id: number;
  restaurantIds: number[];
  price: number | undefined;
  originalPrice: number | undefined;
  salesCommissionRate: number | undefined;
  promotionCommissionRate: number | undefined;
  validityDays: number | undefined;
  validityStartTime: string;
  validityEndTime: string;
  buyLimit: number | undefined;
  perTableUsageLimit: number | undefined;
  overlayUsageLimit: number | undefined;
  useTimeList: UseTime[];
  includingDrink: boolean;
  boxAvailable: boolean;
  needPreBook: boolean;
  useRules: string[];
}

export interface CreateTicketInfo {
  restaurantIds: number[];
  price: number;
  originalPrice: number;
  salesCommissionRate: number;
  promotionCommissionRate: number;
  validityDays?: number;
  validityStartTime?: string;
  validityEndTime?: string;
  buyLimit?: number;
  perTableUsageLimit?: number;
  overlayUsageLimit?: number;
  useTimeList: UseTime[];
  includingDrink: 0 | 1;
  boxAvailable: 0 | 1;
  needPreBook: 0 | 1;
  useRules: string[];
}

export interface EditTicketInfo extends CreateTicketInfo {
  id: number;
}
