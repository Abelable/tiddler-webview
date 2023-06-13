import { http } from "@/utils/http";
import type { OssConfig, Option } from "./type";

export const getOssConfig = async (): Promise<OssConfig> =>
  await http("oss_config");

export const getScenicOptions = async (): Promise<Option[]> =>
  await http("scenic/options");
