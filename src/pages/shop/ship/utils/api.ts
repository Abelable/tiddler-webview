import { http } from "@/utils/http";

import type { Goods, Package } from "./type";

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
  orderId: number,
  isAllDelivered: number,
  packageList: Package[]
) =>
  await http("shop/order/ship", {
    method: "POST",
    data: { shopId, orderId, isAllDelivered, packageList },
  });
