import { http } from "@/utils/http";

export interface MerchantInfo {
  type: number;
  companyName?: string;
  businessLicensePhoto?: string;
  regionList: string;
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

export const uploadMerchantInfo = async (info: MerchantInfo) =>
  await http("shop/merchant/settle_in", { method: "POST", data: info });

export interface ShopCategoryOption {
  id: number;
  name: string;
}

export const getShopCategoryOptions = async (): Promise<ShopCategoryOption[]> =>
  await http("shop/category_options");

export interface MerchantStatusInfo {
  id: number;
  type: number;
  status: number;
  failureReason: string;
}

export const getMerchantStatusInfo = async (): Promise<MerchantStatusInfo> =>
  await http("shop/merchant/status");
