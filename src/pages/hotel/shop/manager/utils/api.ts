import { http } from "@/utils/http";

import type { Manager } from "./type";

export const getManagerList = async (
  shopId: number,
  page: number,
  limit = 10
): Promise<Manager[]> => {
  const { list = [] } =
    (await http("hotel/shop/manager/list", {
      method: "POST",
      data: { shopId, page, limit },
    })) || {};
  return list;
};

export const getManager = async (
  shopId: number,
  id: number
): Promise<Manager> =>
  await http("hotel/shop/manager/detail", { data: { shopId, id } });

export const createManager = async (
  shopId: number,
  userId: number,
  avatar: string,
  nickname: string,
  roleId: number,
  hotelIds: number[]
) =>
  await http("hotel/shop/manager/add", {
    method: "POST",
    data: { shopId, userId, avatar, nickname, roleId, hotelIds },
  });

export const editManager = async (
  shopId: number,
  id: number,
  roleId: number,
  hotelIds: number[]
) =>
  await http("hotel/shop/manager/edit", {
    method: "POST",
    data: { shopId, id, roleId, hotelIds },
  });

export const deleteManager = async (shopId: number, id: number) =>
  await http("shop/manager/delete", {
    method: "POST",
    data: { shopId, id },
  });
