import { useCallback, useEffect, useRef, useState } from "preact/hooks";

/**
 * 动态获取元素及其引用，防止提前返回导致 ref 为空的情况
 * @example
 * const [initElement, element, ref] = useElement<HTMLDivElement>();
 * return <div ref={initElement} />
 */
export const useElement = <T>() => {
    const [element, setElement] = useState<T | null>(null);
    const ref = useRef<T | null>(null);
    
    const initElement = useCallback((node: T | null) => {
        setElement(node);
        ref.current = node;
    }, []);

    return [initElement, element, ref] as const;
};

export const useSize = () => {
    const [element, setElement] = useState<HTMLElement | null>(null);
    const initRef = useCallback((node: HTMLElement | null) => {
        setElement(node);
    }, []);

    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        if (!element) {
            return;
        }

        const updateSize = () => {
            const rect = element.getBoundingClientRect();
            setSize({
                width: parseFloat(rect.width.toFixed(2)),
                height: parseFloat(rect.height.toFixed(2)),
            });
        };
        const resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(element);
        updateSize();

        return () => {
            resizeObserver.disconnect();
        };
    }, [element]);

    return [initRef, element, size] as const;
};
