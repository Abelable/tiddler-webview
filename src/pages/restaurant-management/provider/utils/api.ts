import { http } from "@/utils/http";
import {
  CreateProviderInfo,
  ProviderStatusInfo,
  RestaurantCategoryOption,
} from "./type";

export const uploadProviderInfo = async (info: CreateProviderInfo) =>
  await http("restaurant/provider/settle_in", { method: "POST", data: info });

export const getRestaurantCategoryOptions = async (): Promise<
  RestaurantCategoryOption[]
> => await http("restaurant/category_options");

export const getProviderStatusInfo = async (): Promise<ProviderStatusInfo> =>
  await http("restaurant/provider/status");

export const payProviderDeposit = async (orderId: number) =>
  await http("restaurant/provider/pay_deposit", {
    method: "POST",
    data: { orderId },
  });

export const deleteProvider = async () =>
  await http("restaurant/provider/delete", { method: "POST" });
