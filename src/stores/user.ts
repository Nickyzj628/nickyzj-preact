import { randomInt } from "@/utils";
import { signal, useSignalEffect } from "@preact/signals";
import { useState } from "preact/hooks";

type User = {
  id: number;
  name: string;
}

const randomId = randomInt(1000, 9999);
const user = signal<User>({
  id: randomId,
  name: `无名客${randomId}`,
});

const useUserStore = () => {
  const [state, setState] = useState<User>(user.peek());
  useSignalEffect(() => {
    setState(user.value);
  });
  return [state];
};

export default useUserStore;