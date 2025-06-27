import { http } from "@/utils/http";
import type { FreightTemplateListItem, FreightTemplate } from "./type";
import { cleanObject } from "@/utils";

export const getFreightTemplateList = async (
  shopId: number
): Promise<FreightTemplateListItem[]> =>
  await http("shop/freight_template/list", { data: { shopId } });

export const getFreightTemplate = async (
  id: number
): Promise<FreightTemplate> =>
  await http("shop/freight_template/detail", { data: { id } });

export const createFreightTemplate = async (
  shopId: number,
  freightTemplate: Omit<FreightTemplate, "id">
) =>
  await http("shop/freight_template/add", {
    method: "POST",
    data: { shopId, ...cleanObject(freightTemplate) },
  });

export const editFreightTemplate = async (
  freightTemplate: Partial<FreightTemplate>
) =>
  await http("shop/freight_template/edit", {
    method: "POST",
    data: cleanObject(freightTemplate),
  });

export const deleteFreightTemplate = async (id: number) =>
  await http("shop/freight_template/delete", { method: "POST", data: { id } });
