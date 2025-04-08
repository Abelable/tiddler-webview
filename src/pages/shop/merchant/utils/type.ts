import type { UploaderFileListItem } from "vant";

export interface MerchantInfo {
  type: number;
  deposit: number;
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
  shopLogo: UploaderFileListItem[];
  shopName: string;
  shopCategoryIds: number[];
  shopCover: UploaderFileListItem[];
}

export interface CreateMerchantInfo
  extends Omit<MerchantInfo, "shopLogo" | "shopCover"> {
  shopLogo: string;
  shopCover?: string;
}

export interface ShopCategoryOption {
  id: number;
  name: string;
  deposit: number;
  adaptedMerchantTypes: number[];
}

export interface MerchantStatusInfo {
  id: number;
  deposit: number;
  status: number;
  failureReason: string;
  orderId: number;
}
