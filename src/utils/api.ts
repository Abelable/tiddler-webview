import { http } from "@/utils/http";
import { cleanObject } from "@/utils/index";

import type { Express, OssConfig } from "./type";

export const getOssConfig = async (): Promise<OssConfig> =>
  await http("oss_config");

export const getExpressOptions = async (name: string): Promise<Express[]> =>
  await http("shop/express_options", { data: cleanObject({ name }) });
