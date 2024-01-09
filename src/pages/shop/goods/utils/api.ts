import { http } from "@/utils/http";
import { cleanObject } from "@/utils";

import type { GoodsCategoryOption, GoodsListItem, GoodsInfo } from "./type";

export const getGoodsTotals = async (): Promise<number[]> =>
  await http("shop/goods/totals");

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

export const getGoodsCategoryOptions = async (): Promise<
  GoodsCategoryOption[]
> => await http("shop/goods/category_options");

export const offShelfGoods = async (id: number) =>
  await http("shop/goods/down", { method: "POST", data: { id } });

export const onShelfGoods = async (id: number) =>
  await http("shop/goods/up", { method: "POST", data: { id } });

export const deleteGoods = async (id: number) =>
  await http("shop/goods/delete", { method: "POST", data: { id } });

export const getGoodsInfo = async (id: number): Promise<GoodsInfo> =>
  await http("shop/goods/info", { data: { id } });

export const createGoods = async (goodsInfo: Partial<Omit<GoodsInfo, "id">>) =>
  await http("shop/goods/add", {
    method: "POST",
    data: cleanObject(goodsInfo),
  });

export const editGoods = async (goodsInfo: Partial<GoodsInfo>) =>
  await http("shop/goods/edit", {
    method: "POST",
    data: cleanObject(goodsInfo),
  });
