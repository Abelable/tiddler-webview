import { http } from "@/utils/http";
import { AuthInfo } from "./type";

export const getAuthInfo = async (): Promise<AuthInfo> =>
  await http("auth_info/detail");

export const addAuthInfo = async (authInfo: Partial<AuthInfo>) =>
  await http("auth_info/add", {
    method: "POST",
    data: authInfo,
  });

export const editAuthInfo = async (authInfo: Partial<AuthInfo>) =>
  await http("auth_info/edit", {
    method: "POST",
    data: authInfo,
  });
