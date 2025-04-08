import { http } from "@/utils/http";
import { cleanObject } from "@/utils/index";

import type { AddressListItem, AddressDetail } from "./type";

export const getAddressList = async (
  shopId: number
): Promise<AddressListItem[]> =>
  await http("shop/refund_address/list", { data: { shopId } });

export const getAddress = async (id: number): Promise<AddressDetail> =>
  await http("shop/refund_address/detail", { data: { id } });

export const createAddress = async (
  address: Partial<Omit<AddressDetail, "id">>
) =>
  await http("shop/refund_address/add", {
    method: "POST",
    data: cleanObject(address),
  });

export const editAddress = async (address: Partial<AddressDetail>) =>
  await http("shop/refund_address/edit", {
    method: "POST",
    data: cleanObject(address),
  });

export const deleteAddress = async (id: number) =>
  await http("shop/refund_address/delete", {
    method: "POST",
    data: { id },
  });
