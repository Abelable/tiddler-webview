export interface TicketCategoryOption {
  id: number;
  name: string;
  disabled: boolean;
}

export interface TicketListItem {
  id: number;
  type: number;
  scenicIds: number[];
  name: string;
  price: number;
  salesVolume: number;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PriceItem {
  startDate: number | undefined;
  endDate: number | undefined;
  price: number | undefined;
  stock: number | undefined;
}

export interface SpecItem {
  categoryId: number;
  priceList: PriceItem[];
}

export interface TicketInfo {
  id: number;
  type: number;
  scenicIds: number[];
  name: string;
  briefName: string;
  price: number;
  marketPrice: number;
  salesCommissionRate: number;
  promotionCommissionRate: number;
  specList: SpecItem[];
  feeIncludeTips: string;
  feeNotIncludeTips: string;
  bookingTime: string;
  effectiveTime: number;
  validityTime: number;
  limitNumber: number;
  refundStatus: number;
  refundTips: string;
  needExchange: 0 | 1;
  exchangeTips: string;
  exchangeTime: string;
  exchangeLocation: string;
  enterTime: string;
  enterLocation: string;
  invoiceTips: string;
  reminderTips: string;
}

export interface FormTicketInfo {
  type: number | undefined;
  scenicIds: number[];
  name: string;
  briefName: string;
  price: number | undefined;
  marketPrice: number | undefined;
  salesCommissionRate: number | undefined;
  promotionCommissionRate: number | undefined;
  specList: SpecItem[];
  feeIncludeTips: string;
  feeNotIncludeTips: string;
  bookingTime: string;
  effectiveTime: number | undefined;
  validityTime: number | undefined;
  limitNumber: number | undefined;
  refundStatus: number | undefined;
  refundTips: string;
  needExchange: boolean;
  exchangeTips: string;
  exchangeTime: string;
  exchangeLocation: string;
  enterTime: string;
  enterLocation: string;
  invoiceTips: string;
  reminderTips: string;
}
