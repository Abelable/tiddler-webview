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
  fee: number;
}

interface ExpressItem {
  id: number;
  pickedExpressCodes: string[];
  pickedExpressDescs: string[];
  fee: number;
}

interface ExpressTemplate {
  id: number;
  areaName: string;
  computeMode: number;
  baseFee?: number;
  stepFee?: number;
  singleFee?: number;
  freeQuota: number;
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
  freeQuota: number;
  areaList: AreaItem[];
  expressList: ExpressItem[];
  expressTemplateLists: ExpressTemplateList[];
}

// export interface FreightTemplate {
//   mode: number;
//   name: string;
//   title: string;
//   computeMode: number;
//   freeQuota: number;
//   areaList: AreaItem[];
//   expressList: ExpressItem[];
//   expressTemplateLists: ExpressTemplateList[];
// }

// export interface ExistFreightTemplate extends FreightTemplate {
//   id: number;
// }

// export interface AddFreightTemplate
//   extends Omit<
//     FreightTemplate,
//     "areaList" | "expressList" | "expressTemplateLists"
//   > {
//   areaList: string;
//   expressList: string;
//   expressTemplateLists: string;
// }

// export interface EditFreightTemplate extends AddFreightTemplate {
//   id: number;
// }
