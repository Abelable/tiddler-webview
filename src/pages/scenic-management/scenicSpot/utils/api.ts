import { http } from "@/utils/http";

import type { OriginalScenicInfo, ProviderScenicSpot } from "./type";
import type { Option } from "@/utils/type";

export const getScenicOptions = async (): Promise<Option[]> =>
  await http("scenic/options");

export const getScenicListTotals = async (): Promise<number[]> =>
  await http("scenic/provider/scenic_list_totals");

export const getProviderScenicSpotList = async (
  status: number,
  page: number,
  limit = 10
): Promise<ProviderScenicSpot[]> => {
  const { list = [] } =
    (await http("scenic/provider/scenic_list", {
      data: { status, page, limit },
    })) || {};
  return list;
};

export const applyScenicSpot = async (scenicId: number) =>
  await http("scenic/provider/apply_scenic", {
    method: "POST",
    data: { scenicId },
  });

export const deleteProviderScenicSpot = async (id: number) =>
  await http("scenic/provider/delete_scenic", { method: "POST", data: { id } });

export const getScenicCategoryOptions = async (): Promise<Option[]> =>
  await http("scenic/category_options");

export const getScenicInfo = async (id: number): Promise<OriginalScenicInfo> =>
  await http("scenic/detail", { data: { id } });

export const createScenic = async (
  restaurantInfo: Partial<OriginalScenicInfo>
) =>
  await http("scenic/add", {
    method: "POST",
    data: restaurantInfo,
  });

export const editScenic = async (restaurantInfo: Partial<OriginalScenicInfo>) =>
  await http("scenic/edit", {
    method: "POST",
    data: restaurantInfo,
  });
