import { useCallback, useEffect, useState } from "preact/hooks";

export const useSize = () => {
    const [element, setElement] = useState<HTMLElement | null>(null);
    const initElementByRef = useCallback((node: HTMLElement | null) => {
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

        const resizeObserver = new ResizeObserver(() => {
            updateSize();
        });

        updateSize();

        resizeObserver.observe(element);
        return () => resizeObserver.disconnect();
    }, [element]);

    return [initElementByRef, element, size] as const;
};
