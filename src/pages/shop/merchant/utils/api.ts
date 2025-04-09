import { http } from "@/utils/http";
import {
  CreateMerchantInfo,
  MerchantStatusInfo,
  ShopCategoryOption,
} from "./type";

export const uploadMerchantInfo = async (info: CreateMerchantInfo) =>
  await http("shop/merchant/settle_in", { method: "POST", data: info });

export const getShopCategoryOptions = async (): Promise<ShopCategoryOption[]> =>
  await http("shop/category_options");

export const getMerchantStatusInfo = async (): Promise<MerchantStatusInfo> =>
  await http("shop/merchant/status");

export const payMerchantDeposit = async (shopId: number) =>
  await http("shop/merchant/pay_deposit", {
    method: "POST",
    data: { shopId },
  });

export const deleteMerchant = async () =>
  await http("shop/merchant/delete", { method: "POST" });
