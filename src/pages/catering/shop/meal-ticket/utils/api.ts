import { http } from "@/utils/http";
import { cleanObject } from "@/utils/index";

import type { TicketListItem, TicketInfo } from "./type";

export const getTicketTotals = async (shopId: number): Promise<number[]> =>
  await http("catering/shop/meal_ticket/totals", { data: { shopId } });

export const getTicketList = async (
  shopId: number,
  status: number,
  page: number,
  limit = 10
): Promise<TicketListItem[]> => {
  const { list = [] } =
    (await http("catering/shop/meal_ticket/list", {
      data: { shopId, status, page, limit },
    })) || {};
  return list;
};

export const offShelfTicket = async (shopId: number, id: number) =>
  await http("catering/shop/meal_ticket/down", {
    method: "POST",
    data: { shopId, id },
  });

export const onShelfTicket = async (shopId: number, id: number) =>
  await http("catering/shop/meal_ticket/up", {
    method: "POST",
    data: { shopId, id },
  });

export const deleteTicket = async (shopId: number, id: number) =>
  await http("catering/shop/meal_ticket/delete", {
    method: "POST",
    data: { shopId, id },
  });

export const getTicketInfo = async (id: number): Promise<TicketInfo> =>
  await http("catering/meal_ticket/detail", { data: { id } });

export const createTicket = async (
  shopId: number,
  ticketInfo: Partial<Omit<TicketInfo, "id">>
) =>
  await http("catering/shop/meal_ticket/add", {
    method: "POST",
    data: cleanObject({ shopId, ...ticketInfo }),
  });

export const editTicket = async (
  shopId: number,
  ticketInfo: Partial<TicketInfo>
) =>
  await http("catering/shop/meal_ticket/edit", {
    method: "POST",
    data: cleanObject({ shopId, ...ticketInfo }),
  });
