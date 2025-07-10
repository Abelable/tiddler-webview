import { http } from "@/utils/http";
import { cleanObject } from "@/utils/index";

import type { ApiOption } from "@/utils/type";
import type { TicketListItem, TicketInfo } from "./type";

export const getScenicOptions = async (): Promise<ApiOption[]> =>
  await http("scenic/shop/scenic/options");

export const getTicketTotals = async (): Promise<number[]> =>
  await http("scenic/shop/ticket/totals");

export const getTicketList = async (
  status: number,
  page: number,
  limit = 10
): Promise<TicketListItem[]> => {
  const { list = [] } =
    (await http("scenic/shop/ticket/list", {
      data: { status, page, limit },
    })) || {};
  return list;
};

export const getTicketCategoryOptions = async (): Promise<ApiOption[]> =>
  await http("scenic/ticket/category_options");

export const offShelfTicket = async (id: number) =>
  await http("scenic/shop/ticket/down", { method: "POST", data: { id } });

export const onShelfTicket = async (id: number) =>
  await http("scenic/shop/ticket/up", { method: "POST", data: { id } });

export const deleteTicket = async (id: number) =>
  await http("scenic/shop/ticket/delete", { method: "POST", data: { id } });

export const getTicketInfo = async (id: number): Promise<TicketInfo> =>
  await http("scenic/shop/ticket/detail", { data: { id } });

export const createTicket = async (
  ticketInfo: Partial<Omit<TicketInfo, "id">>
) =>
  await http("scenic/shop/ticket/add", {
    method: "POST",
    data: cleanObject(ticketInfo),
  });

export const editTicket = async (ticketInfo: Partial<TicketInfo>) =>
  await http("scenic/shop/ticket/edit", {
    method: "POST",
    data: cleanObject(ticketInfo),
  });
