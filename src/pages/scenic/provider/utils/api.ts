import { http } from "@/utils/http";
import {
  CreateProviderInfo,
  ProviderStatusInfo,
  ProviderScenicSpot,
} from "./type";

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

export const getProviderScenicSpotList = async (): Promise<
  ProviderScenicSpot[]
> => await http("scenic/provider/scenic_list");

export const deleteProviderScenicSpot = async (id: number) =>
  await http("scenic/provider/delete_scenic", { method: "POST", data: { id } });
