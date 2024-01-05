export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    if (isVoid(result[key])) delete result[key];
  });
  return result;
};

export const weekDayOptions = [
  { text: "周一", value: 1 },
  { text: "周二", value: 2 },
  { text: "周三", value: 3 },
  { text: "周四", value: 4 },
  { text: "周五", value: 5 },
  { text: "周六", value: 6 },
  { text: "周日", value: 7 },
];

export const monthOptions = [
  { value: 1, text: "1月" },
  { value: 2, text: "2月" },
  { value: 3, text: "3月" },
  { value: 4, text: "4月" },
  { value: 5, text: "5月" },
  { value: 6, text: "6月" },
  { value: 7, text: "7月" },
  { value: 8, text: "8月" },
  { value: 9, text: "9月" },
  { value: 10, text: "10月" },
  { value: 11, text: "11月" },
  { value: 12, text: "12月" },
];
