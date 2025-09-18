import "@/assets/tailwind.css";
import { routes, ROUTES_VISIBLE_AT_NAVBAR } from "@/etc/routes";
import { clsx } from "@/helpers/string";
import { throttle } from "@/helpers/time";
import { useIsMobile } from "@/hooks/device";
import useUser from "@/hooks/store/use-user";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import { render } from "preact";
import { Suspense } from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import { toast, ToastType, useToaster } from "react-hot-toast/headless";
import { Link, Route, Switch } from "wouter-preact";
import Alert, { AlertType } from "./components/alert";
import Avatar from "./components/avatar";
import Loading from "./components/loading";
import Toggle from "./components/toggle";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

const Header = () => {
    /**
     * 顶栏滚动自动收起
     */

    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    useEffect(() => {
        let prevScrollY = 0;
        const onScroll = throttle(() => {
            setIsHeaderVisible(window.scrollY < prevScrollY);
            prevScrollY = window.scrollY;
        }, 150);
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    /**
     * 移动端点击拉起路由表
     */

    const isMobile = useIsMobile();
    const [isNavVisible, setIsNavVisible] = useState(false);

    /**
     * 用户相关
     */

    const [user] = useUser();

    const onClickMessage = () => {
        toast("消息模块开发中！");
    };

    const onClickUser = () => {
        toast("用户模块开发中！");
    };

    return (
        <header
            className={clsx(
                "bento sticky z-30 flex items-center justify-between py-2 transition-all",
                isHeaderVisible ? "top-0" : "-top-20"
            )}
        >
            {/* logo@pc */}
            {!isMobile && (
                <Link
                    href="/"
                    className="flex items-center gap-1.5"
                >
                    <img
                        src="/favicon.webp"
                        alt="LOGO"
                        className="size-12"
                    />
                    <span className="text-xl tracking-wide transition dark:text-neutral-200">
                        NICKYZJ
                    </span>
                </Link>
            )}
            {/* nav@mobile */}
            {isMobile && (
                <div className="relative">
                    <Toggle
                        className="relative z-10"
                        value={isNavVisible}
                        onChange={setIsNavVisible}
                    />
                    <div
                        className={clsx(
                            "fixed top-0 left-0 size-full bg-black/30 transition-all",
                            !isNavVisible && "invisible opacity-0 pointer-events-none"
                        )}
                    />
                    <div
                        className={clsx(
                            "absolute left-0 flex flex-col gap-3 w-10 transition-all",
                            isNavVisible ? "top-16" : "invisible opacity-0 top-0 pointer-events-none"
                        )}
                    >
                        {routes
                            .filter((route) => ROUTES_VISIBLE_AT_NAVBAR.includes(route.path) && route.accessible)
                            .map((route) => (
                                <Link
                                    key={route.path}
                                    href={route.path}
                                    className={(active) => clsx("button", active && "opacity-60")}
                                    onClick={() => setIsNavVisible(false)}
                                >
                                    <span className={clsx(route.icon, "size-5")} />
                                </Link>
                            ))
                        }
                    </div>
                </div>
            )}
            {/* user */}
            <div className="flex items-center gap-6">
                <button onClick={onClickMessage}>
                    <div className="icon-[mingcute--notification-line] size-5" />
                </button>
                <div className="divider" />
                <button className="gap-1.5 p-0 bg-transparent hover:bg-transparent" onClick={onClickUser}>
                    {!isMobile && user.name}
                    <Avatar size="xl" />
                </button>
            </div>
        </header>
    );
};

const Aside = () => {
    const isMobile = useIsMobile();

    // 手动切换侧边栏
    const [isAsideFold, setIsAsideFold] = useState(Boolean(localStorage.getItem("isAsideFold")));
    useEffect(() => {
        localStorage.setItem("isAsideFold", isAsideFold ? "1" : "");
    }, [isAsideFold]);

    // 手动切换深色模式
    const [isDark, setIsDark] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);
    useEffect(() => {
        document.documentElement.className = isDark ? "dark" : "";
    }, [isDark]);

    // 自动切换深色模式
    useEffect(() => {
        window.matchMedia("(prefers-color-scheme: dark)").onchange = (e) => {
            setIsDark(e.matches);
        };
    }, []);

    if (isMobile) {
        return null;
    }

    return (
        <aside
            className={clsx(
                "bento flex flex-col justify-between w-16 rounded-xl transition-all",
                !isAsideFold && "lg:w-36 xl:w-44",
            )}
        >
            {/* routes */}
            <nav
                className={clsx(
                    "sticky top-3 flex flex-col gap-2.5",
                    !isAsideFold && "lg:gap-3.5",
                )}
            >
                {routes
                    .filter((route) => ROUTES_VISIBLE_AT_NAVBAR.includes(route.path) && route.accessible)
                    .map((route) => (
                        <Link
                            key={route.path}
                            href={route.path}
                            className={(active) => clsx(
                                "button gap-1.5 whitespace-nowrap",
                                !isAsideFold && "lg:rounded-xl",
                                active ? "active" : "opacity-50 bg-transparent hover:opacity-100 hover:bg-neutral-200 dark:hover:bg-neutral-700",
                            )}
                        >
                            <div className={clsx(route.icon, "shrink-0 size-5", !isAsideFold && "lg:size-6")} />
                            <span className={clsx("hidden", !isAsideFold && "lg:inline")}>
                                {route.title}
                            </span>
                        </Link>
                    ))}
            </nav>
            {/* gadgets */}
            <div className="sticky bottom-3 flex flex-wrap gap-3">
                <button
                    className={clsx("hidden lg:inline-flex", isAsideFold && "rotate-180")}
                    onClick={() => setIsAsideFold(!isAsideFold)}
                >
                    <span className="icon-[mingcute--align-arrow-left-line] size-5" />
                </button>
                <button onClick={() => setIsDark(!isDark)}>
                    <span className={clsx(isDark ? "icon-[mingcute--sun-line]" : "icon-[mingcute--moon-line]", "size-5")} />
                </button>
            </div>
        </aside>
    );
};

const Router = () => {
    return (
        <Switch>
            {routes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    component={route.component}
                />
            ))}
        </Switch>
    );
};

