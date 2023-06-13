import { http } from "@/utils/http";
import { ProviderScenicSpot, ScenicOption } from "./type";

export const getScenicOptions = async (): Promise<ScenicOption[]> =>
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
