import { http } from "@/utils/http";
import { cleanObject } from "@/utils/index";

import type { Express, OssConfig, User } from "./type";

export const getOssConfig = async (): Promise<OssConfig> =>
  await http("oss_config");

export const getExpressOptions = async (name: string): Promise<Express[]> =>
  await http("shop/express_options", { data: cleanObject({ name }) });

export const getUserOptions = async (nickname: string): Promise<User[]> =>
  await http("user/options", { data: cleanObject({ nickname }) });
