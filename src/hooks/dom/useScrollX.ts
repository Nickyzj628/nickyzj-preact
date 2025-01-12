import { MutableRef, useEffect } from "preact/hooks";

/** 将`ref.current`的鼠标上下滚轮事件改为左右滚动 */
const useScrollX = (ref: MutableRef<any>) => {
  useEffect(() => {
    const dom = ref.current as HTMLElement;
    if (!dom) return;

    const onWheel = (e: WheelEvent) => {
      if (dom.scrollWidth <= dom.clientWidth) return;
      if (e.deltaX !== 0) return;
      e.preventDefault();
      dom.scrollBy(e.deltaY, 0);
    };
    dom.style.scrollBehavior = "smooth";
    dom.addEventListener("wheel", onWheel);

    return () => {
      dom.removeEventListener("wheel", onWheel);
    };
  }, []);
};

export default useScrollX;