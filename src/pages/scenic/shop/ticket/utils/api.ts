import { http } from "@/utils/http";
import { cleanObject } from "@/utils/index";

import type { ApiOption } from "@/utils/type";
import type { TicketListItem, TicketInfo } from "./type";

export const getScenicOptions = async (shopId: number): Promise<ApiOption[]> =>
  await http("scenic/shop/scenic/options", { data: { shopId } });

export const getTicketTotals = async (shopId: number): Promise<number[]> =>
  await http("scenic/shop/ticket/totals", { data: { shopId } });

export const getTicketList = async (
  shopId: number,
  status: number,
  page: number,
  limit = 10
): Promise<TicketListItem[]> => {
  const { list = [] } =
    (await http("scenic/shop/ticket/list", {
      data: { shopId, status, page, limit },
    })) || {};
  return list;
};

export const getTicketCategoryOptions = async (): Promise<ApiOption[]> =>
  await http("scenic/ticket/category_options");

export const offShelfTicket = async (shopId: number, id: number) =>
  await http("scenic/shop/ticket/down", {
    method: "POST",
    data: { shopId, id },
  });

export const onShelfTicket = async (shopId: number, id: number) =>
  await http("scenic/shop/ticket/up", { method: "POST", data: { shopId, id } });

export const deleteTicket = async (shopId: number, id: number) =>
  await http("scenic/shop/ticket/delete", {
    method: "POST",
    data: { shopId, id },
  });

export const getTicketInfo = async (id: number): Promise<TicketInfo> =>
  await http("scenic/ticket/detail", { data: { id } });

export const createTicket = async (
  shopId: number,
  ticketInfo: Partial<Omit<TicketInfo, "id">>
) =>
  await http("scenic/shop/ticket/add", {
    method: "POST",
    data: cleanObject({ shopId, ...ticketInfo }),
  });

export const editTicket = async (
  shopId: number,
  ticketInfo: Partial<TicketInfo>
) =>
  await http("scenic/shop/ticket/edit", {
    method: "POST",
    data: cleanObject({ shopId, ...ticketInfo }),
  });
