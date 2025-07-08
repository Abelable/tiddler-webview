import type { UploaderFileListItem } from "vant";

export interface MerchantInfo {
  companyName: string;
  businessLicensePhoto: string;
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
  shopType: number;
  shopCover: UploaderFileListItem[];
}

export interface CreateMerchantInfo
  extends Omit<MerchantInfo, "shopLogo" | "shopCover"> {
  shopLogo: string;
  shopCover?: string;
}

export interface ShopTypeOption {
  id: number;
  name: string;
}

export interface MerchantStatusInfo {
  id: number;
  deposit: number;
  status: number;
  failureReason: string;
  shopId: number;
}
