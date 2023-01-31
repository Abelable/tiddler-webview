import { http } from "@/utils/http";
import type {
  SingleExpressOption,
  FreightTemplateListItem,
  ExistFreightTemplate,
  AddFreightTemplate,
  EditFreightTemplate,
} from "./type";

export const getExpressOptions = async (): Promise<SingleExpressOption[]> =>
  await http("shop/express_options");

export const getFreightTemplateList = async (): Promise<
  FreightTemplateListItem[]
> => await http("shop/freight_template/list");

export const getFreightTemplate = async (
  id: number
): Promise<ExistFreightTemplate> =>
  await http("shop/freight_template/detail", { data: { id } });

export const createFreightTemplate = async (
  freightTemplate: AddFreightTemplate
) =>
  await http("shop/freight_template/add", {
    method: "POST",
    data: freightTemplate,
  });

export const editFreightTemplate = async (
  freightTemplate: EditFreightTemplate
) =>
  await http("shop/freight_template/edit", {
    method: "POST",
    data: freightTemplate,
  });

export const deleteFreightTemplate = async (id: number) =>
  await http("shop/freight_template/delete", { method: "POST", data: { id } });
