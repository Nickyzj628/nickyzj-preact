import { useCallback, useEffect, useRef, useState } from "preact/hooks";

export const useInViewport = (options?: IntersectionObserverInit) => {
    const [isInViewport, setIsInViewport] = useState(false);

    const [element, setElement] = useState<HTMLElement | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const elementRef = useCallback((node: HTMLElement | null) => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }
        setElement(node);
    }, []);

    // 启动观察器
    useEffect(() => {
        if (!element) {
            setIsInViewport(false);
            return;
        }

        observerRef.current = new IntersectionObserver(([entry]) => {
            setIsInViewport(entry.isIntersecting);
        }, options);

        observerRef.current.observe(element);

        return () => {
            if (observerRef.current) {
                observerRef.current.unobserve(element);
                observerRef.current.disconnect();
                observerRef.current = null;
            }
        };
    }, [element, options]);

    return [elementRef, isInViewport] as const;
};