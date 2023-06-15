import { ref } from "vue";
import { getScenicOptions } from "@/utils/api";
import { getTicketCategoryOptions } from "./api";

import type { Option } from "@/utils/type";
import type { TicketCategoryOption } from "./type";

export const typeOptions = [
  { text: "单景点门票", value: 1 },
  { text: "多景点联票", value: 2 },
];
export const refundStatusOptions = [
  { text: "随时可退", value: 1 },
  { text: "有条件退", value: 2 },
  { text: "不可退", value: 3 },
];

export const scenicOptions = ref<Option[]>([]);
export const categoryOptions = ref<TicketCategoryOption[]>([]);

export const setCategoryOptions = async () => {
  const options = await getTicketCategoryOptions();
  categoryOptions.value = options.map((item) => ({
    ...item,
    disabled: false,
  }));
};
export const setScenicOptions = async () =>
  (scenicOptions.value = await getScenicOptions());
