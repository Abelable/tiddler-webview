import { http } from "@/utils/http";
import { cleanObject } from "@/utils/index";

import type { SetMealListItem, SetMealInfo } from "./type";

export const getSetMealTotals = async (shopId: number): Promise<number[]> =>
  await http("catering/shop/set_meal/totals", { data: { shopId } });

export const getSetMealList = async (
  shopId: number,
  status: number,
  page: number,
  limit = 10
): Promise<SetMealListItem[]> => {
  const { list = [] } =
    (await http("catering/shop/set_meal/list", {
      data: { shopId, status, page, limit },
    })) || {};
  return list;
};

export const offShelfSetMeal = async (shopId: number, id: number) =>
  await http("catering/shop/set_meal/down", {
    method: "POST",
    data: { shopId, id },
  });

export const onShelfSetMeal = async (shopId: number, id: number) =>
  await http("catering/shop/set_meal/up", {
    method: "POST",
    data: { shopId, id },
  });

export const deleteSetMeal = async (shopId: number, id: number) =>
  await http("catering/shop/set_meal/delete", {
    method: "POST",
    data: { shopId, id },
  });

export const getSetMealInfo = async (id: number): Promise<SetMealInfo> =>
  await http("catering/set_meal/detail", { data: { id } });

export const createSetMeal = async (
  shopId: number,
  setMealInfo: Partial<Omit<SetMealInfo, "id">>
) =>
  await http("catering/shop/set_meal/add", {
    method: "POST",
    data: cleanObject({ shopId, ...setMealInfo }),
  });

export const editSetMeal = async (
  shopId: number,
  setMealInfo: Partial<SetMealInfo>
) =>
  await http("catering/shop/set_meal/edit", {
    method: "POST",
    data: cleanObject({ shopId, ...setMealInfo }),
  });
