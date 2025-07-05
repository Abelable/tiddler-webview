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

// commissionAmount
// :
// 0.4
// commissionBase
// :
// 2
// commissionLimit
// :
// 20
// commissionRate
// :
// 0.2
// createdAt
// :
// "2025-07-05T05:31:29.000000Z"
// id
// :
// 2
// orderId
// :
// 11
// orderSn
// :
// "20250705133129172704"
// paymentAmount
// :
// 10
// product
// :
// {id: 2, cover: "https://static.tiddler.cn/tiddler/20250619/1750316117287.jpg",…}
// productType
// :
// 4
// promoterId
// :
// 1
// promoterLevel
// :
// 1
// refundStatus
// :
// 0
// scene
// :
// 1
// status
// :
// 2
// updatedAt
// :
// "2025-07-05T05:32:27.000000Z"
// userId
// :
// 1
// withdrawalId
// :
// 0

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

export interface WithdrawRecord {
  status: number;
  path: number;
  scene: number;
  withdrawAmount: number;
  handlingFee: number;
  taxFee: number;
  actualAmount: number;
  createdAt: string;
}
