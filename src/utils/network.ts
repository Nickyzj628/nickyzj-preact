import { toast } from "@/components/Toaster";

export const BASE_URL = `${location.protocol}//${location.hostname}`;

/** 对象转字符串，如果传入第二个值为`true`，会在前面加上“?” */
export const queryToString = (query: Recordable = {}, isAddPrefix = false) => {
  const result = Object.entries(query).map((item) => item.join("=")).join("&");
  if (!result) return "";
  if (isAddPrefix) return "?" + result;
  return result;
};

/** 字符串转对象 */
export const stringToQuery = (string: string) => {
  const searchParams = new URLSearchParams(string);
  const result: Recordable = {};
  for (let [key, value] of searchParams) {
    if (!isNaN(Number(value))) {
      result[key] = Number(value);
    }
    else {
      result[key] = value;
    }
  }
  return result;
};

/** 向`nickyzj.run:3030{path}`发送请求，path以“/”开头 */
export const request = async <T>(path: string, options: Recordable = {}) => {
  if (typeof options.body === "object" && !(options.body instanceof FormData)) {
    options.body = JSON.stringify(options.body);
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    }
  }

  const response = await fetch(`${BASE_URL}:3030${path}`, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  if (data.statusCode !== 200) {
    throw new Error(data.message);
  }

  return data as T;
};

/** 从`nickyzj.run:2020/Photos{path}`获取图片，path以“/”开头 */
export const getImage = (path: string) => {
  return `${BASE_URL}:2020/d/Nickyzj/Photos/${path}`;
};

/** 从`nickyzj.run:2020/Nickyzj/Animes/{...anime}/{ep}`获取番剧播放地址 */
export const getAnimeVideo = (anime?: Anime, ep = 1) => {
  if (!anime?.episodes) return;
  return `${BASE_URL}:2020/d/Nickyzj/Animes/${anime.cate}/${anime.title}/${anime.episodes[ep - 1]}`;
};

/** 获取文章列表 */
export const getBlogs = async (options: Recordable = {}) => {
  return await request<BlogsResp>(`/blogs${queryToString(options, true)}`);
};

/** 获取番剧详情 */
export const getAnimes = async (options: Recordable = {}) => {
  return await request<AnimesResp>(`/animes${queryToString(options, true)}`);
};

export const setBlog = async (blog: Partial<Blog>) => {
  if (!blog.id) return toast.warning("请传入文章id");
  return await request<Resp>(`/blogs/${blog.id}`, {
    method: "PUT",
    body: blog,
  });
};

export const uploadBanner = async (path: string, formData: FormData) => {
  return await request<Resp>(path, {
    body: formData,
  });
};