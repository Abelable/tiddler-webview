import { http } from "@/utils/http";
import { ProviderInfo, ProviderStatusInfo } from "./type";

export const uploadProviderInfo = async (info: ProviderInfo) =>
  await http("catering/provider/settle_in", { method: "POST", data: info });

export const getProviderStatusInfo = async (): Promise<ProviderStatusInfo> =>
  await http("catering/provider/status");

export const payProviderDeposit = async (orderId: number) =>
  await http("catering/provider/pay_deposit", {
    method: "POST",
    data: { orderId },
  });

export const deleteProvider = async () =>
  await http("catering/provider/delete", { method: "POST" });
