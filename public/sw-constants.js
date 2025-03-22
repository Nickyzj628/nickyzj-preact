const CACHE_NAME = "v1";

// 要缓存的静态资源
const CACHEABLE_RESOURCES = [
  "/manifest.json",
  "/favicon.webp",
  "/",
  "/blogs",
  "/animes",
  "/about",
  // __VITE_ASSETS__
].map((url) => `${location.origin}${url}`);

// 要缓存的接口数据
const CACHEABLE_APIS = [
  "/shanbay",
  "/blogs",
  "/blogs?page=1",
  "/animes",
  "/animes?page=1",
].map((url) => `${location.protocol}//${location.hostname}:3030${url}`);

const CACHEABLE_URLS = [
  ...CACHEABLE_APIS,
  ...CACHEABLE_RESOURCES,
];