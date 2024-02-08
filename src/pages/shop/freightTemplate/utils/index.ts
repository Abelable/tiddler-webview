import { ref } from "vue";
import { getCityRegionOptions } from "@/utils/region-options";
import { getExpressOptions } from "./api";

import type { Option } from "@/utils/type";
import type {
  ExpressOption,
  ExpressTemplateOption,
  RegionOption,
} from "./type";

export const initialFreightTemplate = {
  mode: 1,
  name: "",
  title: "",
  computeMode: 1,
  freeQuota: undefined,
  areaList: [],
  expressList: [],
  expressTemplateLists: [],
};

export const regionOptions = ref<RegionOption[]>([]);
export const setRegionOptions = () => {
  regionOptions.value = getCityRegionOptions().map((item: Option) => ({
    ...item,
    children: item.children?.map((_item) => ({
      ..._item,
      areaId: 0,
      selected: false,
    })),
    areaIds: [],
    allSelected: false,
  }));
};

export const expressOptions = ref<ExpressOption[]>([]);
export const setExpressOptions = async () => {
  const options = await getExpressOptions();
  expressOptions.value = options.map((item) => ({
    ...item,
    expressId: 0,
    selected: false,
  }));
};

export const expressTemplateOptions = ref<ExpressTemplateOption[]>([]);
export const setExpressTemplateOptions = async () => {
  const options = await getExpressOptions();
  expressTemplateOptions.value = options.map((item) => ({
    ...item,
    disabled: false,
  }));
};
