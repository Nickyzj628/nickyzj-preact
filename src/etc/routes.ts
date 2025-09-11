import { lazy, ReactNode } from "preact/compat";

export type Route = {
    path: string;
    title?: string;
    icon?: string;
    accessible: boolean;
    component: () => ReactNode;
};

export const ROUTES_VISIBLE_AT_NAVBAR = ["/", "/blogs", "/animes", "/about", "/admin"];

export const routes: Route[] = [
    {
        path: "/",
        title: "主页",
        icon: "icon-[mingcute--home-3-line]",
        accessible: true,
        component: lazy(() => import("@/pages/home")),
    },
    {
        path: "/blogs",
        title: "文章",
        icon: "icon-[mingcute--book-6-line]",
        accessible: true,
        component: lazy(() => import("@/pages/blogs")),
    },
    {
        path: "/blogs/:year/:title",
        accessible: true,
        component: lazy(() => import("@/pages/blog")),
    },
    {
        path: "/animes",
        title: "番剧",
        icon: "icon-[mingcute--tv-2-line]",
        accessible: true,
        component: lazy(() => import("@/pages/animes")),
    },
    {
        path: "/animes/:season/:title",
        accessible: true,
        component: lazy(() => import("@/pages/anime")),
    },
    {
        path: "/about",
        title: "关于",
        icon: "icon-[mingcute--user-3-line]",
        accessible: true,
        component: lazy(() => import("@/pages/about")),
    },
    {
        path: "/admin",
        title: "后台",
        icon: "icon-[mingcute--terminal-box-line]",
        accessible: location.hostname === "localhost",
        component: lazy(() => import("@/pages/admin")),
    },
];
