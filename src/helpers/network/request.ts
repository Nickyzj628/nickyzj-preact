import { BACKEND_PORT, BASE_URL } from "@/constants";

/** 向`nickyzj.run:3030{path}`发送请求，path以“/”开头 */
export const request = async <T>(path: string, options: Recordable = {}) => {
  if (typeof options.body === "object" && !(options.body instanceof FormData)) {
    options.body = JSON.stringify(options.body);
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    }
  }

  const port = options.port ?? BACKEND_PORT;
  const response = await fetch(`${BASE_URL}:${port}${path}`, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  if (data.statusCode !== 200) {
    throw new Error(data.message);
  }

  return data as T;
};