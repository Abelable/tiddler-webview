import { http } from "@/utils/http";
import { cleanObject } from "@/utils/index";

import type { RefundAddressItem, AddressDetail } from "./type";

export const getRefundAddressList = async (
  shopId: number
): Promise<RefundAddressItem[]> =>
  await http("shop/refund_address/list", { method: "POST", data: { shopId } });

export const getAddress = async (id: number): Promise<AddressDetail> =>
  await http("shop/refund_address/detail", { data: { id } });

export const createAddress = async (
  shopId: number,
  address: Partial<Omit<AddressDetail, "id">>
) =>
  await http("shop/refund_address/add", {
    method: "POST",
    data: { shopId, ...cleanObject(address) },
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
