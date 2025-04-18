import { setTitle } from "@/helpers/dom";
import { useEffect } from "preact/hooks";

export const useTitle = (title?: string) => {
  useEffect(() => {
    if (!title) return;
    setTitle(title);
  }, [title]);
};