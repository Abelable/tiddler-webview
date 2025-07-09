import type { UploaderFileListItem } from "vant";

export interface GoodsCategoryOption {
  id: number;
  shopCategoryId: number;
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
  cover: string;
  price: number;
  marketPrice: number;
  salesCommissionRate: number;
  stock: number;
  numberLimit: number;
}
export interface GoodsInfo {
  id: number;
  shopCategoryId: number;
  categoryId: number;
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
  refundAddressIds: number[];
}

export interface FormSkuItem {
  name: string;
  cover: UploaderFileListItem[];
  price: number | undefined;
  marketPrice: number | undefined;
  salesCommissionRate: number | undefined;
  stock: number | undefined;
  numberLimit: number | undefined;
}

export interface FormGoodsInfo {
  shopCategoryId: number | undefined;
  categoryId: number | undefined;
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
  refundAddressIds: number[];
}
