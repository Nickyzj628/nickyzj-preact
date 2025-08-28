import { useCallback, useEffect, useState } from "preact/hooks";

/** 将 `ref.current` 的鼠标上下滚轮事件改为左右滚动 */
export const useScrollX = () => {
    const [element, setElement] = useState<HTMLElement | null>(null);
    const elementRef = useCallback((node: HTMLElement | null) => {
        setElement(node);
    }, []);

    useEffect(() => {
        if (!element) return;

        const onWheel = (e: WheelEvent) => {
            if (element.scrollWidth <= element.clientWidth) return;
            if (e.deltaX !== 0) return;
            e.preventDefault();
            element.scrollBy(e.deltaY, 0);
        };

        element.style.scrollBehavior = "smooth";
        element.addEventListener("wheel", onWheel);
        return () => element.removeEventListener("wheel", onWheel);
    }, [element]);

    return [elementRef];
};