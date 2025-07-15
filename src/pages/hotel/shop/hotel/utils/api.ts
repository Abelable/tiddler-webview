import { http } from "@/utils/http";
import { cleanObject } from "@/utils";

import type { Hotel, ProviderHotel } from "./type";
import type { ApiOption } from "@/utils/type";

export const getHotelOptions = async (
  shopId: number,
  keywords: string
): Promise<ApiOption[]> =>
  await http("hotel/shop_options", { data: cleanObject({ shopId, keywords }) });

export const getHotelListTotals = async (shopId: number): Promise<number[]> =>
  await http("hotel/shop/hotel/totals", { data: { shopId } });

export const getShopHotelList = async (
  shopId: number,
  status: number,
  page: number,
  limit = 10
): Promise<ProviderHotel[]> => {
  const { list = [] } =
    (await http("hotel/shop/hotel/list", {
      data: { shopId, status, page, limit },
    })) || {};
  return list;
};

export const applyHotel = async (shopId: number, hotelIds: number[]) =>
  await http("hotel/shop/hotel/apply", {
    method: "POST",
    data: { shopId, hotelIds },
  });

export const deleteShopHotel = async (shopId: number, id: number) =>
  await http("hotel/shop/hotel/delete", {
    method: "POST",
    data: { shopId, id },
  });

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
