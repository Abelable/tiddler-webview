import { http } from "@/utils/http";

import type { ProviderRestaurant } from "./type";
import type { Option } from "@/utils/type";

export const getRestaurantOptions = async (): Promise<Option[]> =>
  await http("catering/restaurant/options");

export const getRestaurantListTotals = async (): Promise<number[]> =>
  await http("catering/provider/restaurant/totals");

export const getProviderRestaurantList = async (
  status: number,
  page: number,
  limit = 10
): Promise<ProviderRestaurant[]> => {
  const { list = [] } =
    (await http("catering/provider/restaurant_list", {
      data: { status, page, limit },
    })) || {};
  return list;
};

export const applyRestaurant = async (restaurantId: number) =>
  await http("catering/provider/apply_restaurant", {
    method: "POST",
    data: { restaurantId },
  });

export const deleteProviderRestaurant = async (id: number) =>
  await http("catering/provider/delete_restaurant", {
    method: "POST",
    data: { id },
  });
