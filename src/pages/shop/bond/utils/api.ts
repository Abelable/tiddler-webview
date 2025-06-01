import { http } from "@/utils/http";
import type { BondChangeRecord } from "./type";

export const getBondChangeRecordList = async (
  page: number,
  limit = 10
): Promise<BondChangeRecord[]> => {
  const { list = [] } = await http("shop/bond/record_list", {
    data: { page, limit },
  });
  return list;
};
