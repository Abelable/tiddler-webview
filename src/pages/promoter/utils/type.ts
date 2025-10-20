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
  id: number;
  cover: string;
  name: string;
  selectedSkuName: string;
  price: number;
  number: number;
}

export interface OrderCommission {
  id: number;
  orderId: number;
  orderSn: string;
  status: number;
  paymentAmount: number;
  productType: number;
  product: Goods;
  createdAt: string;
}

export interface CommissionOrder extends Omit<OrderCommission, "product"> {
  productList: (Goods & { paymentAmount: number })[];
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
