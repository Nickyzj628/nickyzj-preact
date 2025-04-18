/** 首字母大写 */
export const capitalize = (str: string) => {
  if (str.length === 0) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};