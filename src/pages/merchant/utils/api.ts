import { http } from "@/utils/http";

export interface OssConfig {
  accessId: string;
  host: string;
  policy: string;
  signature: string;
  expire: number;
  callback: string;
  dir: string;
}

export const getOssConfig = async (): Promise<OssConfig> =>
  await http("oss_config");

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
