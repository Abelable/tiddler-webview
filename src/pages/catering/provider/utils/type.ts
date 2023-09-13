export interface RegionOption {
  text: string;
  value: string;
  children?: RegionOption[];
}

export interface ProviderInfo {
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
}

export interface ProviderStatusInfo {
  id: number;
  type: number;
  status: number;
  failureReason: string;
  orderId: number;
}
