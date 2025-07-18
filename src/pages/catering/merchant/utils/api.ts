import { http } from "@/utils/http";
import { cleanObject } from "@/utils";

import type {
  CreateMerchantInfo,
  MerchantInfo,
  MerchantStatusInfo,
} from "./type";

export const uploadMerchantInfo = async (info: Partial<CreateMerchantInfo>) =>
  await http("catering/merchant/settle_in", {
    method: "POST",
    data: cleanObject(info),
  });

export const getMerchantStatusInfo = async (): Promise<MerchantStatusInfo> =>
  await http("catering/merchant/status");

export const getMerchantInfo = async (): Promise<MerchantInfo> =>
  await http("catering/merchant/info");

export const getShopDepositPayParams = async (shopId: number) =>
  await http("catering/shop/deposit/pay_params", {
    method: "POST",
    data: { shopId },
  });
