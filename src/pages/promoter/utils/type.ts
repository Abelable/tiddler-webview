export interface UserInfo {
  id: number;
  avatar: string;
  nickname: string;
  level: number;
  mobile: string;
  promoterId: number;
  enterpriseInfoId: number;
}

export interface CommissionSumInfo {
  cashAmount: number;
  pendingAmount: number;
  settledAmount: number;
}

export interface CommissionCashInfo {
  share: number;
  team: number;
}

export interface CommissionTimeData {
  orderCount: number;
  salesVolume: number;
  pendingAmount: number;
  settledAmount: number;
}

interface Coods {
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
  goodsList?: Coods[];
  goods?: Coods;
}

export interface PromoterData {
  todayNewCount: number;
  todayOrderingCount: number;
  totalCount: number;
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
  beforeLastMonthGMV: number;
  lastMonthGMV: number;
  curMonthGMV: number;
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
