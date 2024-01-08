import { http } from "@/utils/http";
import { cleanObject } from "@/utils";

import type { ApiOption } from "@/utils/type";
import type { ProviderRestaurant, RestaurantInfo } from "./type";

export const getRestaurantOptions = async (): Promise<ApiOption[]> =>
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

export const applyRestaurant = async (restaurantIds: number[]) =>
  await http("catering/provider/restaurant/apply", {
    method: "POST",
    data: { restaurantIds },
  });

export const deleteProviderRestaurant = async (id: number) =>
  await http("catering/provider/restaurant/delete", {
    method: "POST",
    data: { id },
  });

export const getRestaurantCategoryOptions = async (): Promise<ApiOption[]> =>
  await http("catering/restaurant/category_options");

export const getRestaurantInfo = async (id: number): Promise<RestaurantInfo> =>
  await http("catering/restaurant/detail", { data: { id } });

export const createRestaurant = async (
  restaurantInfo: Partial<Omit<RestaurantInfo, "id">>
) =>
  await http("catering/restaurant/add", {
    method: "POST",
    data: cleanObject(restaurantInfo),
  });

export const editRestaurant = async (restaurantInfo: Partial<RestaurantInfo>) =>
  await http("catering/restaurant/edit", {
    method: "POST",
    data: cleanObject(restaurantInfo),
  });
