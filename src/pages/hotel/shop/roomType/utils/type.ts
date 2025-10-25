import { UploaderFileListItem } from "vant";

export interface RoomTypeItem {
  id: number;
  name: string;
}

export interface RoomTypeDetail extends RoomTypeItem {
  imageList: string[];
  bedDesc: string;
  areaSize: number | undefined;
  floorDesc: string;
  facilityList: string[];
}

export interface FormRoomType extends Omit<RoomTypeDetail, "imageList"> {
  imageList: UploaderFileListItem[];
}
