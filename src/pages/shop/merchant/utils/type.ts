import type { UploaderFileListItem } from "vant";

export interface RegionOption {
  text: string;
  value: string;
  children?: RegionOption[];
}

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
  shopAvatar: UploaderFileListItem[];
  shopName: string;
  shopCategoryId: number;
  shopCover: UploaderFileListItem[];
}

export interface ShopCategoryOption {
  id: number;
  name: string;
}

export interface MerchantStatusInfo {
  id: number;
  type: number;
  status: number;
  failureReason: string;
}
