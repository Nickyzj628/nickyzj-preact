import { getPathRoot } from "@/helpers/router";
import { clsx } from "@/helpers/string";
import { useIsMobile } from "@/hooks/device";
import { useRouter } from "@/hooks/store";
import { routes, ROUTES_VISIBLE_AT_NAVBAR } from "@/stores/router";
import { useEffect, useMemo, useState } from "preact/hooks";

const Aside = () => {
    const router = useRouter();
    const currentPathRoot = useMemo(() => getPathRoot(router?.path), [router]);

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

    if (isMobile) return null;

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
                    .filter((route) => ROUTES_VISIBLE_AT_NAVBAR.includes(route.id) && route.accessible)
                    .map((route) => {
                        const isActive = route.id === currentPathRoot;
                        return (
                            <a
                                href={route.id}
                                className={clsx(
                                    "button gap-1.5 whitespace-nowrap",
                                    !isAsideFold && "lg:rounded-xl",
                                    isActive ? "active" : "opacity-50 bg-transparent hover:opacity-100 hover:bg-neutral-200 dark:hover:bg-neutral-700",
                                )}
                            >
                                <div className={clsx(route.icon, "shrink-0 size-5", !isAsideFold && "lg:size-6")} />
                                <span className={clsx("hidden", !isAsideFold && "lg:inline")}>
                                    {route.title}
                                </span>
                            </a>
                        );
                    })}
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

export default Aside;