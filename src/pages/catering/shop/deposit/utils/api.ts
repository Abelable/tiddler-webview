import { http } from "@/utils/http";
import type { Deposit, DepositLog } from "./type";

export const getDepositInfo = async (shopId: number): Promise<Deposit> => {
  return await http("catering/shop/deposit/info", { data: { shopId } });
};

export const getDepositLogList = async (
  shopId: number,
  page: number,
  limit = 10
): Promise<DepositLog[]> => {
  const { list = [] } = await http("catering/shop/deposit/log_list", {
    data: { shopId, page, limit },
  });
  return list;
};
