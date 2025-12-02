import { http } from "@/utils/http";

import type { FormPackage, Goods } from "./type";

export const getUnshippedGoodsList = async (
  shopId: number,
  orderId: number
): Promise<Goods[]> => {
  return await http("shop/order/unshipped_goods_list", {
    data: { shopId, orderId },
  });
};

export const ship = async (
  shopId: number,
  id: number,
  isAllDelivered: number,
  packageList: FormPackage[]
) =>
  await http("shop/order/ship", {
    method: "POST",
    data: { shopId, id, isAllDelivered, packageList },
  });
