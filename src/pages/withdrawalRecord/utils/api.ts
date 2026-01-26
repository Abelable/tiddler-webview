import { http } from "@/utils/http";
import type {
  CommissionWithdrawRecord,
  RewardWithdrawRecord,
  WithdrawRecord,
} from "./type";

export const getCommissionWithdrawRecordList = async (
  page: number,
  limit = 10
): Promise<CommissionWithdrawRecord[]> => {
  const { list = [] } = await http("withdraw/commission/record_list", {
    data: { page, limit },
  });
  return list;
};

export const getIncomeWithdrawRecordList = async (
  merchantType: number,
  shopId: number,
  page: number,
  limit = 10
): Promise<WithdrawRecord[]> => {
  const { list = [] } = await http("withdraw/income/record_list", {
    data: { merchantType, shopId, page, limit },
  });
  return list;
};

export const getRewardWithdrawRecordList = async (
  page: number,
  limit = 10
): Promise<RewardWithdrawRecord[]> => {
  const { list = [] } = await http("withdraw/reward/record_list", {
    data: { page, limit },
  });
  return list;
};
