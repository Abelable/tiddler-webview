import { http } from "@/utils/http";
import {
  CreateProviderInfo,
  ProviderStatusInfo,
  ProviderScenicSpot,
  ScenicOption,
} from "./type";

export const getScenicOptions = async (): Promise<ScenicOption[]> =>
  await http("scenic/options");

export const uploadProviderInfo = async (info: CreateProviderInfo) =>
  await http("scenic/provider/settle_in", { method: "POST", data: info });

export const getProviderStatusInfo = async (): Promise<ProviderStatusInfo> =>
  await http("scenic/provider/status");

export const payProviderDeposit = async (orderId: number) =>
  await http("scenic/provider/pay_deposit", {
    method: "POST",
    data: { orderId },
  });

export const deleteProvider = async () =>
  await http("scenic/provider/delete", { method: "POST" });

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
