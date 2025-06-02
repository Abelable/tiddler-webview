import { http } from "@/utils/http";
import { cleanObject } from "@/utils/index";

import type { Staff } from "./type";

export const getStaffList = async (shopId: number): Promise<Staff[]> =>
  await http("shop/staff/list", { data: { shopId } });

export const getStaff = async (id: number): Promise<Staff> =>
  await http("shop/staff/detail", { data: { id } });

export const createStaff = async (
  shopId: number,
  address: Partial<Omit<Staff, "id">>
) =>
  await http("shop/staff/add", {
    method: "POST",
    data: { shopId, ...cleanObject(address) },
  });

export const editStaff = async (address: Partial<Staff>) =>
  await http("shop/staff/edit", {
    method: "POST",
    data: cleanObject(address),
  });

export const deleteStaff = async (id: number) =>
  await http("shop/staff/delete", {
    method: "POST",
    data: { id },
  });
