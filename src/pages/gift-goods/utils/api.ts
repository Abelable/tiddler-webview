import { http } from "@/utils/http";

import type { GoodsListItem } from "./type";

export const getGoodsList = async (
  type: number,
  page: number,
  limit = 10
): Promise<GoodsListItem[]> => {
  const { list = [] } =
    (await http("gift_goods_list", {
      data: { type, page, limit },
    })) || {};
  return list;
};
