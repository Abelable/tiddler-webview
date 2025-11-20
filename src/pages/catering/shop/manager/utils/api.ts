import { http } from "@/utils/http";

import type { Manager } from "./type";

export const getManagerList = async (
  shopId: number,
  page: number,
  limit = 10
): Promise<Manager[]> => {
  const { list = [] } =
    (await http("catering/shop/manager/list", {
      method: "POST",
      data: { shopId, page, limit },
    })) || {};
  return list;
};

export const getManager = async (
  shopId: number,
  id: number
): Promise<Manager> =>
  await http("catering/shop/manager/detail", { data: { shopId, id } });

export const createManager = async (
  shopId: number,
  userId: number,
  avatar: string,
  nickname: string,
  roleId: number,
  restaurantIds: number[]
) =>
  await http("catering/shop/manager/add", {
    method: "POST",
    data: { shopId, userId, avatar, nickname, roleId, restaurantIds },
  });

export const editManager = async (
  shopId: number,
  id: number,
  roleId: number,
  restaurantIds: number[]
) =>
  await http("catering/shop/manager/edit", {
    method: "POST",
    data: { shopId, id, roleId, restaurantIds },
  });

export const deleteManager = async (shopId: number, id: number) =>
  await http("shop/manager/delete", {
    method: "POST",
    data: { shopId, id },
  });
