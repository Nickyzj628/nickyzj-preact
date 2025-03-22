// ------------ 同步导入其他JS文件，会阻塞后续代码

self.importScripts(
  "sw-constants.js",
  "sw-utils.js"
);

// ------------ 生命周期-install，注册service worker后触发，一般用来做预缓存

self.addEventListener("install", (event) => {
  console.log("开始安装service worker");
  // waitUntil可以阻塞其他生命周期事件
  event.waitUntil(
    // 预缓存资源
    addUrlsToCache(CACHEABLE_URLS).then(() => {
      // 立即启用最新的service worker代码，不必等待所有旧sw代码的页面关闭
      self.skipWaiting();
    })
  );
});


// ------------ 生命周期-activate，service worker代码更新后触发，一般用来移除旧缓存

self.addEventListener("activate", (event) => {
  console.log("启用新的service worker");
  event.waitUntil(
    // 清除旧缓存
    deleteOldCaches()
  );
});


// ------------ 运行时事件-fetch，请求资源时触发

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const canCache = CACHEABLE_URLS.includes(request.url);
  event.respondWith(
    canCache ? cacheFirst(request) : fetch(request)
  );
});