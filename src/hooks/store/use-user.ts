import createPersistedGlobalState from "@/etc/create-persisted-global-state";
import { random } from "@/helpers/number";
import { nanoid } from "nanoid";

const useUser = createPersistedGlobalState("user", {
    id: nanoid(),
    name: `无名客${random(1000, 9999)}`,
});

export default useUser;
