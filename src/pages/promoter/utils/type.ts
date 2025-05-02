export interface UserInfo {
  id: number;
  avatar: string;
  nickname: string;
  level: number;
  mobile: string;
  promoterId: number;
  enterpriseInfoId: number;
}

interface Goods {
  cover: string;
  name: string;
  selectedSkuName: string;
  commission: number;
}

export interface Order {
  id: number;
  orderSn: string;
  status: number;
  createdAt: string;
  commission: number;
  commissionBase: number;
  commissionAmount: number;
  goodsList?: Goods[];
  goods?: Goods;
}

export interface Promoter {
  id: number;
  avatar: string;
  nickname: string;
  mobile: string;
  promoterId: number;
  level: number;
  GMV: number;
  createdAt: string;
}

export interface Achievement {
  monthDifference: number;
  beforeLastMonthGMV: number;
  lastMonthGMV: number;
  curMonthGMV: number;
  totalGMV: number;
  percent: number;
}

export interface EnterpriseInfo {
  id?: number;
  status?: number;
  failureReason?: string;
  name: string;
  bankName: string;
  bankCardCode: string;
  bankAddress: string;
  businessLicensePhoto: string;
  idCardFrontPhoto: string;
  idCardBackPhoto: string;
}
