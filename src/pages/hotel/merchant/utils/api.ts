import { http } from "@/utils/http";
import { cleanObject } from "@/utils";

import type {
  CreateMerchantInfo,
  MerchantInfo,
  MerchantStatusInfo,
} from "./type";

export const uploadMerchantInfo = async (info: Partial<CreateMerchantInfo>) =>
  await http("hotel/merchant/settle_in", {
    method: "POST",
    data: cleanObject(info),
  });

export const getMerchantStatusInfo = async (): Promise<MerchantStatusInfo> =>
  await http("hotel/merchant/status");

export const getMerchantInfo = async (): Promise<MerchantInfo> =>
  await http("hotel/merchant/info");

export const getShopDepositPayParams = async (shopId: number) =>
  await http("hotel/shop/deposit/pay_params", {
    method: "POST",
    data: { shopId },
  });
