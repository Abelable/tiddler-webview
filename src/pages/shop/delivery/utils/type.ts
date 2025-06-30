export interface Goods {
  goodsId: number | undefined;
  number: number | undefined;
  selectedSkuName: string;
}

export interface Package {
  shipChannel: string;
  shipCode: string;
  shipSn: string;
  goodsList: Goods[];
}

export interface DeliveryInfo {
  isAllDelivered: number | undefined;
  packageList: Package[];
}
