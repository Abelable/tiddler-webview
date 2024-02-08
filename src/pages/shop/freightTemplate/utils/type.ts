interface AreaRegion {
  label: string;
  value: string;
  areaId: number;
  selected: boolean;
}
export interface RegionOption {
  label: string;
  value: string;
  areaIds: number[];
  allSelected: boolean;
  children: AreaRegion[];
}

export interface SingleExpressOption {
  id: number;
  code: string;
  name: string;
}

export interface ExpressOption extends SingleExpressOption {
  expressId: number;
  selected: boolean;
}

export interface ExpressTemplateOption {
  id: number;
  code: string;
  name: string;
  disabled: boolean;
}

export interface FreightTemplateListItem {
  id: number;
  name: string;
}

interface AreaItem {
  id: number;
  pickedCityCodes: string[];
  pickedCityDescs: string[];
  fee: number | undefined;
}

interface ExpressItem {
  id: number;
  pickedExpressCodes: string[];
  pickedExpressDescs: string[];
  fee: number | undefined;
}

interface ExpressTemplate {
  id: number;
  areaName: string;
  computeMode: number;
  baseFee: number | undefined;
  stepFee: number | undefined;
  singleFee: number | undefined;
  freeQuota: number | undefined;
  pickedCityCodes: string[];
  pickedCityDescs: string[];
}

interface ExpressTemplateList {
  expressCode: string;
  expressName: string;
  list: ExpressTemplate[];
}

export interface FreightTemplate {
  id: number;
  mode: number;
  name: string;
  title: string;
  computeMode: number;
  freeQuota: number;
  areaList: string;
  expressList: string;
  expressTemplateLists: string;
}

export interface FormFreightTemplate {
  mode: number;
  name: string;
  title: string;
  computeMode: number;
  freeQuota: number | undefined;
  areaList: AreaItem[];
  expressList: ExpressItem[];
  expressTemplateLists: ExpressTemplateList[];
}
