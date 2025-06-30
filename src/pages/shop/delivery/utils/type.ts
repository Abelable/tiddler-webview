export interface Goods {
  goodsId: number | undefined;
  cover: string;
  name: string;
  selectedSkuName: string;
  number: number | undefined;
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
