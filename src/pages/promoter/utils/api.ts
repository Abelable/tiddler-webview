import { http } from "@/utils/http";
import { cleanObject } from "@/utils";
import type {
  UserInfo,
  CommissionSumInfo,
  PromoterData,
  CommissionCashInfo,
  CommissionTimeData,
  Order,
  Promoter,
  Achievement,
  EnterpriseInfo,
} from "./type";

export const getUserInfo = async (): Promise<UserInfo> =>
  await http("user/info");

export const getCommissionSumInfo = async (): Promise<CommissionSumInfo> =>
  await http("gift_commission/sum");

export const getCommissionCashInfo = async (): Promise<CommissionCashInfo> =>
  await http("gift_commission/cash");

export const getGiftCommissionTimeData = async (
  timeType: number
): Promise<CommissionTimeData> =>
  await http("gift_commission/time_data", { data: { timeType } });

export const getTeamCommissionTimeData = async (
  timeType: number
): Promise<CommissionTimeData> =>
  await http("team_commission/time_data", { data: { timeType } });

export const getGiftOrderList = async (
  timeType: number,
  page: number,
  limit = 10
): Promise<Order[]> => {
  const { list = [] } = await http("order/gift_commission_list", {
    data: { timeType, page, limit },
  });
  return list;
};

export const getTeamOrderList = async (
  timeType: number,
  statusList: number[],
  page: number,
  limit = 10
): Promise<Order[]> => {
  const { list = [] } = await http("order/team_commission_list", {
    method: "POST",
    data: { timeType, statusList, page, limit },
  });
  return list;
};

export const getPromoterAchievement = async (): Promise<Achievement> =>
  await http("commission/achievement");

export const getPromoterData = async (): Promise<PromoterData> =>
  await http("user/promoter_data");

export const getTodayNewPromoterList = async (): Promise<Promoter[]> =>
  await http("user/today_new_promoter_list");

export const getTodayOrderingPromoterList = async (): Promise<Promoter[]> =>
  await http("user/today_ordering_promoter_list");

export const getPromoterList = async ({
  keywords,
  page,
  limit,
}: {
  keywords: string;
  page: number;
  limit: number;
}): Promise<Promoter[]> => {
  const { list = [] } = await http("user/promoter_list", {
    data: cleanObject({ keywords, page, limit }),
  });
  return list;
};

export const getCommissionOrderList = async (
  timeType: number,
  page: number,
  limit = 10
): Promise<Order[]> => {
  const { list = [] } = await http("order/commission_list", {
    method: "POST",
    data: { timeType, statusList: [2, 3], page, limit },
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
