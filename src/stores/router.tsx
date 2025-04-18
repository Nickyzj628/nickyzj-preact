import { createRouter } from "@nanostores/router";
import { ComponentChildren } from "preact";
import { lazy } from "preact/compat";

type Route = {
  id: string;
  title?: string;
  icon?: string;
  accessible: boolean;
  component: () => ComponentChildren;
};

export const ROUTES_VISIBLE_AT_NAVBAR = ["/", "/blogs", "/animes", "/about", "/admin"];

export const routes: Route[] = [
  {
    id: "/",
    title: "主页",
    icon: "icon-[mingcute--home-3-line]",
    accessible: true,
    component: lazy(() => import("@/pages/home")),
  },
  {
    id: "/blogs",
    title: "文章",
    icon: "icon-[mingcute--book-6-line]",
    accessible: true,
    component: lazy(() => import("@/pages/blogs")),
  },
  {
    id: "/blogs/:id",
    accessible: true,
    component: lazy(() => import("@/pages/blog")),
  },
  {
    id: "/animes",
    title: "番剧",
    icon: "icon-[mingcute--tv-2-line]",
    accessible: true,
    component: lazy(() => import("@/pages/animes")),
  },
  {
    id: "/animes/:id",
    accessible: true,
    component: lazy(() => import("@/pages/anime")),
  },
  {
    id: "/about",
    title: "关于",
    icon: "icon-[mingcute--user-3-line]",
    accessible: true,
    component: lazy(() => import("@/pages/about")),
  },
  {
    id: "/admin",
    title: "后台",
    icon: "icon-[mingcute--terminal-box-line]",
    accessible: location.hostname === "localhost",
    component: lazy(() => import("@/pages/admin")),
  },
];

export const $router = createRouter(routes.reduce((obj, route) => {
  obj[route.id] = route.id;
  return obj;
}, {}));