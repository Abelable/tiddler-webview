import { http } from "@/utils/http";

export interface OssConfig {
  accessId: string;
  host: string;
  policy: string;
  signature: string;
  expire: number;
  callback: string;
  dir: string;
}

export const getOssConfig = async (): Promise<OssConfig> =>
  await http("oss_config");
