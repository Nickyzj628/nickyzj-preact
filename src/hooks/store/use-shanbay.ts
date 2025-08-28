import { createShanbayStore } from "@/stores/fethcer";
import { useStore } from "@nanostores/preact";
import { useMemo } from "preact/hooks";

export const useShanbay = () => {
    const $shanbay = useMemo(() => createShanbayStore(), []);
    const { data, error, loading } = useStore($shanbay);
    const isLoading = loading || (!data && !error);

    return { data, error, isLoading };
};