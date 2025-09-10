import { createGlobalState } from "react-use";

/**
 * 在 react-use/createGlobalState 的基础上实现持久化缓存
 * @example
 * const useUser = createPersistedGlobalState("user", { id: 1, name: "roxyzzz" });
 * const [user, setUser, removeUser] = useUser();
 * setUser({ id: 1, name: "roxy" });    // 缓存到 localStorage，供下次使用
 * removeUser();    // 清除缓存
 */
const createPersistedGlobalState = <T>(key: string, initialValue: T) => {
    // 如果 localStorage 里没有值，则缓存初始值，供下次使用
    const cachedValue = localStorage.getItem(key);
    if (!cachedValue) {
        localStorage.setItem(key, JSON.stringify(initialValue));
    }

    const useGlobalValue = createGlobalState<T>(cachedValue ? JSON.parse(cachedValue) : initialValue);

    return () => {
        const [value, setValue] = useGlobalValue();
        const persistValue = (value: T) => {
            setValue(value);
            localStorage.setItem(key, JSON.stringify(value));
        };
        const removeValue = () => {
            setValue(undefined);
            localStorage.removeItem(key);
        };

        return [value, persistValue, removeValue] as const;
    };
};

export default createPersistedGlobalState;
