export interface SpecItem {
  name: string;
  options: string[];
}

export interface SkuItem {
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  commissionRate: number;
  stock: number;
  limit: number;
}
export interface GoodsInfo {
  id: number;
  categoryIds: number[];
  cover: string;
  video: string;
  imageList: string[];
  detailImageList: string[];
  defaultSpecImage: string;
  name: string;
  introduction: string;
  price: number;
  marketPrice: number;
  salesCommissionRate: number;
  stock: number;
  numberLimit: number;
  specList: SpecItem[];
  skuList: SkuItem[];
  deliveryMode: number;
  freightTemplateId: number;
  pickupAddressIds: number[];
  refundStatus: 0 | 1;
  refundAddressId: number;
}
