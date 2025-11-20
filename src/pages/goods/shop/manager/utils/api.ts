import { http } from "@/utils/http";

import type { Manager } from "./type";

export const getManagerList = async (
  shopId: number,
  page: number,
  limit = 10
): Promise<Manager[]> => {
  const { list = [] } =
    (await http("shop/manager/list", {
      method: "POST",
      data: { shopId, page, limit },
    })) || {};
  return list;
};

export const getManager = async (
  id: number,
  shopId: number
): Promise<Manager> =>
  await http("shop/manager/detail", { data: { id, shopId } });

export const createManager = async (
  shopId: number,
  userId: number,
  roleId: number
) =>
  await http("shop/manager/add", {
    method: "POST",
    data: { shopId, userId, roleId },
  });

export const editManager = async (
  id: number,
  shopId: number,
  userId: number,
  roleId: number
) =>
  await http("shop/manager/edit", {
    method: "POST",
    data: { id, shopId, userId, roleId },
  });

export const deleteManager = async (id: number, shopId: number) =>
  await http("shop/manager/delete", {
    method: "POST",
    data: { id, shopId },
  });
