export interface RefundAddressItem {
  id: number;
  consigneeName: string;
  mobile: string;
  addressDetail: string;
}

export interface AddressDetail extends RefundAddressItem {
  id: number;
  supplement: string;
}
