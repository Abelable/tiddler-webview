import { http } from "@/utils/http";

export interface ExpressOption {
  id: number;
  code: string;
  name: string;
}

export interface FreightTemplateListItem {
  id: number;
  name: string;
}

interface FreightTemplateUpload {
  mode: number;
  name: string;
  title: string;
  computeMode: number;
  freeQuota: number;
  areaList: string;
  expressList: string;
  expressTemplateLists: string;
}

export const getExpressOptions = async (): Promise<ExpressOption[]> =>
  await http("shop/express_options");

export const getFreightTemplateList = async (
  page = 1,
  limit = 10
): Promise<FreightTemplateListItem[]> => {
  const { list = [] } =
    (await http("shop/freight_template/list", { data: { page, limit } })) || {};
  return list;
};

export const createFreightTemplate = async (
  freightTemplate: FreightTemplateUpload
) =>
  await http("shop/freight_template/add", {
    method: "POST",
    data: freightTemplate,
  });
