import { random } from "@/helpers/number";
import { nanoid } from "nanoid";
import { createGlobalState } from "react-use";

const useUser = createGlobalState({
    id: nanoid(),
    name: `无名客${random(1000, 9999)}`,
});

export default useUser;
