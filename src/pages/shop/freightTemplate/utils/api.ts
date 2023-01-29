import { http } from "@/utils/http";

export interface MerchantInfo {
  type: number;
  companyName?: string;
  businessLicensePhoto?: string;
  regionDesc: string;
  regionCodeList: string;
  addressDetail: string;
  name: string;
  mobile: string;
  email: string;
  idCardNumber: string;
  idCardFrontPhoto: string;
  idCardBackPhoto: string;
  holdIdCardPhoto: string;
  bankCardOwnerName: string;
  bankCardNumber: string;
  bankName: string;
  shopName: string;
  shopCategoryId: number;
}

export interface ExpressOption {
  id: number;
  code: string;
  name: string;
}

export const uploadMerchantInfo = async (info: MerchantInfo) =>
  await http("shop/merchant/settle_in", { method: "POST", data: info });

export interface ShopCategoryOption {
  id: number;
  name: string;
}

export const getExpressOptions = async (): Promise<ExpressOption[]> =>
  await http("shop/express_options");

export interface MerchantStatusInfo {
  id: number;
  type: number;
  status: number;
  failureReason: string;
}

export const getMerchantStatusInfo = async (): Promise<MerchantStatusInfo> =>
  await http("shop/merchant/status");

export const payMerchantDeposit = async (orderId: number) =>
  await http("shop/merchant/pay_deposit", {
    method: "POST",
    data: { orderId },
  });

export const deleteMerchant = async () =>
  await http("shop/merchant/delete", { method: "POST" });
