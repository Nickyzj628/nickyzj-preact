import { RefObject } from "preact";
import { useEffect, useState } from "preact/hooks";

type Options = {
  threshold?: number;
  thresholdPercent?: number;
};

/** 判断浏览器滚动到元素底部 */
const useHitBottom = (ref: RefObject<HTMLElement>, { threshold = 0, thresholdPercent = 0 }: Options) => {
  const [isHitBottom, setIsHitBottom] = useState(false);

  useEffect(() => {
    const { current: el } = ref;
    if (!el) return;

    const onScroll = () => {
      const elementRect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // 判断元素底部是否进入视口底部范围内
      const _threshold = threshold || (1 - thresholdPercent) * elementRect.height;
      const next = elementRect.bottom <= windowHeight + _threshold;
      setIsHitBottom(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [ref.current, threshold, thresholdPercent]);

  return isHitBottom;
};

export default useHitBottom;