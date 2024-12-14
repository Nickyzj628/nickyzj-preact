import { AlignArrowLeftIcon, MoonIcon, SunIcon } from "@/assets/icons";
import Dynamic from "@/components/Dynamic";
import routes from "@/routes";
import { clsx } from "@/utils";
import { useEffect, useState } from "preact/hooks";
import { Link } from "wouter-preact";

const Aside = () => {
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

  return (
    <aside className={clsx("bento hidden sm:flex flex-col justify-between w-16 rounded-xl transition-all", !isAsideFold && "lg:w-36 xl:w-44")}>
      {/* nav */}
      <nav className={clsx("sticky top-3 flex flex-col gap-3", !isAsideFold && "lg:gap-4")}>
        {routes.filter((route) => route.icon && route.canAccess).map((route) => (
          <Link href={route.path} className={(isActive) => clsx("button gap-1.5 whitespace-nowrap hover:no-underline", isActive ? "active" : "opacity-50 bg-transparent hover:opacity-100 dark:bg-transparent", !isAsideFold && "lg:rounded-xl")}>
            <Dynamic component={route.icon} className={clsx("size-5", !isAsideFold && "lg:size-6")} />
            <span className={clsx("hidden", !isAsideFold && "lg:inline")}>{route.title}</span>
          </Link>
        ))}
      </nav>
      {/* gadgets */}
      <div className="sticky bottom-3 flex flex-wrap gap-3">
        <button className={clsx("hidden lg:inline-flex", isAsideFold && "rotate-180")} onClick={() => setIsAsideFold(!isAsideFold)}>
          <AlignArrowLeftIcon className="size-5" />
        </button>
        <button onClick={() => setIsDark(!isDark)}>
          <Dynamic component={isDark ? SunIcon : MoonIcon} className="size-5" />
        </button>
      </div>
    </aside>
  );
};

export default Aside;