const CACHE_NAME = "v1";
const CACHEABLE_URLS = [
  "/shanbay",
  "/blogs",
  "/animes",
];


// ------------ 生命周期-install，注册service worker后触发

// 添加要缓存的资源的URL
const addUrlsToCache = async (urls) => {
  // 打开或新建一个Cache对象
  const cache = await caches.open(CACHE_NAME);
  // 往Cache里添加URL
  await cache.addAll(urls);
};

self.addEventListener("install", (event) => {
  console.log("开始安装service worker");
  // 传入waitUntil的promise会阻塞其他事件，可以确保其他生命周期不会在install中途触发
  event.waitUntil(
    addUrlsToCache(CACHEABLE_URLS)
  );
});


// ------------ 生命周期-activate，更新service worker后触发

// 删除旧的缓存，始终确保只有一个key为CACHE_NAME的Cache对象
const deleteOldCaches = async () => {
  const keyList = await caches.keys();
  const oldCaches = keyList.filter((key) => key !== CACHE_NAME);
  await Promise.all(oldCaches.map((cache) => {
    return caches.delete(cache);
  }));
};

self.addEventListener("activate", (event) => {
  console.log("启用新的service worker");
  event.waitUntil(
    deleteOldCaches()
  );
});


// ------------ 运行时事件-fetch，请求资源时触发

const putInCache = async (request, response) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
};

const fetchAndPutCache = async (request) => {
  try {
    const responseFromNetwork = await fetch(request);
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    console.error(`资源${request}请求失败: ${error.message}`);
  }
};

const cacheFirst = async (request) => {
  // 判断资源是否允许被缓存
  if (CACHEABLE_URLS.includes(request.url)) {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      // 在后台请求并更新缓存
      fetchAndPutCache(request);
      // 立即返回缓存
      return responseFromCache;
    }
  }

  // 如果没有缓存，再去请求网络并返回响应
  const responseFromNetwork = await fetchAndPutCache(request);
  if (responseFromNetwork) {
    return responseFromNetwork;
  }
};

self.addEventListener("fetch", (event) => {
  event.respondWith(
    cacheFirst(event.request)
  );
});