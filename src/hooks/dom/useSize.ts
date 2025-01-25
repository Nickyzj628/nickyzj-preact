import { debounce } from "@/utils";
import { RefObject } from "preact";
import { useEffect, useState } from "preact/hooks";

/** 获取元素实时宽高 */
const useSize = (ref: RefObject<HTMLElement>) => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const { current: el } = ref;
    if (!el) return;

    const resizeObserver = new ResizeObserver(debounce(() => {
      setSize({
        width: el.clientWidth,
        height: el.clientHeight,
      });
    }, 50));
    resizeObserver.observe(el);
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref.current]);

  return size;
};

export default useSize;