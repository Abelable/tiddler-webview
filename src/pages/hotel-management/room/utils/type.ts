export interface RoomTypeOption {
  id: number;
  name: string;
  disabled: boolean;
}

export interface RoomListItem {
  id: number;
  type: number;
  hotelIds: number[];
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

export interface OriginalSpecItem {
  categoryId: number;
  priceList: string;
}

export interface OriginalRoomInfo {
  id: number;
  type: number;
  hotelIds: number[];
  name: string;
  briefName: string;
  price: number;
  marketPrice: number;
  salesCommissionRate: number;
  promotionCommissionRate: number;
  specList: OriginalSpecItem[];
  feeIncludeTips: string;
  feeNotIncludeTips: string;
  bookingTime: string;
  effectiveTime: number;
  validityTime: number;
  limitNumber: number;
  refundStatus: number;
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

export interface RoomInfo {
  id: number;
  type: number | undefined;
  hotelIds: number[];
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

interface CreateSpecItem {
  categoryId: number;
  priceList: string;
}

export interface CreateRoomInfo {
  type: number;
  hotelIds: number[];
  name: string;
  price: number;
  marketPrice?: number;
  salesCommissionRate: number;
  promotionCommissionRate: number;
  specList: CreateSpecItem[];
  feeIncludeTips?: string;
  feeNotIncludeTips?: string;
  bookingTime: string;
  effectiveTime?: number;
  validityTime?: number;
  limitNumber?: number;
  refundStatus: number;
  refundTips?: string;
  needExchange: 0 | 1;
  exchangeTips?: string;
  exchangeTime?: string;
  exchangeLocation?: string;
  enterTime?: string;
  enterLocation?: string;
  invoiceTips?: string;
  reminderTips?: string;
}

export interface EditRoomInfo extends CreateRoomInfo {
  id: number;
}
