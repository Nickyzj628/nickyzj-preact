import { debounce } from "@/utils";
import { RefObject } from "preact";
import { useLayoutEffect, useState } from "preact/hooks";

/** 获取元素实时宽高 */
const useSize = (ref: RefObject<HTMLElement>) => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const { current: el } = ref;
    if (!el) return;

    const resizeObserver = new ResizeObserver(debounce(() => {
      setSize({
        width: el.clientWidth,
        height: el.clientHeight,
      });
    }));
    resizeObserver.observe(el);
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref.current]);

  return size;
};

export default useSize;