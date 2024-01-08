import { http } from "@/utils/http";

import type { ApiOption } from "@/utils/type";
import type { RoomListItem, RoomInfo } from "./type";
import { cleanObject } from "@/utils/index";

export const getHotelOptions = async (): Promise<ApiOption[]> =>
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

export const getRoomTypeOptions = async (
  hotelId: number
): Promise<ApiOption[]> =>
  await http("hotel/room/type_options", { data: { hotelId } });

export const offShelfRoom = async (id: number) =>
  await http("hotel/provider/room/down", { method: "POST", data: { id } });

export const onShelfRoom = async (id: number) =>
  await http("hotel/provider/room/up", { method: "POST", data: { id } });

export const deleteRoom = async (id: number) =>
  await http("hotel/provider/room/delete", { method: "POST", data: { id } });

export const getRoomInfo = async (id: number): Promise<RoomInfo> =>
  await http("hotel/provider/room/detail", { data: { id } });

export const createRoom = async (roomInfo: Partial<Omit<RoomInfo, "id">>) =>
  await http("hotel/provider/room/add", {
    method: "POST",
    data: cleanObject(roomInfo),
  });

export const editRoom = async (roomInfo: Partial<RoomInfo>) =>
  await http("hotel/provider/room/edit", {
    method: "POST",
    data: cleanObject(roomInfo),
  });
