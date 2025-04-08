export interface AddressListItem {
  id: number;
  consigneeName: string;
  mobile: string;
  addressDetail: string;
}

export interface AddressDetail extends AddressListItem {
  id: number;
  supplement: string;
}
