export interface RoomListItem {
  id: number;
  hotelId: number;
  typeName: string;
  price: number;
  breakfastNum: number;
  guestNum: number;
  cancellable: number;
  salesVolume: number;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PriceItem {
  startDate: number | undefined;
  endDate: number | undefined;
  price: number | undefined;
}

export interface RoomInfo {
  id: number;
  hotelId: number | undefined;
  typeId: number | undefined;
  price: number | undefined;
  salesCommissionRate: number | undefined;
  promotionCommissionRate: number | undefined;
  priceList: PriceItem[];
  breakfastNum: number;
  guestNum: number | undefined;
  cancellable: boolean;
}

export interface CreateRoomInfo {
  hotelId: number;
  typeId: number;
  price: number;
  salesCommissionRate: number;
  promotionCommissionRate: number;
  priceList: PriceItem[];
  breakfastNum: number;
  guestNum: number;
  cancellable: 0 | 1;
}

export interface EditRoomInfo extends CreateRoomInfo {
  id: number;
}
