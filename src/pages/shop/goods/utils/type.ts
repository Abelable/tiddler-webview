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

export interface SkuItem {
  name: string;
  image: string;
  price: number;
  stock: number;
}

export interface GoodsInfo {
  id: number;
  video: UploaderFileListItem[];
  imageList: UploaderFileListItem[];
  name: string;
  freightTemplateId: number | undefined;
  categoryId: number | undefined;
  returnAddressId: number | undefined;
  price: number | undefined;
  marketPrice: number | undefined;
  stock: number | undefined;
  commissionRate: number | undefined;
  detailImageList: UploaderFileListItem[];
  specList: SpecItem[];
  skuList: SkuItem[];
}

export interface CreateGoodsInfo
  extends Omit<
    GoodsInfo,
    | "id"
    | "video"
    | "marketPrice"
    | "imageList"
    | "detailImageList"
    | "specList"
    | "skuList"
  > {
  video?: string;
  marketPrice?: number;
  imageList: string;
  detailImageList: string;
  specList: string;
  skuList: string;
}

export interface EditGoodsInfo extends CreateGoodsInfo {
  id: number;
}
