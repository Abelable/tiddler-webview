import { ref } from "vue";
import { getScenicOptions } from "@/utils/api";
import { getTicketCategoryOptions } from "./api";

import type { Option } from "@/utils/type";
import type { TicketCategoryOption } from "./type";

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
