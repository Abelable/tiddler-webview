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

export interface FreightTemplateListItem {
  id: number;
  name: string;
}

interface FormAreaItem {
  id: number;
  pickedCityCodes: string[];
  pickedCityDescs: string[];
  fee: number | undefined;
}

interface AreaItem {
  id: number;
  pickedCityCodes: string;
  pickedCityDescs: string;
  fee: number;
}

export interface FormFreightTemplate {
  name: string;
  title: string;
  computeMode: number;
  freeQuota: number | undefined;
  areaList: FormAreaItem[];
}

export interface FreightTemplate {
  id: number;
  name: string;
  title: string;
  computeMode: number;
  freeQuota: number;
  areaList: AreaItem[];
}
