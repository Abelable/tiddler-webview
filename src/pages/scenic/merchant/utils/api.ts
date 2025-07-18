import { http } from "@/utils/http";
import { cleanObject } from "@/utils";

import type {
  CreateMerchantInfo,
  MerchantInfo,
  MerchantStatusInfo,
} from "./type";

export const uploadMerchantInfo = async (info: Partial<CreateMerchantInfo>) =>
  await http("scenic/merchant/settle_in", {
    method: "POST",
    data: cleanObject(info),
  });

export const getMerchantStatusInfo = async (): Promise<MerchantStatusInfo> =>
  await http("scenic/merchant/status");

export const getMerchantInfo = async (): Promise<MerchantInfo> =>
  await http("scenic/merchant/info");

export const getShopDepositPayParams = async (shopId: number) =>
  await http("scenic/shop/deposit/pay_params", {
    method: "POST",
    data: { shopId },
  });
