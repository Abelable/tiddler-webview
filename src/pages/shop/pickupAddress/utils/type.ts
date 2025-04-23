export interface PickupAddressItem {
  id: number;
  name: string;
  addressDetail: string;
}

interface TimeFrame {
  openTime: string;
  closeTime: string;
}
interface OpenTime {
  startWeekDay: number | undefined;
  endWeekDay: number | undefined;
  timeFrameList: TimeFrame[];
}

export interface PickupAddress {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  addressDetail: string;
  openTimeList: OpenTime[];
}

export interface FormPickupAddress {
  name: string;
  longitude: number | undefined;
  latitude: number | undefined;
  addressDetail: string;
  openTimeList: OpenTime[];
}
