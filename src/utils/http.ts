import qs from "qs";

const baseUrl = process.env.VUE_APP_BASE_URL;
const version = process.env.VUE_APP_VERSION;

interface Config extends RequestInit {
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, headers, ...customConfig }: Config = {}
) => {
  const token = localStorage.getItem("token") || "";
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/x-www-form-urlencoded" : "",
      ...headers,
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = qs.stringify(data || {});
  }

  return window
    .fetch(`${baseUrl}/api/${version}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok && data.code === 0) return data.data;
      else return Promise.reject(data);
    });
};
