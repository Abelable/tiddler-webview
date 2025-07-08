import { http } from "@/utils/http";
import { CreateMerchantInfo, MerchantStatusInfo } from "./type";

export const uploadMerchantInfo = async (info: CreateMerchantInfo) =>
  await http("scenic/merchant/settle_in", { method: "POST", data: info });

export const getMerchantStatusInfo = async (): Promise<MerchantStatusInfo> =>
  await http("scenic/merchant/status");

export const getShopDepositPayParams = async (shopId: number) =>
  await http("scenic/shop/deposit/pay_params", {
    method: "POST",
    data: { shopId },
  });

export const deleteMerchant = async () =>
  await http("scenic/merchant/delete", { method: "POST" });
