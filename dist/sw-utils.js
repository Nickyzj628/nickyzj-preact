/**
 * 预缓存资源
 * @param {string} urls 待缓存的资源URL
 */
const addUrlsToCache = async (urls) => {
  // 打开/新建一个Cache对象
  const cache = await caches.open(CACHE_NAME);
  // 批量请求+缓存资源
  await cache.addAll(urls);
};

/**
 * 删除所有旧缓存
 */
const deleteOldCaches = async () => {
  const keyList = await caches.keys();
  const oldCaches = keyList.filter((key) => key !== CACHE_NAME);
  await Promise.all(oldCaches.map((cache) => {
    console.log(`删除旧的缓存 ${cache}`);
    return caches.delete(cache);
  }));
};

const fetchAndPutCache = async (request) => {
  // 如果用户断网，则不发出请求
  if (!navigator.onLine) {
    return new Response(JSON.stringify({
      statusCode: 503,
      message: `资源 ${request.url} 请求失败: 网络连接中断`,
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const response = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response.clone());
    console.log(`成功在后台更新缓存 ${request.url}`);
    // 返回的response必须是未被消费过的，否则会报错
    // The FetchEvent for "http://localhost:4173/assets/index-DsitWQ98.css" resulted in a network error response: a Response whose "body" is locked cannot be used to respond to a request.
    return response;
  } catch (error) {
    console.error(`资源 ${request.url} 请求失败: ${error.message}`);
  }
};

/**
 * 优先使用缓存，并在后台重新请求+更新缓存。如果请求不在缓存白名单中，该函数就只是个fetch()
 * @param {RequestInfo | URL} request
 * @returns {Response}
 */
const cacheFirst = async (request) => {
  // 判断资源在缓存里
  const response = await caches.match(request, {
    // 是否忽略查询字符串
    ignoreSearch: false,
    // 是否忽略请求方法，默认只允许GET和HEAD
    ignoreMethod: true,
    // 是否忽略Vary响应头，默认会匹配缓存响应头的vary和请求头对应字段，例如响应里有vary:Origin，就会去匹配请求头的Origin
    ignoreVary: true,
  });
  if (response) {
    console.log(`资源 ${request.url} 命中缓存`);
    // 在后台重新请求+更新缓存
    fetchAndPutCache(request);
    // 立即返回缓存
    return response;
  }

  // 如果还没有缓存，就做一次fetch
  console.log(`资源 ${request.url} 还未进入缓存，发送请求`);
  // 如果没有匹配到缓存，列出所有缓存键
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();
  console.log("已缓存的资源", keys.map((req) => req.url));
  return await fetchAndPutCache(request);
};