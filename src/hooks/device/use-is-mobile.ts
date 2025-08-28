import { useCallback, useEffect, useState } from "preact/hooks";

const MOBILE_BREAKPOINT = 576;

export const useIsMobile = () => {
    const checkIsMobile = useCallback(() => {
        return window.innerWidth < MOBILE_BREAKPOINT;
    }, []);

    const [isMobile, setIsMobile] = useState(checkIsMobile());

    useEffect(() => {
        const onResize = () => {
            setIsMobile(checkIsMobile());
        };

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return isMobile;
};