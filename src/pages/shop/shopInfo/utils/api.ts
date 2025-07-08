import { http } from "@/utils/http";
import { cleanObject } from "@/utils";
import type { ShopInfo } from "./type";

export const getShopInfo = async (id: number): Promise<ShopInfo> => {
  return await http("shop/info", { data: { id } });
};

export const updateShopInfo = async (info: Partial<ShopInfo>) =>
  await http("shop/update_info", { method: "POST", data: cleanObject(info) });
