import { http } from "@/utils/http";
import type {
  TicketCategoryOption,
  TicketListItem,
  CreateTicketInfo,
  OriginalTicketInfo,
  EditTicketInfo,
} from "./type";

export const getTicketTotals = async (): Promise<number[]> =>
  await http("scenic/ticket/totals");

export const getTicketList = async (
  status: number,
  page: number,
  limit = 10
): Promise<TicketListItem[]> => {
  const { list = [] } =
    (await http("scenic/ticket/list", {
      data: { status, page, limit },
    })) || {};
  return list;
};

export const getTicketCategoryOptions = async (): Promise<
  TicketCategoryOption[]
> => await http("goods/category_options");

export const offShelfTicket = async (id: number) =>
  await http("scenic/ticket/down", { method: "POST", data: { id } });

export const onShelfTicket = async (id: number) =>
  await http("scenic/ticket/up", { method: "POST", data: { id } });

export const deleteTicket = async (id: number) =>
  await http("scenic/ticket/delete", { method: "POST", data: { id } });

export const getTicketInfo = async (id: number): Promise<OriginalTicketInfo> =>
  await http("scenic/ticket/info", { data: { id } });

export const createTicket = async (goodsInfo: CreateTicketInfo) =>
  await http("scenic/ticket/add", { method: "POST", data: goodsInfo });

export const editTicket = async (goodsInfo: EditTicketInfo) =>
  await http("scenic/ticket/edit", { method: "POST", data: goodsInfo });
