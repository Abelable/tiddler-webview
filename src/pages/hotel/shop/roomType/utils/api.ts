import { http } from "@/utils/http";
import { cleanObject } from "@/utils/index";

import type { ApiOption } from "@/utils/type";
import type { RoomTypeDetail } from "./type";

export const getRoomTypeList = async (hotelId: number): Promise<ApiOption[]> =>
  await http("hotel/room/type/options", { data: { hotelId } });

export const getRoomType = async (id: number): Promise<RoomTypeDetail> =>
  await http("hotel/room/type/detail", { data: { id } });

export const createRoomType = async (
  hotelId: number,
  address: Partial<Omit<RoomTypeDetail, "id">>
) =>
  await http("hotel/room/type/add", {
    method: "POST",
    data: { hotelId, ...cleanObject(address) },
  });

export const editRoomType = async (address: Partial<RoomTypeDetail>) =>
  await http("hotel/room/type/edit", {
    method: "POST",
    data: cleanObject(address),
  });

export const deleteRoomType = async (id: number) =>
  await http("hotel/room/type/delete", {
    method: "POST",
    data: { id },
  });
