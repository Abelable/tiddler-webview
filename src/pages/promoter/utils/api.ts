import { http } from "@/utils/http";

import type { GoodsListItem } from "./type";

export const getGoodsList = async (
  status: number,
  page: number,
  limit = 10
): Promise<GoodsListItem[]> => {
  const { list = [] } =
    (await http("shop/goods/list", {
      data: { status, page, limit },
    })) || {};
  return list;
};
