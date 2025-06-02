import { http } from "@/utils/http";
import type { ShopInfo } from "./type";

export const getShopInfoList = async (
  page: number,
  limit = 10
): Promise<ShopInfo[]> => {
  const { list = [] } = await http("withdraw/record_list", {
    data: { page, limit },
  });
  return list;
};
