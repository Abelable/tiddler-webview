import { http } from "@/utils/http";

import type { GoodsInfo } from "./type";

export const getGoodsInfo = async (id: number): Promise<GoodsInfo> =>
  await http("goods/detail", { data: { id } });

export const fastAddCart = async (
  goodsId: number,
  selectedSkuIndex: number,
  number: number
): Promise<GoodsInfo> =>
  await http("cart/fast_add", {
    data: { goodsId, selectedSkuIndex, number },
  });
