/** 拼接className */
export const clsx = (...args: any[]) => {
  return args.filter(Boolean).join(" ");
};

/** 去除字符串中的所有空格 */
export const removeSpaces = (str: string) => {
  return str.replaceAll(" ", "");
};

/** 首字母大写 */
export const capitalize = (str: string) => {
  if (str.length === 0) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};