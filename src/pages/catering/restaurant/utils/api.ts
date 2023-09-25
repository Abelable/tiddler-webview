import { http } from "@/utils/http";

import type { Option } from "@/utils/type";
import type { OriginalRestaurantInfo, ProviderRestaurant } from "./type";

export const getRestaurantOptions = async (): Promise<Option[]> =>
  await http("catering/restaurant/user_options");

export const getRestaurantListTotals = async (): Promise<number[]> =>
  await http("catering/provider/restaurant/totals");

export const getProviderRestaurantList = async (
  status: number,
  page: number,
  limit = 10
): Promise<ProviderRestaurant[]> => {
  const { list = [] } =
    (await http("catering/provider/restaurant/list", {
      data: { status, page, limit },
    })) || {};
  return list;
};

export const applyRestaurant = async (restaurantId: number) =>
  await http("catering/provider/restaurant/apply", {
    method: "POST",
    data: { restaurantId },
  });

export const deleteProviderRestaurant = async (id: number) =>
  await http("catering/provider/restaurant/delete", {
    method: "POST",
    data: { id },
  });

export const getRestaurantCategoryOptions = async (): Promise<Option[]> =>
  await http("catering/restaurant/category_options");

export const getRestaurantInfo = async (
  id: number
): Promise<OriginalRestaurantInfo> =>
  await http("catering/restaurant/info", { data: { id } });

export const createRestaurant = async (
  restaurantInfo: Partial<OriginalRestaurantInfo>
) =>
  await http("catering/restaurant/add", {
    method: "POST",
    data: restaurantInfo,
  });

export const editRestaurant = async (
  restaurantInfo: Partial<OriginalRestaurantInfo>
) =>
  await http("catering/restaurant/edit", {
    method: "POST",
    data: restaurantInfo,
  });
