import { http } from "@/utils/http";
import {
  CreateProviderInfo,
  ProviderStatusInfo,
  RestaurantCategoryOption,
} from "./type";

export const uploadProviderInfo = async (info: CreateProviderInfo) =>
  await http("catering/provider/settle_in", { method: "POST", data: info });

export const getRestaurantCategoryOptions = async (): Promise<
  RestaurantCategoryOption[]
> => await http("catering/restaurant/category_options");

export const getProviderStatusInfo = async (): Promise<ProviderStatusInfo> =>
  await http("catering/provider/status");

export const payProviderDeposit = async (orderId: number) =>
  await http("catering/provider/pay_deposit", {
    method: "POST",
    data: { orderId },
  });

export const deleteProvider = async () =>
  await http("catering/provider/delete", { method: "POST" });
