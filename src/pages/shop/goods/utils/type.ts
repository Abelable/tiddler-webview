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
  video: string;
  imageList: string[];
  name: string;
  freightTemplateId: number;
  categoryId: number;
  returnAddressId: number;
  price: number;
  marketPrice: number;
  stock: number;
  commissionRate: number;
  detailImageList: string[];
  specList: SpecItem[];
}

export interface CreateGoodsInfo
  extends Omit<GoodsInfo, "id" | "imageList" | "detailImageList" | "specList"> {
  imageList: string;
  detailImageList: string;
  specList: string;
  skuList: string;
}

export interface EditGoodsInfo extends CreateGoodsInfo {
  id: number;
}
