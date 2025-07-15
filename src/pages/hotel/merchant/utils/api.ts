import { http } from "@/utils/http";
import { CreateProviderInfo, ProviderStatusInfo } from "./type";

export const uploadProviderInfo = async (info: CreateProviderInfo) =>
  await http("hotel/provider/settle_in", { method: "POST", data: info });

export const getProviderStatusInfo = async (): Promise<ProviderStatusInfo> =>
  await http("hotel/provider/status");

export const payProviderDeposit = async (orderId: number) =>
  await http("hotel/provider/pay_deposit", {
    method: "POST",
    data: { orderId },
  });

export const deleteProvider = async () =>
  await http("hotel/provider/delete", { method: "POST" });
