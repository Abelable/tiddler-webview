import { http } from "@/utils/http";
import { cleanObject } from "@/utils/index";

import type { ApiOption } from "@/utils/type";
import type { ShopRestaurant, RestaurantInfo } from "./type";

export const getShopRestaurantOptions = async (
  shopId: number
): Promise<ApiOption[]> =>
  await http("catering/shop/restaurant/options", { data: { shopId } });

export const getRestaurantOptions = async (
  shopId: number,
  keywords: string
): Promise<ApiOption[]> =>
  await http("catering/restaurant/shop_options", {
    data: cleanObject({ shopId, keywords }),
  });

export const getRestaurantListTotals = async (
  shopId: number
): Promise<number[]> =>
  await http("catering/shop/restaurant/totals", { data: { shopId } });

export const getShopRestaurantList = async (
  shopId: number,
  status: number,
  page: number,
  limit = 10
): Promise<ShopRestaurant[]> => {
  const { list = [] } =
    (await http("catering/shop/restaurant/list", {
      data: { shopId, status, page, limit },
    })) || {};
  return list;
};

export const applyRestaurant = async (
  shopId: number,
  restaurantIds: number[]
) =>
  await http("catering/shop/restaurant/apply", {
    method: "POST",
    data: { shopId, restaurantIds },
  });

export const deleteShopRestaurant = async (shopId: number, id: number) =>
  await http("catering/shop/restaurant/delete", {
    method: "POST",
    data: { shopId, id },
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
