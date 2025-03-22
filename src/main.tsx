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