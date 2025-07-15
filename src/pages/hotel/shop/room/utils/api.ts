import { http } from "@/utils/http";
import { cleanObject } from "@/utils/index";

import type { ApiOption } from "@/utils/type";
import type { RoomListItem, RoomInfo } from "./type";

export const getHotelOptions = async (shopId: number): Promise<ApiOption[]> =>
  await http("hotel/shop/hotel/options", { data: { shopId } });

export const getRoomTotals = async (shopId: number): Promise<number[]> =>
  await http("hotel/shop/room/totals", { data: { shopId } });

export const getRoomList = async (
  shopId: number,
  status: number,
  page: number,
  limit = 10
): Promise<RoomListItem[]> => {
  const { list = [] } =
    (await http("hotel/shop/room/list", {
      data: { shopId, status, page, limit },
    })) || {};
  return list;
};

export const getRoomTypeOptions = async (
  hotelId: number
): Promise<ApiOption[]> =>
  await http("hotel/room/type_options", { data: { hotelId } });

export const offShelfRoom = async (shopId: number, id: number) =>
  await http("hotel/shop/room/down", { method: "POST", data: { shopId, id } });

export const onShelfRoom = async (shopId: number, id: number) =>
  await http("hotel/shop/room/up", { method: "POST", data: { shopId, id } });

export const deleteRoom = async (shopId: number, id: number) =>
  await http("hotel/shop/room/delete", {
    method: "POST",
    data: { shopId, id },
  });

export const getRoomInfo = async (id: number): Promise<RoomInfo> =>
  await http("hotel/shop/room/detail", { data: { id } });

export const createRoom = async (
  shopId: number,
  roomInfo: Partial<Omit<RoomInfo, "id">>
) =>
  await http("hotel/shop/room/add", {
    method: "POST",
    data: cleanObject({ shopId, ...roomInfo }),
  });

export const editRoom = async (shopId: number, roomInfo: Partial<RoomInfo>) =>
  await http("hotel/shop/room/edit", {
    method: "POST",
    data: cleanObject({ shopId, ...roomInfo }),
  });
