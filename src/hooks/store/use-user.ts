import { $user } from "@/stores/user";
import { useStore } from "@nanostores/preact";

export const useUser = () => {
    const user = useStore($user);
    return user;
};