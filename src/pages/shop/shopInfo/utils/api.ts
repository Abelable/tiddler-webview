import { http } from "@/utils/http";
import type { ShopInfo } from "./type";

export const getShopInfoList = async (): Promise<ShopInfo[]> => {
  return await http("shop/my_shop_info");
};
