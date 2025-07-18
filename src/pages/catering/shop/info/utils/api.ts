import { http } from "@/utils/http";
import { cleanObject } from "@/utils";
import type { ShopInfo } from "./type";

export const getShopInfo = async (id: number): Promise<ShopInfo> => {
  return await http("catering/shop/info", { data: { id } });
};

export const updateShopInfo = async (info: Partial<ShopInfo>) =>
  await http("catering/shop/update_info", {
    method: "POST",
    data: cleanObject(info),
  });
