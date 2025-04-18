import dayjs, { ConfigType } from "dayjs";
import { removeSpaces } from "../string";

/** 去除`dayjs.fromNow()`多余的空格 */
export const fromNow = (date: ConfigType) => {
  return removeSpaces(dayjs(date).fromNow());
};