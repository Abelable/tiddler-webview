import { http } from "@/utils/http";

import type { Manager } from "./type";

export const getManagerList = async (shopId: number): Promise<Manager[]> =>
  await http("scenic/shop/manager/list", { data: { shopId } });

export const getManager = async (
  shopId: number,
  id: number
): Promise<Manager> =>
  await http("scenic/shop/manager/detail", { data: { shopId, id } });

export const createManager = async (
  shopId: number,
  userId: number,
  avatar: string,
  nickname: string,
  roleId: number,
  scenicIds: number[]
) =>
  await http("scenic/shop/manager/add", {
    method: "POST",
    data: { shopId, userId, avatar, nickname, roleId, scenicIds },
  });

export const editManager = async (
  shopId: number,
  id: number,
  roleId: number,
  scenicIds: number[]
) =>
  await http("scenic/shop/manager/edit", {
    method: "POST",
    data: { shopId, id, roleId, scenicIds },
  });

export const deleteManager = async (shopId: number, id: number) =>
  await http("shop/manager/delete", {
    method: "POST",
    data: { shopId, id },
  });
