import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import { render } from "preact";
import Layout from "./components/layout/index.js";
import Toaster from "./components/toaster";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

export const App = () => {
  return (
    <>
      <Layout />
      <Toaster />
    </>
  );
};

render(<App />, document.body);