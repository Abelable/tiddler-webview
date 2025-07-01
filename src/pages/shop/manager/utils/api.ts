import { http } from "@/utils/http";
import { cleanObject } from "@/utils/index";

import type { Manager } from "./type";

export const getManagerList = async (shopId: number): Promise<Manager[]> =>
  await http("shop/manager/list", { data: { shopId } });

export const getManager = async (id: number): Promise<Manager> =>
  await http("shop/manager/detail", { data: { id } });

export const createManager = async (
  shopId: number,
  managerInfo: Partial<Omit<Manager, "id">>
) =>
  await http("shop/manager/add", {
    method: "POST",
    data: { shopId, ...cleanObject(managerInfo) },
  });

export const editManager = async (managerInfo: Partial<Manager>) =>
  await http("shop/manager/edit", {
    method: "POST",
    data: cleanObject(managerInfo),
  });

export const deleteManager = async (id: number) =>
  await http("shop/manager/delete", {
    method: "POST",
    data: { id },
  });
