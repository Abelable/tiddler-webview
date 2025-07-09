import { http } from "@/utils/http";
import type {
  CreateMerchantInfo,
  MerchantInfo,
  MerchantStatusInfo,
  ShopCategoryOption,
} from "./type";

export const uploadMerchantInfo = async (info: CreateMerchantInfo) =>
  await http("merchant/settle_in", { method: "POST", data: info });

export const getMerchantStatusInfo = async (): Promise<MerchantStatusInfo> =>
  await http("merchant/status");

export const getMerchantInfo = async (): Promise<MerchantInfo> =>
  await http("merchant/info");

export const deleteMerchant = async () =>
  await http("merchant/delete", { method: "POST" });

export const getShopDepositPayParams = async (shopId: number) =>
  await http("shop/deposit/pay_params", {
    method: "POST",
    data: { shopId },
  });

export const getShopCategoryOptions = async (): Promise<ShopCategoryOption[]> =>
  await http("shop/category_options");
