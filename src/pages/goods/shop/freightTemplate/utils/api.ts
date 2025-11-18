import { http } from "@/utils/http";
import type { FreightTemplateListItem, FreightTemplate } from "./type";
import { cleanObject } from "@/utils";

export const getFreightTemplateList = async (
  shopId: number,
  page: number,
  limit = 10
): Promise<FreightTemplateListItem[]> => {
  const { list = [] } =
    (await http("shop/freight_template/list", {
      method: "POST",
      data: { shopId, page, limit },
    })) || {};
  return list;
};

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

export const getFreightTemplateOptions = async (
  shopId: number
): Promise<FreightTemplateListItem[]> =>
  await http("shop/freight_template/options", {
    data: { shopId },
  });
