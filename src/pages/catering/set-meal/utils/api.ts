import { http } from "@/utils/http";

import type { ApiOption } from "@/utils/type";
import type {
  SetMealListItem,
  CreateSetMealInfo,
  OriginalSetMealInfo,
  EditSetMealInfo,
} from "./type";

export const getRestaurantOptions = async (): Promise<ApiOption[]> =>
  await http("catering/provider/restaurant/options");

export const getSetMealTotals = async (): Promise<number[]> =>
  await http("catering/provider/set_meal/totals");

export const getSetMealList = async (
  status: number,
  page: number,
  limit = 10
): Promise<SetMealListItem[]> => {
  const { list = [] } =
    (await http("catering/provider/set_meal/list", {
      data: { status, page, limit },
    })) || {};
  return list;
};

export const offShelfSetMeal = async (id: number) =>
  await http("catering/provider/set_meal/down", {
    method: "POST",
    data: { id },
  });

export const onShelfSetMeal = async (id: number) =>
  await http("catering/provider/set_meal/up", {
    method: "POST",
    data: { id },
  });

export const deleteSetMeal = async (id: number) =>
  await http("catering/provider/set_meal/delete", {
    method: "POST",
    data: { id },
  });

export const getSetMealInfo = async (
  id: number
): Promise<OriginalSetMealInfo> =>
  await http("catering/provider/set_meal/detail", { data: { id } });

export const createSetMeal = async (ticketInfo: CreateSetMealInfo) =>
  await http("catering/provider/set_meal/add", {
    method: "POST",
    data: ticketInfo,
  });

export const editSetMeal = async (ticketInfo: EditSetMealInfo) =>
  await http("catering/provider/set_meal/edit", {
    method: "POST",
    data: ticketInfo,
  });
