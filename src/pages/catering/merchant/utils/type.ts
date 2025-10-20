import type { UploaderFileListItem } from "vant";

export interface MerchantInfo {
  type: number;
  companyName?: string;
  businessLicensePhoto?: string;
  hygienicLicensePhoto?: string;
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
  shopType: number;
  deposit: number;
  shopBg: UploaderFileListItem[];
  shopLogo: UploaderFileListItem[];
  shopName: string;
}

export interface CreateMerchantInfo
  extends Omit<MerchantInfo, "shopBg" | "shopLogo"> {
  shopBg?: string;
  shopLogo: string;
  inviterId?: number;
  taskId?: number;
}

export interface MerchantStatusInfo {
  id: number;
  status: number;
  failureReason: string;
  shopId: number;
  deposit: number;
}
