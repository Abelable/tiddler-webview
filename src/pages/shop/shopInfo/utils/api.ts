import { http } from "@/utils/http";
import { cleanObject } from "@/utils";
import type { ShopInfo } from "./type";

export const getShopInfo = async (): Promise<ShopInfo> => {
  return await http("shop/my_shop_info");
};

export const updateShopInfo = async (info: Partial<ShopInfo>) =>
  await http("shop/update_info", { method: "POST", data: cleanObject(info) });
