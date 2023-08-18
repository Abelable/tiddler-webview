import { http } from "@/utils/http";

import type { Option } from "@/utils/type";
import type {
  RoomListItem,
  CreateRoomInfo,
  OriginalRoomInfo,
  EditRoomInfo,
} from "./type";

export const getHotelOptions = async (): Promise<Option[]> =>
  await http("hotel/provider/hotel_options");

export const getRoomTotals = async (): Promise<number[]> =>
  await http("hotel/provider/room/totals");

export const getRoomList = async (
  status: number,
  page: number,
  limit = 10
): Promise<RoomListItem[]> => {
  const { list = [] } =
    (await http("hotel/provider/room/list", {
      data: { status, page, limit },
    })) || {};
  return list;
};

export const getRoomTypeOptions = async (): Promise<Option[]> =>
  await http("hotel/room/type_options");

export const offShelfRoom = async (id: number) =>
  await http("hotel/provider/room/down", { method: "POST", data: { id } });

export const onShelfRoom = async (id: number) =>
  await http("hotel/provider/room/up", { method: "POST", data: { id } });

export const deleteRoom = async (id: number) =>
  await http("hotel/provider/room/delete", { method: "POST", data: { id } });

export const getRoomInfo = async (id: number): Promise<OriginalRoomInfo> =>
  await http("hotel/provider/room/detail", { data: { id } });

export const createRoom = async (goodsInfo: CreateRoomInfo) =>
  await http("hotel/provider/room/add", { method: "POST", data: goodsInfo });

export const editRoom = async (goodsInfo: EditRoomInfo) =>
  await http("hotel/provider/room/edit", {
    method: "POST",
    data: goodsInfo,
  });
