import { NotificationIcon } from "@/assets/icons";
import Avatar from "@/components/Avatar";
import Dynamic from "@/components/Dynamic";
import { toast } from "@/components/Toaster";
import Toggle from "@/components/Toggle";
import routes from "@/routes";
import useUserStore from "@/stores/user";
import { clsx, throttle } from "@/utils";
import { useEffect, useState } from "preact/hooks";
import { Link } from "wouter-preact";

const Header = () => {
  const [user] = useUserStore();

  // 滚动切换顶栏
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

  // 手动切换移动端导航菜单
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  return (
    <header className={clsx("bento sticky z-30 flex items-center justify-between py-2 transition-all", isHeaderVisible ? "top-0" : "-top-20")}>
      {/* logo */}
      <Link href="/" className="hidden sm:flex items-center gap-1.5 hover:no-underline">
        <img src="/favicon.webp" alt="" className="size-12" />
        <span className="text-xl tracking-wide transition dark:text-zinc-200">NICKYZJ</span>
      </Link>
      {/* nav@mobile */}
      <div className="relative block sm:hidden">
        <Toggle className="relative z-10" value={isMobileNavVisible} onChange={setIsMobileNavVisible} />
        <div className={clsx("fixed top-0 left-0 size-full bg-black/30 transition-all", !isMobileNavVisible && "invisible opacity-0")}></div>
        <div className={clsx("absolute left-0 flex flex-col gap-3 w-10 transition-all", isMobileNavVisible ? "top-14" : "invisible opacity-0 top-0")}>
          {routes.filter((route) => route.icon && route.canAccess).map((route) => (
            <Link href={route.path} className={(isActive) => clsx("button", isActive && "opacity-50")} onClick={() => setIsMobileNavVisible(false)}>
              <Dynamic component={route.icon} className="size-5" />
            </Link>
          ))}
        </div>
      </div>
      {/* user */}
      <div className="flex items-center gap-6">
        <button onClick={() => toast("消息数据表维护中！")}>
          <NotificationIcon className="size-5" />
        </button>
        <div className="divider"></div>
        <button className="gap-1.5 p-0 !bg-transparent" onClick={() => toast("用户数据表维护中！")}>
          <span className="hidden sm:inline">{user.name}</span>
          <Avatar />
        </button>
      </div>
    </header>
  );
};

export default Header;