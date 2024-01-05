import { http } from "@/utils/http";

import type { ApiOption } from "@/utils/type";
import type {
  TicketListItem,
  CreateTicketInfo,
  OriginalTicketInfo,
  EditTicketInfo,
} from "./type";

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

export const getTicketInfo = async (id: number): Promise<OriginalTicketInfo> =>
  await http("catering/provider/meal_ticket/detail", { data: { id } });

export const createTicket = async (ticketInfo: CreateTicketInfo) =>
  await http("catering/provider/meal_ticket/add", {
    method: "POST",
    data: ticketInfo,
  });

export const editTicket = async (ticketInfo: EditTicketInfo) =>
  await http("catering/provider/meal_ticket/edit", {
    method: "POST",
    data: ticketInfo,
  });
