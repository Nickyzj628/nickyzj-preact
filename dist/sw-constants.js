const CACHE_NAME = "v1";

// 要缓存的静态资源
const CACHEABLE_RESOURCES = [
  "/manifest.json",
  "/favicon.webp",
  "/",
  "/blogs",
  "/animes",
  "/about",
  "/assets/index-DsitWQ98.css","/assets/page-DZ6cJoRU.css","/assets/page-TpaSgnBp.css","/assets/Tabs-DyDwee76.css","/assets/index-BAvY3pQe.js","/assets/page-DnIoRPys.js","/assets/page-8qiIzhrp.js","/assets/page-B4yDIHuW.js","/assets/page-CH_Owruv.js","/assets/page-CnCoqoc9.js","/assets/useRequest--8xKAzyh.js","/assets/page-B3SxHoQe.js","/assets/Title-DOLiCoTG.js","/assets/useZoom-BuZnhkvD.js","/assets/Card-CGofTpKP.js","/assets/Image-BKAtRhsX.js","/assets/page-CjagY006.js","/assets/Tabs-GcNR0JzV.js","/assets/error-u1PscWJX.js"
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