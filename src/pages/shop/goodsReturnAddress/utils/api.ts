import { http } from "@/utils/http";
import { cleanObject } from "@/utils/index";

import type { AddressListItem, AddressDetail } from "./type";

export const getAddressList = async (): Promise<AddressListItem[]> =>
  await http("shop/goods_return_address/list");

export const getAddress = async (id: number): Promise<AddressDetail> =>
  await http("shop/goods_return_address/detail", { data: { id } });

export const createAddress = async (
  address: Partial<Omit<AddressDetail, "id">>
) =>
  await http("shop/goods_return_address/add", {
    method: "POST",
    data: cleanObject(address),
  });

export const editAddress = async (address: Partial<AddressDetail>) =>
  await http("shop/goods_return_address/edit", {
    method: "POST",
    data: cleanObject(address),
  });

export const deleteAddress = async (id: number) =>
  await http("shop/goods_return_address/delete", {
    method: "POST",
    data: { id },
  });
