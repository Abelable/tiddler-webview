import { http } from "@/utils/http";

import type { Package } from "./type";

export const delivery = async ({
  shopId,
  orderId,
  isAllDelivered,
  packageList,
}: {
  shopId: number;
  orderId: number;
  isAllDelivered: number;
  packageList: Package[];
}) =>
  await http("shop/order/delivery", {
    method: "POST",
    data: { shopId, orderId, isAllDelivered, packageList },
  });
