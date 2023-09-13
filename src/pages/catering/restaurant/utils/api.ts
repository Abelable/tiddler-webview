import { http } from "@/utils/http";

import type { ProviderHotel } from "./type";
import type { Option } from "@/utils/type";

export const getHotelOptions = async (): Promise<Option[]> =>
  await http("hotel/options");

export const getHotelListTotals = async (): Promise<number[]> =>
  await http("hotel/provider/hotel_list_totals");

export const getProviderHotelList = async (
  status: number,
  page: number,
  limit = 10
): Promise<ProviderHotel[]> => {
  const { list = [] } =
    (await http("hotel/provider/hotel_list", {
      data: { status, page, limit },
    })) || {};
  return list;
};

export const applyHotel = async (hotelId: number) =>
  await http("hotel/provider/apply_hotel", {
    method: "POST",
    data: { hotelId },
  });

export const deleteProviderHotel = async (id: number) =>
  await http("hotel/provider/delete_hotel", { method: "POST", data: { id } });
