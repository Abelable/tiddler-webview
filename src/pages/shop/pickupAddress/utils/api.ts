import { http } from "@/utils/http";
import { cleanObject } from "@/utils/index";

import type { PickupAddressItem, PickupAddress } from "./type";

export const getAddressList = async (
  shopId: number
): Promise<PickupAddressItem[]> =>
  await http("shop/pickup_address/list", { data: { shopId } });

export const getAddress = async (id: number): Promise<PickupAddress> =>
  await http("shop/pickup_address/detail", { data: { id } });

export const createAddress = async (
  address: Partial<Omit<PickupAddress, "id">>
) =>
  await http("shop/pickup_address/add", {
    method: "POST",
    data: cleanObject(address),
  });

export const editAddress = async (address: Partial<PickupAddress>) =>
  await http("shop/pickup_address/edit", {
    method: "POST",
    data: cleanObject(address),
  });

export const deleteAddress = async (id: number) =>
  await http("shop/pickup_address/delete", {
    method: "POST",
    data: { id },
  });
