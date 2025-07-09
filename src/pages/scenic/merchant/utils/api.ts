import { http } from "@/utils/http";
import { CreateMerchantInfo, MerchantInfo, MerchantStatusInfo } from "./type";

export const uploadMerchantInfo = async (info: CreateMerchantInfo) =>
  await http("scenic/merchant/settle_in", { method: "POST", data: info });

export const getMerchantStatusInfo = async (): Promise<MerchantStatusInfo> =>
  await http("scenic/merchant/status");

export const getMerchantInfo = async (): Promise<MerchantInfo> =>
  await http("scenic/merchant/info");

export const deleteMerchant = async () =>
  await http("scenic/merchant/delete", { method: "POST" });

export const getShopDepositPayParams = async (shopId: number) =>
  await http("scenic/shop/deposit/pay_params", {
    method: "POST",
    data: { shopId },
  });
