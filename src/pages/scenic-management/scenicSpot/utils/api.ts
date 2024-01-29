import { http } from "@/utils/http";
import { cleanObject } from "@/utils";

import type { ScenicInfo, ProviderScenicSpot } from "./type";
import type { ApiOption } from "@/utils/type";

export const getScenicOptions = async (): Promise<ApiOption[]> =>
  await http("scenic/provider_options");

export const getScenicListTotals = async (): Promise<number[]> =>
  await http("scenic/provider/scenic/totals");

export const getProviderScenicSpotList = async (
  status: number,
  page: number,
  limit = 10
): Promise<ProviderScenicSpot[]> => {
  const { list = [] } =
    (await http("scenic/provider/scenic/list", {
      data: { status, page, limit },
    })) || {};
  return list;
};

export const applyScenicSpot = async (scenicIds: number[]) =>
  await http("scenic/provider/scenic/apply", {
    method: "POST",
    data: { scenicIds },
  });

export const deleteProviderScenicSpot = async (id: number) =>
  await http("scenic/provider/scenic/delete", { method: "POST", data: { id } });

export const getScenicCategoryOptions = async (): Promise<ApiOption[]> =>
  await http("scenic/category_options");

export const getScenicInfo = async (id: number): Promise<ScenicInfo> =>
  await http("scenic/detail", { data: { id } });

export const createScenic = async (
  scenicInfo: Partial<Omit<ScenicInfo, "id">>
) =>
  await http("scenic/add", {
    method: "POST",
    data: cleanObject(scenicInfo),
  });

export const editScenic = async (scenicInfo: Partial<ScenicInfo>) =>
  await http("scenic/edit", {
    method: "POST",
    data: cleanObject(scenicInfo),
  });
