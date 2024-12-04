import type { UploaderFileListItem } from "vant";

export interface GoodsCategoryOption {
  id: number;
  shopCategoryId: number;
  name: string;
  minSalesCommissionRate: number;
  maxSalesCommissionRate: number;
  minPromotionCommissionRate: number;
  maxPromotionCommissionRate: number;
}

export interface GoodsListItem {
  id: number;
  cover: string;
  name: string;
  price: number;
  marketPrice: number;
  salesVolume: number;
}

export interface SpecItem {
  name: string;
  options: string[];
}

export interface SkuItem {
  name: string;
  cover: string;
  price: number;
  stock: number;
}
export interface GoodsInfo {
  id: number;
  cover: string;
  video: string;
  imageList: string[];
  detailImageList: string[];
  defaultSpecImage: string;
  name: string;
  freightTemplateId: number;
  shopCategoryId: number;
  categoryId: number;
  returnAddressId: number;
  price: number;
  marketPrice: number;
  stock: number;
  salesCommissionRate: number;
  promotionCommissionRate: number;
  specList: SpecItem[];
  skuList: SkuItem[];
}

export interface FormSkuItem {
  name: string;
  cover: UploaderFileListItem[];
  price: number | undefined;
  stock: number | undefined;
}

export interface FormGoodsInfo {
  cover: UploaderFileListItem[];
  video: UploaderFileListItem[];
  imageList: UploaderFileListItem[];
  detailImageList: UploaderFileListItem[];
  defaultSpecImage: UploaderFileListItem[];
  name: string;
  freightTemplateId: number | undefined;
  shopCategoryId: number | undefined;
  categoryId: number | undefined;
  returnAddressId: number | undefined;
  price: number | undefined;
  marketPrice: number | undefined;
  stock: number | undefined;
  salesCommissionRate: number | undefined;
  promotionCommissionRate: number | undefined;
  specList: SpecItem[];
  skuList: FormSkuItem[];
}
