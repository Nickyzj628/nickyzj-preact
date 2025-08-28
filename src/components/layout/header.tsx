import { getPathRoot } from "@/helpers/router";
import { clsx } from "@/helpers/string";
import { throttle } from "@/helpers/time";
import { useIsMobile } from "@/hooks/device";
import { useRouter, useUser } from "@/hooks/store";
import { routes, ROUTES_VISIBLE_AT_NAVBAR } from "@/stores/router";
import { toast } from "@/stores/toast";
import { useEffect, useMemo, useState } from "preact/hooks";
import Avatar from "../avatar";
import Toggle from "../toggle";

const Header = () => {
    const router = useRouter();
    const currentPathRoot = useMemo(() => getPathRoot(router?.path), [router]);

    const isMobile = useIsMobile();

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
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /**
     * 移动端点击拉起路由表
     */

    const [isNavVisible, setIsNavVisible] = useState(false);

    /**
     * 用户相关
     */

    const user = useUser();

    const onClickMessage = () => {
        toast.warning("消息数据表维护中！");
    };

    const onClickUser = () => {
        toast.warning("用户数据表维护中！");
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
                <a
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
                </a>
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
                            .filter((route) => ROUTES_VISIBLE_AT_NAVBAR.includes(route.id) && route.accessible)
                            .map((route) => {
                                const isActive = route.id === currentPathRoot;
                                return (
                                    <a
                                        href={route.id}
                                        className={clsx("button", isActive && "opacity-60")}
                                        onClick={() => setIsNavVisible(false)}
                                    >
                                        <span className={clsx(route.icon, "size-5")} />
                                    </a>
                                )
                            })
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
                    <Avatar />
                </button>
            </div>
        </header>
    );
};

export default Header;