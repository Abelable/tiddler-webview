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

interface BaseInfo {
  restaurantIds: number[];
  useTimeList: UseTime[];
  validityDays: number | undefined;
  validityStartTime: string;
  validityEndTime: string;
  buyLimit: number | undefined;
  perTableUsageLimit: number | undefined;
  overlayUsageLimit: number | undefined;
  inapplicableProducts: string[];
  useRules: string[];
}

export interface TicketInfo extends BaseInfo {
  id: number;
  price: number;
  originalPrice: number;
  salesCommissionRate: number;
  boxAvailable: 0 | 1;
  needPreBook: 0 | 1;
}

export interface FormTicketInfo extends BaseInfo {
  price: number | undefined;
  originalPrice: number | undefined;
  salesCommissionRate: number | undefined;
  boxAvailable: boolean;
  needPreBook: boolean;
}
