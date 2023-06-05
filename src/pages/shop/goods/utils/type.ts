import type { UploaderFileListItem } from "vant";

export interface GoodsCategoryOption {
  id: number;
  name: string;
}
export interface GoodsListItem {
  id: number;
  image: string;
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

export interface OriginalSkuItem {
  name: string;
  image: string;
  price: number;
  stock: number;
}
export interface OriginalGoodsInfo {
  id: number;
  image: string;
  video: string;
  imageList: string[];
  detailImageList: string[];
  defaultSpecImage: string;
  name: string;
  freightTemplateId: number;
  categoryId: number;
  returnAddressId: number;
  price: number;
  marketPrice: number;
  stock: number;
  salesCommissionRate: number;
  promotionCommissionRate: number;
  specList: SpecItem[];
  skuList: OriginalSkuItem[];
}

export interface SkuItem {
  name: string;
  image: UploaderFileListItem[];
  price: number | undefined;
  stock: number | undefined;
}

export interface GoodsInfo {
  id: number;
  image: UploaderFileListItem[];
  video: UploaderFileListItem[];
  imageList: UploaderFileListItem[];
  detailImageList: UploaderFileListItem[];
  defaultSpecImage: UploaderFileListItem[];
  name: string;
  freightTemplateId: number | undefined;
  categoryId: number | undefined;
  returnAddressId: number | undefined;
  price: number | undefined;
  marketPrice: number | undefined;
  stock: number | undefined;
  salesCommissionRate: number | undefined;
  promotionCommissionRate: number | undefined;
  specList: SpecItem[];
  skuList: SkuItem[];
}

export interface CreateGoodsInfo
  extends Omit<
    GoodsInfo,
    | "id"
    | "image"
    | "video"
    | "imageList"
    | "detailImageList"
    | "defaultSpecImage"
    | "marketPrice"
    | "specList"
    | "skuList"
  > {
  image: string;
  video?: string;
  imageList: string;
  detailImageList: string;
  defaultSpecImage: string;
  marketPrice?: number;
  specList: string;
  skuList: string;
}

export interface EditGoodsInfo extends CreateGoodsInfo {
  id: number;
}
