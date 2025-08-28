import { $router } from "@/stores/router";
import { useStore } from "@nanostores/preact";

type Router = {
    hash: string;
    params: Record<string, string>;
    path: string;
    route: string;
    search: Record<string, string>;
};

export const useRouter = () => {
    const router = useStore($router) as Router;
    return router;
};