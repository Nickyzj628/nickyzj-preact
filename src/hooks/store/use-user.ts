import { random } from "@/helpers/number";
import { createGlobalState } from "react-use";

const randomID = random(1000, 9999);

const useUser = createGlobalState({
    id: randomID,
    name: `无名客${randomID}`,
});

export default useUser;
