export interface TicketListItem {
  id: number;
  name: string;
  price: number;
  salesVolume: number;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PriceItem {
  startDate: string;
  endDate: string;
  price: number;
  stock: number;
}
export interface SpecItem {
  categoryId: number;
  priceList: PriceItem[];
}
export interface OriginalTicketInfo {
  id: number;
  type: number;
  name: string;
  price: number;
  marketPrice: number;
  salesCommissionRate: number;
  promotionCommissionRate: number;
  specList: SpecItem[];
}

export interface TicketInfo {
  id: number;
  type: number | undefined;
  name: string;
  price: number | undefined;
  marketPrice: number | undefined;
  salesCommissionRate: number | undefined;
  promotionCommissionRate: number | undefined;
  specList: SpecItem[];
}

export interface CreateTicketInfo
  extends Omit<TicketInfo, "id" | "marketPrice" | "specList"> {
  marketPrice?: number;
  specList: string;
}

export interface EditTicketInfo extends CreateTicketInfo {
  id: number;
}
