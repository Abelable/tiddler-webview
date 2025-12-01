import type { UploaderFileListItem } from "vant";

export interface GoodsCategoryOption {
  id: number;
  name: string;
  minSalesCommissionRate: number;
  maxSalesCommissionRate: number;
}

export interface GoodsListItem {
  id: number;
  cover: string;
  name: string;
  price: number;
  salesVolume: number;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
}

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

export interface FormSkuItem {
  name: string;
  image: UploaderFileListItem[];
  price: number | undefined;
  originalPrice: number | undefined;
  commissionRate: number | undefined;
  stock: number | undefined;
  limit: number | undefined;
}

export interface FormGoodsInfo {
  categoryIds: number[];
  cover: UploaderFileListItem[];
  video: UploaderFileListItem[];
  imageList: UploaderFileListItem[];
  detailImageList: UploaderFileListItem[];
  defaultSpecImage: UploaderFileListItem[];
  name: string;
  introduction: string;
  price: number | undefined;
  marketPrice: number | undefined;
  salesCommissionRate: number | undefined;
  stock: number | undefined;
  numberLimit: number | undefined;
  specList: SpecItem[];
  skuList: FormSkuItem[];
  deliveryMode: number | undefined;
  freightTemplateId: number | undefined;
  pickupAddressIds: number[];
  refundStatus: boolean;
  refundAddressId: number | undefined;
}
