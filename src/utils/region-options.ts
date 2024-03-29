import provinces from "china-division/dist/provinces.json";
import cities from "china-division/dist/cities.json";
import areas from "china-division/dist/areas.json";
import _ from "lodash";
import type { RegionOption } from "./type";

interface MatchCity {
  code: string;
  name: string;
  provinceCode: string;
  children?: RegionOption[];
}
interface MatchProvince {
  code: string;
  name: string;
  children?: RegionOption[];
}

export const getRegionOptions = () => {
  areas.forEach((area) => {
    const matchCity: MatchCity = cities.filter(
      (city) => city.code === area.cityCode
    )[0];
    if (matchCity) {
      matchCity.children = matchCity.children || [];
      matchCity.children.push({
        label: area.name,
        value: area.code,
      });
    }
  });

  cities.forEach((city) => {
    const matchProvince: MatchProvince = provinces.filter(
      (province) => province.code === city.provinceCode
    )[0];
    if (matchProvince) {
      matchProvince.children = matchProvince.children || [];
      matchProvince.children.push({
        label: city.name,
        value: city.code,
        children: (city as MatchCity).children,
      });
    }
  });

  const options = provinces.map((province) => ({
    label: province.name,
    value: province.code,
    children: (province as MatchProvince).children,
  }));

  return _.cloneDeep(options);
};

export const getCityRegionOptions = () => {
  const _provinces = _.cloneDeep(provinces);
  cities.forEach((city) => {
    const matchProvince: MatchProvince = _provinces.filter(
      (province: MatchProvince) => province.code === city.provinceCode
    )[0];
    if (matchProvince) {
      matchProvince.children = matchProvince.children || [];
      matchProvince.children.push({
        label: city.name,
        value: city.code,
      });
    }
  });

  const options = _provinces.map((province: MatchProvince) => ({
    label: province.name,
    value: province.code,
    children: province.children,
  }));

  return _.cloneDeep(options);
};
