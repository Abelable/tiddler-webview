import { http } from "@/utils/http";
import type { GoodsListItem } from "./type";

export const getGoodsList = async (
  status: number,
  page: number,
  limit = 10
): Promise<{ total: number; list: GoodsListItem[] }> =>
  await http("shop/goods/list", {
    data: { status, page, limit },
  });

export const offShelfGoods = async (id: number) =>
  await http("shop/goods/down", { method: "POST", data: { id } });

export const onShelfGoods = async (id: number) =>
  await http("shop/goods/up", { method: "POST", data: { id } });

export const deleteGoods = async (id: number) =>
  await http("shop/goods/delete", { method: "POST", data: { id } });
