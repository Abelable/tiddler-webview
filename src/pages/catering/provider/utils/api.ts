import { http } from "@/utils/http";
import {
  CreateProviderInfo,
  ProviderStatusInfo,
  RestaurantCategoryOption,
} from "./type";

export const uploadProviderInfo = async (info: CreateProviderInfo) =>
  await http("food/provider/settle_in", { method: "POST", data: info });

export const getRestaurantCategoryOptions = async (): Promise<
  RestaurantCategoryOption[]
> => await http("food/restaurant/category_options");

export const getProviderStatusInfo = async (): Promise<ProviderStatusInfo> =>
  await http("food/provider/status");

export const payProviderDeposit = async (orderId: number) =>
  await http("food/provider/pay_deposit", {
    method: "POST",
    data: { orderId },
  });

export const deleteProvider = async () =>
  await http("food/provider/delete", { method: "POST" });
