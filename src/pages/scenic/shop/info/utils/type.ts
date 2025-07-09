import type { UploaderFileListItem } from "vant";

export interface OpenTime {
  startWeekDay: number;
  endWeekDay: number;
  timeFrameList: { openTime: string; closeTime: string }[];
}

export interface ShopInfo {
  id: number | undefined;
  bg: string;
  logo: string;
  name: string;
  brief: string;
  ownerName: string;
  mobile: string;
}

export interface FormShopInfo extends Omit<ShopInfo, "bg" | "logo"> {
  bg: UploaderFileListItem[];
  logo: UploaderFileListItem[];
}
