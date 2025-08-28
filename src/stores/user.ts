import { random } from "@/helpers/number";
import { map } from "nanostores";

const randomID = random(1000, 9999);

export const $user = map<User>({
    id: randomID,
    name: `无名客${randomID}`,
});