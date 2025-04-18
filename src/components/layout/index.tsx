import { setTitle } from "@/helpers/dom";
import { getPathRoot } from "@/helpers/router";
import { useRouter } from "@/hooks/store/use-router";
import NotFound from "@/pages/not-found";
import { routes } from "@/stores/router";
import { Suspense } from "preact/compat";
import { useEffect, useMemo, useRef } from "preact/hooks";
import Loading from "../loading";
import Aside from "./aside";
import Footer from "./footer";
import Header from "./header";

const Layout = () => {
  const router = useRouter();
  const Page = useMemo(() => {
    if (!router) return NotFound;

    const route = routes.find((route) => route.id === router.route);
    if (!route) return NotFound;

    return route.component;
  }, [router]);

  /**
   * 切换页面后：
   * 1. 页面回到顶部
   * 2. 更新标题
   */
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { current: container } = containerRef;
    if (!container) return;

    const currentPathRoot = getPathRoot(router?.path);
    const route = routes.find((route) => route.id === currentPathRoot);

    container.scrollIntoView();
    setTitle(route?.title);
  }, [Page]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-3 min-h-screen p-3"
    >
      <Header />
      <div className="flex flex-1 gap-3">
        <Aside />
        <main className="bento relative flex flex-1 flex-wrap items-start content-start gap-3 overflow-hidden">
          <Suspense fallback={<Loading className="size-full" />}>
            <Page />
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;