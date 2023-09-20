import { http } from "@/utils/http";

import type {
  CreateRestaurantInfo,
  EditRestaurantInfo,
  OriginalRestaurantInfo,
  ProviderRestaurant,
  RestaurantCategoryOption,
} from "./type";
import type { Option } from "@/utils/type";

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

export const getRestaurantCategoryOptions = async (): Promise<
  RestaurantCategoryOption[]
> => await http("catering/restaurant/category_options");

export const getRestaurantInfo = async (
  id: number
): Promise<OriginalRestaurantInfo> =>
  await http("shop/goods/info", { data: { id } });

export const createRestaurant = async (goodsInfo: CreateRestaurantInfo) =>
  await http("shop/goods/add", { method: "POST", data: goodsInfo });

export const editRestaurant = async (goodsInfo: EditRestaurantInfo) =>
  await http("shop/goods/edit", { method: "POST", data: goodsInfo });
