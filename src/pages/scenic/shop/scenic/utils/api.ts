import { http } from "@/utils/http";
import { cleanObject } from "@/utils";

import type { ScenicInfo, ShopScenicSpot } from "./type";
import type { ApiOption } from "@/utils/type";

export const getScenicOptions = async (
  shopId: number,
  keywords: string
): Promise<ApiOption[]> =>
  await http("scenic/shop_options", {
    data: cleanObject({ shopId, keywords }),
  });

export const getScenicListTotals = async (shopId: number): Promise<number[]> =>
  await http("scenic/shop/scenic/totals", { data: { shopId } });

export const getShopScenicSpotList = async (
  shopId: number,
  status: number,
  page: number,
  limit = 10
): Promise<ShopScenicSpot[]> => {
  const { list = [] } =
    (await http("scenic/shop/scenic/list", {
      data: { shopId, status, page, limit },
    })) || {};
  return list;
};

export const applyScenicSpot = async (shopId: number, scenicIds: number[]) =>
  await http("scenic/shop/scenic/apply", {
    method: "POST",
    data: { shopId, scenicIds },
  });

export const deleteShopScenicSpot = async (shopId: number, id: number) =>
  await http("scenic/shop/scenic/delete", {
    method: "POST",
    data: { shopId, id },
  });

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
