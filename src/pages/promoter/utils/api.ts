import { http } from "@/utils/http";
import type {
  UserInfo,
  OrderCommission,
  Achievement,
  EnterpriseInfo,
  WithdrawRecord,
} from "./type";

export const getUserInfo = async (): Promise<UserInfo> =>
  await http("user/info");

export const getPromoterAchievement = async (): Promise<Achievement> =>
  await http("commission/achievement");

export const getCommissionOrderList = async (
  timeType: number,
  scene: number,
  page: number,
  limit = 10
): Promise<OrderCommission[]> => {
  const { list = [] } = await http("commission/order_list", {
    method: "POST",
    data: { timeType, scene, statusList: [2, 3, 4], page, limit },
  });
  return list;
};

export const getEnterpriseInfo = async (): Promise<EnterpriseInfo> =>
  await http("enterprise_info/detail");

export const addEnterpriseInfo = async (
  enterpriseInfo: Partial<EnterpriseInfo>
) =>
  await http("enterprise_info/add", {
    method: "POST",
    data: enterpriseInfo,
  });

export const editEnterpriseInfo = async (
  enterpriseInfo: Partial<EnterpriseInfo>
) =>
  await http("enterprise_info/edit", {
    method: "POST",
    data: enterpriseInfo,
  });

export const getWithdrawRecordList = async (
  page: number,
  limit = 10
): Promise<WithdrawRecord[]> => {
  const { list = [] } = await http("commission/withdraw/record_list", {
    data: { page, limit },
  });
  return list;
};
