import { JSX, lazy } from "preact/compat";
import { BookIcon, HomeIcon, TerminalIcon, TvIcon, UserIcon } from "./assets/icons";

type Route = {
  path: string;
  title?: string;
  icon?: any;
  component: () => JSX.Element;
  canAccess: boolean;
}

const routes: Route[] = [
  {
    path: "/",
    title: "主页",
    icon: HomeIcon,
    component: lazy(() => import("./pages/page")),
    canAccess: true,
  },
  {
    path: "/blogs",
    title: "文章",
    icon: BookIcon,
    component: lazy(() => import("./pages/blogs/page")),
    canAccess: true,
  },
  {
    path: "/blogs/:id",
    component: lazy(() => import("./pages/blogs/[id]/page")),
    canAccess: true,
  },
  {
    path: "/animes",
    title: "番剧",
    icon: TvIcon,
    component: lazy(() => import("./pages/animes/page")),
    canAccess: true,
  },
  {
    path: "/animes/:id",
    component: lazy(() => import("./pages/animes/[id]/page")),
    canAccess: true,
  },
  {
    path: "/about",
    title: "关于",
    icon: UserIcon,
    component: lazy(() => import("./pages/about/page")),
    canAccess: true,
  },
  {
    path: "/admin",
    title: "后台",
    icon: TerminalIcon,
    component: lazy(() => import("./pages/admin/page")),
    canAccess: location.hostname === "localhost",
  },
  {
    path: "*",
    component: lazy(() => import("./pages/error")),
    canAccess: true,
  },
];

export default routes;