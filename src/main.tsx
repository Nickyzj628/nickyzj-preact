import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import { render } from "preact";
import Toaster from "./components/Toaster";
import Layout from "./pages/layout";
import "./tailwind.css";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

const App = () => {
  return <>
    <Layout />
    <Toaster />
  </>;
};

render(<App />, document.body);

// 注册service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // 只能注册js文件，ts需要手动编译为js
    navigator.serviceWorker.register("/sw.js", {
      // 能控制的URL范围，默认就是/，即对所有页面生效
      scope: "/",
    })
      .then((registration) => {
        if (registration.installing) {
          console.log("正在安装service worker");
        } else if (registration.waiting) {
          console.log("已安装service worker");
        } else if (registration.active) {
          console.log("正在激活/已激活service worker");
        }
      })
      .catch((error) => {
        console.error(`未能安装service worker: ${error.message}`);
      });
  });
}
