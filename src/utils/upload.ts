import { showToast } from "vant";
import { getOssConfig } from "./api";

import type { UploaderFileListItem } from "vant";
import type { UploaderAfterRead } from "vant/lib/uploader/types";
import type { OssConfig } from "./api";

export const upload = async (file: File) => {
  let ossConfig: OssConfig;
  if (localStorage.getItem("ossConfig")) {
    ossConfig = JSON.parse(localStorage.getItem("ossConfig") as string);
    if (new Date().getTime() > ossConfig.expire * 1000) {
      ossConfig = await setOssConfig();
    }
  } else {
    ossConfig = await setOssConfig();
  }
  const formData = new FormData();
  const fileName = `${Date.now()}.${file.name.split(".")[1]}`;
  formData.append("key", `${ossConfig.dir}${fileName}`);
  formData.append("success_action_status", "200");
  formData.append("x-oss-object-acl", "public-read");
  formData.append("x-oss-meta-fullname", fileName);
  formData.append("OSSAccessKeyId", ossConfig.accessId);
  formData.append("policy", ossConfig.policy);
  formData.append("signature", ossConfig.signature);
  formData.append("file", file);
  await window
    .fetch(ossConfig.host, {
      method: "POST",
      body: formData,
    })
    .catch(() => {
      showToast("上传失败，请重试");
    });

  return `${ossConfig.host}/${ossConfig.dir}${fileName}`;
};

const setOssConfig = async () => {
  const config = await getOssConfig();
  localStorage.setItem("ossConfig", JSON.stringify(config));
  return config;
};

export const uploadFile = (async (file: UploaderFileListItem) => {
  file.status = "uploading";
  file.message = "上传中...";
  try {
    file.url = await upload(file.file as File);
    file.status = "done";
  } catch (error) {
    file.status = "failed";
    file.message = "上传失败";
  }
}) as UploaderAfterRead;
