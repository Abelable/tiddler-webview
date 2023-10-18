import { http } from "@/utils/http";
import { AuthInfo } from "./type";

export const getAuthInfo = async (): Promise<AuthInfo> =>
  await http("user/auth_info/get");

export const uploadAuthInfo = async (authInfo: Partial<AuthInfo>) =>
  await http("user/auth_info/add", {
    method: "POST",
    data: authInfo,
  });
