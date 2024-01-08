import { http } from "@/utils/http";

import type { ApiOption } from "@/utils/type";
import type { TicketListItem, TicketInfo } from "./type";
import { cleanObject } from "@/utils/index";

export const getRestaurantOptions = async (): Promise<ApiOption[]> =>
  await http("catering/provider/restaurant/options");

export const getTicketTotals = async (): Promise<number[]> =>
  await http("catering/provider/meal_ticket/totals");

export const getTicketList = async (
  status: number,
  page: number,
  limit = 10
): Promise<TicketListItem[]> => {
  const { list = [] } =
    (await http("catering/provider/meal_ticket/list", {
      data: { status, page, limit },
    })) || {};
  return list;
};

export const offShelfTicket = async (id: number) =>
  await http("catering/provider/meal_ticket/down", {
    method: "POST",
    data: { id },
  });

export const onShelfTicket = async (id: number) =>
  await http("catering/provider/meal_ticket/up", {
    method: "POST",
    data: { id },
  });

export const deleteTicket = async (id: number) =>
  await http("catering/provider/meal_ticket/delete", {
    method: "POST",
    data: { id },
  });

export const getTicketInfo = async (id: number): Promise<TicketInfo> =>
  await http("catering/provider/meal_ticket/detail", { data: { id } });

export const createTicket = async (
  ticketInfo: Partial<Omit<TicketInfo, "id">>
) =>
  await http("catering/provider/meal_ticket/add", {
    method: "POST",
    data: cleanObject(ticketInfo),
  });

export const editTicket = async (ticketInfo: Partial<TicketInfo>) =>
  await http("catering/provider/meal_ticket/edit", {
    method: "POST",
    data: cleanObject(ticketInfo),
  });
