import { ref } from "vue";
import { showToast } from "vant";
import { getCityRegionOptions } from "@/utils/region-options";

import type { Option } from "@/utils/type";
import type { FormFreightTemplate, RegionOption } from "./type";

export const initialFreightTemplate = {
  name: "",
  title: "",
  computeMode: 1,
  freeQuota: undefined,
  areaList: [],
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

export const checkFreightTemplateInfo = (
  freightTemplate: FormFreightTemplate
) => {
  if (!freightTemplate.name) {
    showToast("请输入模板名称");
    return false;
  }
  if (!freightTemplate.title) {
    showToast("请输入模板标题");
    return false;
  }
  if (!freightTemplate.areaList.length) {
    showToast("请添加配送地区");
    return false;
  }
  if (
    freightTemplate.areaList.findIndex(
      (item) => !item.pickedCityCodes.length || !item.fee
    ) !== -1
  ) {
    showToast("请完善商品规格信息");
    return false;
  }
  return true;
};
