import { http } from "@/utils/http";
import { CreateMerchantInfo, MerchantStatusInfo } from "./type";

export const uploadMerchantInfo = async (info: CreateMerchantInfo) =>
  await http("hotel/merchant/settle_in", { method: "POST", data: info });

export const getMerchantStatusInfo = async (): Promise<MerchantStatusInfo> =>
  await http("hotel/merchant/status");

export const payMerchantDeposit = async (orderId: number) =>
  await http("hotel/merchant/pay_deposit", {
    method: "POST",
    data: { orderId },
  });

export const deleteMerchant = async () =>
  await http("hotel/merchant/delete", { method: "POST" });
