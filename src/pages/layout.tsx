import Loading from "@/components/Loading";
import routes from "@/routes";
import { setTitle } from "@/utils";
import { Suspense } from "preact/compat";
import { useEffect, useMemo, useRef } from "preact/hooks";
import { Route, Switch as Router, useLocation } from "wouter-preact";
import Aside from "./_components/Aside";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

const Layout = () => {
  const [location] = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  // 当前根路由
  const currentPage = useMemo(() => location.match(/^\/[^\/]*/)?.[0], [location]);

  useEffect(() => {
    const container = containerRef.current;
    const route = routes.find((route) => route.path === currentPage);
    if (!container || !route) return;
    // 重置滚动距离
    container.scrollIntoView({ behavior: "instant" });
    // 设置标题
    setTitle(route.title);
  }, [currentPage]);

  return (
    <div ref={containerRef} className="flex flex-col gap-3 min-h-screen p-3">
      <Header />
      <div className="flex flex-1 gap-3">
        <Aside />
        <main className="bento relative flex flex-1 flex-wrap items-start content-start gap-3 overflow-hidden">
          <Suspense fallback={<Loading />}>
            <Router>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  component={route.component}
                />
              ))}
            </Router>
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;