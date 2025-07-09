import { http } from "@/utils/http";
import type { WithdrawRecord } from "./type";

export const getWithdrawRecordList = async (
  page: number,
  limit = 10
): Promise<WithdrawRecord[]> => {
  const { list = [] } = await http("shop/income/withdraw/record_list", {
    data: { page, limit },
  });
  return list;
};