const Footer = () => {
    return (
        <footer className="bento flex justify-center gap-1 text-sm text-neutral-400 transition dark:text-neutral-500">
            由
            <a href="https://preactjs.com/" target="_blank" className="transition-none">Preact</a>
            和
            <a href="https://tailwindcss.com/" target="_blank" className="transition-none">Tailwind CSS</a>
            驱动
        </footer>
    );
};

const Toaster = () => {
    const { toasts, handlers } = useToaster();
    const { startPause, endPause, calculateOffset, updateHeight } = handlers;

    const toastAlertTypeMap: Record<ToastType, AlertType> = {
        success: "success",
        error: "danger",
        loading: "info",
        blank: "info",
        custom: "info",
    };

    return (
        <div
            className="fixed right-3 bottom-3 z-50 w-64"
            onMouseEnter={startPause}
            onMouseLeave={endPause}
        >
            {toasts.map((toast) => {
                const offset = calculateOffset(toast, {
                    gutter: 8,
                });

                const isHeightInited = !!toast.height;
                const initHeight = (el: HTMLDivElement) => {
                    if (el && typeof toast.height !== 'number') {
                        const height = el.getBoundingClientRect().height;
                        updateHeight(toast.id, height);
                    }
                };

                return (
                    <Alert
                        key={toast.id}
                        ref={initHeight}
                        type={toastAlertTypeMap[toast.type]}
                        title="提示"
                        description={toast.message.toString()}
                        className={clsx("absolute bottom-0 right-0 w-full", toast.visible ? "opacity-100" : "opacity-0")}
                        style={{
                            transform: `translateX(${toast.visible ? 0 : "100%"}) translateY(${isHeightInited ? -offset : 128}px)`,
                        }}
                    />
                );
            })}
        </div>
    );
};

const App = () => {
    return <>
        <div className="flex flex-col gap-3 min-h-screen p-3">
            <Header />
            <div className="flex flex-1 gap-3">
                <Aside />
                <main className="bento relative flex flex-1 flex-wrap items-start content-start gap-3 overflow-hidden">
                    <Suspense fallback={<Loading className="size-full" />}>
                        <Router />
                    </Suspense>
                </main>
            </div>
            <Footer />
        </div>
        <Toaster />
    </>;
};

render(<App />, document.body);
