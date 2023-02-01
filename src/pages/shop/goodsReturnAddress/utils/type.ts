export interface AddressListItem {
  id: number;
  consigneeName: string;
  mobile: string;
  address: string;
}

export interface AddressDetail extends AddressListItem {
  id: number;
  supplement: string;
}

export interface CreateAddress extends Omit<AddressListItem, "id"> {
  supplement?: string;
}

export interface EditAddress extends AddressListItem {
  supplement?: string;
}
