import { http } from "@/utils/http";
import { cleanObject } from "@/utils";

import type { GoodsCategoryOption, GoodsListItem, GoodsInfo } from "./type";

export const getGoodsTotals = async (shopId: number): Promise<number[]> =>
  await http("shop/goods/totals", { data: { shopId } });

export const getGoodsList = async (
  shopId: number,
  status: number,
  page: number,
  limit = 10
): Promise<GoodsListItem[]> => {
  const { list = [] } =
    (await http("shop/goods/list", {
      data: { shopId, status, page, limit },
    })) || {};
  return list;
};

export const getGoodsCategoryOptions = async (): Promise<
  GoodsCategoryOption[]
> => await http("shop/goods/category_options");

export const getGoodsInfo = async (id: number): Promise<GoodsInfo> =>
  await http("shop/goods/info", { data: { id } });

export const offShelfGoods = async (shopId: number, id: number) =>
  await http("shop/goods/down", { method: "POST", data: { shopId, id } });

export const onShelfGoods = async (shopId: number, id: number) =>
  await http("shop/goods/up", { method: "POST", data: { shopId, id } });

export const deleteGoods = async (shopId: number, id: number) =>
  await http("shop/goods/delete", { method: "POST", data: { shopId, id } });

export const createGoods = async (
  shopId: number,
  goodsInfo: Partial<Omit<GoodsInfo, "id">>
) =>
  await http("shop/goods/add", {
    method: "POST",
    data: { shopId, ...cleanObject(goodsInfo) },
  });

export const editGoods = async (
  shopId: number,
  goodsInfo: Partial<GoodsInfo>
) =>
  await http("shop/goods/edit", {
    method: "POST",
    data: { shopId, ...cleanObject(goodsInfo) },
  });
