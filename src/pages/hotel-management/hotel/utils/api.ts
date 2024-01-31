import { http } from "@/utils/http";
import { cleanObject } from "@/utils";

import type { Hotel, ProviderHotel } from "./type";
import type { ApiOption } from "@/utils/type";

export const getHotelOptions = async (): Promise<ApiOption[]> =>
  await http("hotel/provider_options");

export const getHotelListTotals = async (): Promise<number[]> =>
  await http("hotel/provider/hotel/totals");

export const getProviderHotelList = async (
  status: number,
  page: number,
  limit = 10
): Promise<ProviderHotel[]> => {
  const { list = [] } =
    (await http("hotel/provider/hotel/list", {
      data: { status, page, limit },
    })) || {};
  return list;
};

export const applyHotel = async (hotelIds: number[]) =>
  await http("hotel/provider/hotel/apply", {
    method: "POST",
    data: { hotelIds },
  });

export const deleteProviderHotel = async (id: number) =>
  await http("hotel/provider/hotel/delete", { method: "POST", data: { id } });

export const getHotelCategoryOptions = async (): Promise<ApiOption[]> =>
  await http("hotel/category_options");

export const getHotelInfo = async (id: number): Promise<Hotel> =>
  await http("hotel/detail", { data: { id } });

export const createHotel = async (hotelInfo: Partial<Omit<Hotel, "id">>) =>
  await http("hotel/add", {
    method: "POST",
    data: cleanObject(hotelInfo),
  });

export const editHotel = async (hotelInfo: Partial<Hotel>) =>
  await http("hotel/edit", {
    method: "POST",
    data: cleanObject(hotelInfo),
  });
